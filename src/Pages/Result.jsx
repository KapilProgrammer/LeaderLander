import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

function Result() {
    const location = useLocation();
    const { person, result } = location.state || {};

    var playVideoUri = "";
    var resultText = "";

    if(person === "modi"){
        if(result == true){
            playVideoUri = "/modi-video-win.mp4";
            resultText = "MODI Ji WINS!";
        }else{
            playVideoUri = "/modi-video-lose.mp4";
            resultText = "MODI Ji LOSES!";
        }
    }else{
        if(result == true){
            playVideoUri = "/rahul-video-win.mp4"; 
            resultText = "RAHUL WINS!"; 
        }else{
            playVideoUri = "/rahul-video-lose.mp4";
            resultText = "RAHUL LOSES!";
        }
    }

    console.log(person, result);

    const navigate = useNavigate();





    return (
        <div className="w-full h-screen bg-black flex overflow-hidden">

            {/* LEFT VIDEO SECTION */}
            <div className="w-[45%] relative overflow-hidden">

                {/* Blurred Background */}
                <video
                    autoPlay
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover blur-2xl scale-125 opacity-40"
                >
                    <source src={playVideoUri} type="video/mp4" />
                </video>

                {/* Main Video */}
                <div className="relative z-10 h-full flex items-center justify-center">

                    <video
                        autoPlay
                        playsInline
                        onEnded={() => navigate("/")}
                        className="h-full object-contain"
                    >
                        <source src={playVideoUri} type="video/mp4" />
                    </video>

                </div>

            </div>

            {/* RIGHT RESULT PANEL */}
            <div className="w-[45%] bg-[#050505] flex items-center justify-center p-10">

                <div className="w-full max-w-md bg-[#111] border border-gray-800 rounded-3xl p-8 shadow-2xl">

                    <p className="text-cyan-400 text-sm tracking-[4px] uppercase">
                        Mission Complete
                    </p>

                    <h1 className="text-5xl font-black text-white mt-4">
                        {resultText}
                    </h1>

                    <p className="text-gray-500 mt-3">
                        {person === "modi" ? "Rahul eliminated successfully." : "Modi eliminated successfully."}
                    </p>

                    {/* SCORE */}
                    <div className="mt-10 bg-black rounded-2xl p-6 border border-gray-800">

                        <p className="text-gray-500 text-sm">
                            Points Collected
                        </p>

                        <h2 className="text-6xl font-black text-white mt-2">
                            000930
                        </h2>

                    </div>

                    {/* BUTTONS */}
                    <div className="mt-8 space-y-4">

                        <button className="w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition-all text-white font-bold">
                            SHARE SCORE
                        </button>

                        <button className="w-full py-4 rounded-xl bg-pink-500 hover:bg-pink-400 transition-all text-white font-bold">
                            ADD TO STORY
                        </button>

                        <button className="w-full py-4 rounded-xl border border-gray-700 text-white hover:bg-white/10 transition-all">
                            REPLAY
                        </button>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default Result