import React, { useState } from 'react'

function RightSLider({onSendData}) {

    const [selectedPerson, setSelectedPerson] = useState("modi");

    const renderItems = {
        modi: {
            profilPic: "https://i.pinimg.com/236x/58/e5/d1/58e5d16ee360f123a3677a17614672bf.jpg",
            lander: [{ firstName: "MODI", lastName: "LANDER" }],
            name: "MODI JI",
            title: "THE MASTER MIND - THE ULTIMATE",
            stats: [
                { label: "MISSION COMPLETED", value: 98 },
                { label: "NATIONAL SECURITY", value: 96 },
                { label: "DEVELOPMENT", value: 97 }
            ]
        },

        rahul: {
            profilPic: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2021/06/rahulgandhiministry-1624260965.jpg",
            lander: [{ firstName: "RAHUL", lastName: "LANDER" }],
            name: "RAHUL GANDHI",
            title: "THE LEADER - THE FUTURE",
            stats: [
                { label: "MISSION COMPLETED", value: 70 },
                { label: "NATIONAL SECURITY", value: 65 },
                { label: "DEVELOPMENT", value: 75 }
            ]
        }
    }

    const selectedItem = renderItems[selectedPerson];

    const handleClick = () => {
        onSendData(selectedPerson);
    };

    return (
        <>
            <div className='w-[60%] flex flex-col justify-center px-20 relative z-20'>

                {/* LIVE */}
                <div className='border border-red-700 rounded-xl px-4 py-1.5 mt-1.5 flex items-center w-fit mb-10'>
                    <p className='text-red-500 text-sm'>● LIVE</p>
                </div>

                {/* Heading */}

                {renderItems[selectedPerson].lander.map((item,index) => (

                    <h1 className='text-[120px] font-black leading-[90px] uppercase' key={index}>
                        <span className='text-white block'>
                            {item.firstName}
                        </span>

                        <span className='text-amber-500 block'>
                            {item.lastName}
                        </span>
                    </h1>
                ))}

                <p className='text-gray-500 tracking-[6px] uppercase mt-8 text-sm'>
                    India's Most Patriotical Maze Game
                </p>

                {/* Buttons */}
                <div className='flex gap-5 mt-10'>

                    <button
                        onClick={() => {
                            setSelectedPerson("modi");
                            onSendData("modi");
                        }}
                        className={`px-6 py-3 rounded-xl border transition-all cursor-pointer
                        ${selectedPerson === "modi"
                                ? "border-amber-500 bg-amber-500 text-black"
                                : "border-gray-700 text-white"
                            }`}
                    >
                        MODI
                    </button>

                    <button
                        onClick={() => {
                            setSelectedPerson("rahul");
                            onSendData("rahul");
                        }}
                        className={`px-6 py-3 rounded-xl border transition-all cursor-pointer
                        ${selectedPerson === "rahul"
                                ? "border-amber-500 bg-amber-500 text-black"
                                : "border-gray-700 text-white"
                            }`}
                    >
                        RAHUL
                    </button>

                </div>

                {/* Dynamic Card */}
                <div className='border border-gray-800 rounded-3xl p-8 mt-10 bg-[#0b0b0b]'>

                    <div className='flex items-center gap-5'>

                        <img
                            src={selectedItem.profilPic}
                            className='w-20 h-20 rounded-full object-cover'
                        />

                        <div>
                            <h2 className='text-white text-3xl font-bold'>
                                {selectedItem.name}
                            </h2>

                            <p className='text-amber-500 text-sm mt-2'>
                                {selectedItem.title}
                            </p>
                        </div>

                    </div>

                    {/* Stats */}
                    <div className='mt-8 space-y-5'>

                        {selectedItem.stats.map((item, index) => (
                            <div key={index}>

                                <div className='flex justify-between text-gray-400 text-sm'>
                                    <p>{item.label}</p>
                                    <p>{item.value}</p>
                                </div>

                                <div className='h-1 bg-gray-800 rounded-full mt-2'>

                                    <div
                                        className='h-full bg-amber-500 rounded-full'
                                        style={{ width: `${item.value}%` }}
                                    ></div>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>

                {/* Button */}
           

            </div>
        </>
    )
}

export default RightSLider