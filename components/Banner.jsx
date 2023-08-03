import Image from "next/image";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { backgroundImagesUrl } from "@/constants/image";

export default function Banner() {
  return (
    <>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={10000}
      >
        {backgroundImagesUrl.map((image, index) => (
          <div className="responsive" key={index}>
            <Image src={image} fill style={{ objectFit: "cover" }} />
            <div className="absolute top-1/2 w-full text-center ">
              <p className="text-sm sm:text-lg md:text-2xl text-white font-bold">
                Not sure where to go? Perfect.
              </p>
              <button className="text-airbnb bg-white rounded-full py-3 px-6 shadow-lg font-bold my-3
              hover:shadow-2xl hover:scale-105 transition-all duration-150 text-sm sm:text-lg active:scale-95">
                I'm flexible
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
}
