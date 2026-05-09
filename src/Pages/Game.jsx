import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import coinSound from "../assets/coin.mp3";
// import 

function Game() {

    const rows = 8;
    const cols = 10;

    const { isModi } = useLocation().state || { isModi: "modi" };

    const navigate = useNavigate();

    // console.log("game",isModi);


    // SOUND

    // PLAYER
    const [player, setPlayer] = useState({
        x: 0,
        y: 0
    });

    // ENEMY
    const [enemy, setEnemy] = useState({
        x: 8,
        y: 7
    });

    // SCORE
    const [score, setScore] = useState(0);

    // GAME STATE
    const [gameOver, setGameOver] = useState(false);
    const [win, setWin] = useState(false);

    const subBg = useRef(new Audio('/subway_surfers_ring.mp3'));
    const audioRef = isModi === "modi" ? useRef(new Audio('/whaa-modij.mpeg')) : useRef(new Audio('/rahilMaza.mpeg'));
    const bgAudioRef = useRef(new Audio('/churakedil.mp3'));


    // PLAY BACKGROUND MUSIC
    useEffect(() => {

        const bgMusic = bgAudioRef.current;
        const sub = subBg.current;

        bgMusic.loop = true;
        bgMusic.volume = 0.6;

        sub.loop = true;
        sub.volume = 0.3;

        // PLAY WHEN PAGE LOADS
        bgMusic.play();
        sub.play();

        // STOP WHEN GAME OVER OR WIN
        if (gameOver || win) {

            navigate('/results', {
                state: {
                    person:isModi,
                    result:win
                }
            });

            sub.pause();
            sub.currentTime = 0;
            bgMusic.pause();
            bgMusic.currentTime = 0;
        }

        // STOP WHEN COMPONENT REMOVED
        return () => {
            sub.pause();
            sub.currentTime = 0;
            bgMusic.pause();
            bgMusic.currentTime = 0;
        };

    }, [gameOver, win]);

    // WALLS
    const walls = [
        { x: 2, y: 2 },
        { x: 2, y: 3 },
        { x: 2, y: 4 },

        { x: 5, y: 1 },
        { x: 5, y: 2 },
        { x: 5, y: 3 },

        { x: 7, y: 6 },
        { x: 7, y: 7 },
    ];

    // COINS
    const [coins, setCoins] = useState([
        { x: 8, y: 2 },
        { x: 9, y: 4 },
        { x: 1, y: 7 },
        { x: 3, y: 5 },
        { x: 7, y: 1 },
        { x: 6, y: 3 },
        { x: 2, y: 6 },
        { x: 8, y: 4 },
        { x: 0, y: 5 },
        { x: 9, y: 1 },
        { x: 3, y: 7 },
    ]);

    // CHECK WALL
    const isWall = (x, y) => {
        return walls.some(
            wall => wall.x === x && wall.y === y
        );
    };

    // DOTS
    const [dots, setDots] = useState(() => {

        let tempDots = [];

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {

                const wall = walls.find(
                    w => w.x === x && w.y === y
                );

                const coin = [
                    { x: 8, y: 2 },
                    { x: 9, y: 4 },
                    { x: 1, y: 7 },
                    { x: 3, y: 5 },
                    { x: 7, y: 1 },
                    { x: 6, y: 3 },
                    { x: 2, y: 6 },
                    { x: 8, y: 4 },
                    { x: 0, y: 5 },
                    { x: 9, y: 1 },
                    { x: 3, y: 7 },
                ].find(
                    c => c.x === x && c.y === y
                );

                if (
                    !(x === 0 && y === 0) &&
                    !wall &&
                    !coin
                ) {
                    tempDots.push({ x, y });
                }
            }
        }

        return tempDots;

    });

    // PLAYER MOVEMENT
    useEffect(() => {

        const handleKey = (e) => {

            if (gameOver || win) return;

            setPlayer(prev => {

                let newX = prev.x;
                let newY = prev.y;

                if (e.key === "ArrowRight") newX++;
                if (e.key === "ArrowLeft") newX--;
                if (e.key === "ArrowUp") newY--;
                if (e.key === "ArrowDown") newY++;

                // SCREEN LIMIT
                if (
                    newX < 0 ||
                    newX >= cols ||
                    newY < 0 ||
                    newY >= rows
                ) {
                    return prev;
                }

                // WALL COLLISION
                if (isWall(newX, newY)) {
                    return prev;
                }

                return {
                    x: newX,
                    y: newY
                };

            });

        };

        window.addEventListener("keydown", handleKey);

        return () =>
            window.removeEventListener("keydown", handleKey);

    }, [gameOver, win]);

    // ENEMY AI
    useEffect(() => {

        if (gameOver || win) return;

        const interval = setInterval(() => {

            setEnemy(prev => {

                let possibleMoves = [];

                // RIGHT
                if (
                    prev.x + 1 < cols &&
                    !isWall(prev.x + 1, prev.y)
                ) {
                    possibleMoves.push({
                        x: prev.x + 1,
                        y: prev.y
                    });
                }

                // LEFT
                if (
                    prev.x - 1 >= 0 &&
                    !isWall(prev.x - 1, prev.y)
                ) {
                    possibleMoves.push({
                        x: prev.x - 1,
                        y: prev.y
                    });
                }

                // DOWN
                if (
                    prev.y + 1 < rows &&
                    !isWall(prev.x, prev.y + 1)
                ) {
                    possibleMoves.push({
                        x: prev.x,
                        y: prev.y + 1
                    });
                }

                // UP
                if (
                    prev.y - 1 >= 0 &&
                    !isWall(prev.x, prev.y - 1)
                ) {
                    possibleMoves.push({
                        x: prev.x,
                        y: prev.y - 1
                    });
                }

                let bestMove = possibleMoves[0];
                let bestDistance = Infinity;

                possibleMoves.forEach(move => {

                    const distance =
                        Math.abs(player.x - move.x) +
                        Math.abs(player.y - move.y);

                    if (distance < bestDistance) {
                        bestDistance = distance;
                        bestMove = move;
                    }

                });

                return bestMove;

            });

        }, 300);

        return () => clearInterval(interval);

    }, [player, gameOver, win]);

    // EAT DOTS
    useEffect(() => {

        const foundDot = dots.find(
            dot =>
                dot.x === player.x &&
                dot.y === player.y
        );

        if (foundDot) {

            setDots(prev =>
                prev.filter(
                    dot =>
                        !(dot.x === player.x && dot.y === player.y)
                )
            );

            setScore(prev => prev + 10);
        }

    }, [player]);

    // EAT COINS
    useEffect(() => {

        const foundCoin = coins.find(
            coin =>
                coin.x === player.x &&
                coin.y === player.y
        );

        if (foundCoin) {

            // PLAY SOUND
            audioRef.current.currentTime = 0;
            audioRef.current.play();

            setCoins(prev =>
                prev.filter(
                    coin =>
                        !(coin.x === player.x && coin.y === player.y)
                )
            );

            setScore(prev => prev + 50);
        }

    }, [player]);

    // WIN
    useEffect(() => {

        if (
            dots.length === 0 &&
            coins.length === 0
        ) {
            setWin(true);
        }

    }, [dots, coins]);

    // GAME OVER
    useEffect(() => {

        if (
            player.x === enemy.x &&
            player.y === enemy.y
        ) {
            setGameOver(true);
        }

    }, [player, enemy]);

    return (
        <div className="
            w-screen
            min-h-screen
            bg-black
            flex
            flex-col
            items-center
            justify-center
            overflow-hidden
            p-4
        ">

            {/* BOARD */}
            <div className="
                grid
                grid-cols-10
                gap-[2px]
                bg-[#111]
                p-2
                sm:p-4
                rounded-2xl
            ">

                {Array.from({ length: rows }).map((_, y) =>

                    Array.from({ length: cols }).map((_, x) => {

                        const playerHere =
                            player.x === x &&
                            player.y === y;

                        const enemyHere =
                            enemy.x === x &&
                            enemy.y === y;

                        const wallHere =
                            isWall(x, y);

                        const dotHere = dots.find(
                            dot =>
                                dot.x === x &&
                                dot.y === y
                        );

                        const coinHere = coins.find(
                            coin =>
                                coin.x === x &&
                                coin.y === y
                        );

                        return (
                            <div
                                key={`${x}-${y}`}
                                className="
                                    w-8
                                    h-8
                                    sm:w-12
                                    sm:h-12
                                    md:w-14
                                    md:h-14
                                    border
                                    border-[#222]
                                    rounded-md
                                    flex
                                    items-center
                                    justify-center
                                    bg-black
                                    relative
                                "
                            >

                                {/* WALL */}
                                {wallHere && (
                                    <div className="
                                        w-full
                                        h-full
                                        bg-blue-600
                                        rounded-md
                                    "></div>
                                )}

                                {/* DOT */}
                                {!wallHere && dotHere && (
                                    <div className="
                                        w-2
                                        h-2
                                        rounded-full
                                        bg-yellow-400
                                    "></div>
                                )}

                                {/* COIN */}
                                {!wallHere && coinHere && (
                                    <img
                                        src="https://imageio.forbes.com/specials-images/imageserve/638f636aec17a2b7cd07f78a/0x0.jpg?format=jpg&crop=2297,2297,x909,y354,safe&height=416&width=416&fit=bounds"
                                        className="w-10 h-10 rounded-full object-cover"
                                        alt=""
                                    />
                                )}

                                {/* PLAYER */}
                                {playerHere && (
                                    <img
                                        // src="https://preview.redd.it/r-lies-mashallah-modi-accepted-islam-and-changed-his-name-v0-eh4m32qxwzlf1.jpeg?auto=webp&s=9225b915ddf431ea45ae540b8ab4a803746f7b30"
                                        src={isModi === "modi"
                                            ? "https://i.redd.it/vgvuaq1paxkf1.png"
                                            : "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2021/06/rahulgandhiministry-1624260965.jpg"
                                        }
                                        className="w-10 h-10 rounded-full object-cover absolute"
                                        alt=""
                                    />
                                )}

                                {/* ENEMY */}
                                {enemyHere && (
                                    <img
                                        // src="https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2021/06/rahulgandhiministry-1624260965.jpg"
                                        src={isModi === "modi"
                                            ? "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2021/06/rahulgandhiministry-1624260965.jpg"
                                            : "https://i.redd.it/vgvuaq1paxkf1.png"
                                        }
                                        className="w-10 h-10 rounded-full object-cover absolute"
                                        alt=""
                                    />
                                )}

                            </div>
                        );
                    })

                )}

            </div>

            {/* HELP */}
            <p className="
                text-gray-400
                mt-8
                text-sm
                sm:text-xl
            ">
                Use Arrow Keys To Move
            </p>

        </div>
    );
}

export default Game;