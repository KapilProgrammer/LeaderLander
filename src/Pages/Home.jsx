import { memo, useCallback, useEffect, useRef, useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import heroImg from '../assets/hero.png'
import '../App.css'
import Swiper from 'swiper';
import 'swiper/css';
import HeroSlider from '../component/HeroSlider'
import RightSLider from '../component/RightSLider'
import { useNavigate } from 'react-router-dom';

function Home() {
  const [isModi, setIsModi] = useState("modi");

  const navigate = useNavigate();

  // Background music
  const bgAudioRef = useRef(null);

  // Voice music
  const voiceAudioRef = useRef(null);

  // Background music setup
  useEffect(() => {

    bgAudioRef.current = new Audio("/subway_surfers_ring.mp3");

    bgAudioRef.current.loop = true;



    bgAudioRef.current.volume = 0.3;

  }, []);

  const handleDataFromChild = async (data) => {

    setIsModi(data);

    // Start background music once
    if (bgAudioRef.current.paused) {

      try {
        await bgAudioRef.current.play();
      } catch (err) {
        console.log("BG music blocked");
      }

    }

    // Stop previous voice audio
    if (voiceAudioRef.current) {

      voiceAudioRef.current.pause();

      voiceAudioRef.current.currentTime = 0;

    }

    // Choose audio
    const voiceSrc =
      data === "modi"
        ? "/whaa-modij.mpeg"
        : "/rahilMaza.mpeg";

    // Create new audio
    const voice = new Audio(voiceSrc);

    voiceAudioRef.current = voice;

    // Play once
    try {

      await voice.play();

    } catch (err) {

      console.log("Voice audio blocked");

    }

  };


  // console.log(isModi);
  const renderItems = {
    modi: [
      { firstName: "MODI", lastName: "LANDER" }
    ],
    rahul: [
      { firstName: "RAHUL", lastName: "LANDER" }
    ]
  }

  const selectLander = renderItems[isModi];

  console.log(isModi);
  

  // console.log(selectLander);


  return (
    <>
      <div className='bg-black min-h-screen flex overflow-hidden'>

        {/* LEFT IMAGE SECTION */}
        <div className='w-[45%] relative'>

          <HeroSlider isModiData={isModi} />

          {/* Overlay */}
          <div className='absolute inset-0 bg-gradient-to-r  from-black/10 via-black/20 to-black z-10'></div>

          {/* Logo */}
          {/* <div className='absolute top-8 left-8 z-20'>
            <h1 className='text-2xl font-bold flex'>
              <span className='text-white mr-1'>MODI</span>
              <span className='text-amber-500'>LANDER</span>
            </h1>
          </div> */}

          {selectLander.map((item, index) => (
            <div className='absolute top-8 left-8 z-20' key={index}>
              <h1 className='text-2xl font-bold flex'>
                <span className='text-white mr-1'>{item.firstName}</span>
                <span className='text-amber-500'>{item.lastName}</span>
              </h1>
            </div>
          ))}

        </div>

        {/* RIGHT CONTENT */}
        <RightSLider onSendData={handleDataFromChild} />

      </div>
      <div className='flex self-center justify-center' onClick={() => {
        if (bgAudioRef.current) {
          bgAudioRef.current.pause();
          bgAudioRef.current.currentTime = 0;
        }

        if (voiceAudioRef.current) {
          voiceAudioRef.current.pause();
          voiceAudioRef.current.currentTime = 0;
        }

        // navigate('/game');
        navigate('/game', {
          state: { isModi }
        })

      }}>
        <button className='w-[80%] place-self-center-safe m-3 bg-amber-500
         hover:bg-amber-400 transition-all
          text-white py-3 rounded-2xl text-2xl
           font-semibold tracking-[4px] cursor-pointer'>                
           START MISSION
        </button>
      </div>
    </>
  )
}

export default Home