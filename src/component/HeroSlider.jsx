import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';

const HeroSlider = ({ isModiData }) => {

  const renderItems = {
    modi: [
      "https://i.pinimg.com/736x/58/e5/d1/58e5d16ee360f123a3677a17614672bf.jpg",
      "https://preview.redd.it/modiji-ki-taraf-se-thank-you-ab-apne-stickers-and-memes-v0-i6cwsen8sbpd1.png?auto=webp&s=9889d6bb670e84aa1c1be991d68f595a4e3bd478",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfMlLnyokHxUw5SzU0k02-uvnH4sT2Uld8tg&s"
    ],

    rahul: [
      "https://indianmemetemplates.com/wp-content/uploads/maza-aaya-aur-ye-mazaa-mein-poore-desh-ko-dena-chahta-hun.jpg",
      "https://static.india.com/wp-content/uploads/2016/02/Rahul-Gandhi-Main-Article-1.jpg?impolicy=Medium_Resize&w=1200&h=800",
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQtpGfgAKLfV1DFhCmwzLOTZxF_zMx8Wxs1bzwAqfOVPGf7wHNL"
    ]
  };

  // Select images based on prop
  const selectedImages =
    isModiData === "rahul"
      ? renderItems.rahul
      : renderItems.modi;

  return (
    <Swiper
      effect={'fade'}
      fadeEffect={{
        crossFade: true,
      }}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[EffectFade, Autoplay]}
      className="h-screen"
    >

      {selectedImages.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image}
            className='w-full h-screen object-cover'
          />
        </SwiperSlide>
      ))}

    </Swiper>
  );
};

export default HeroSlider;