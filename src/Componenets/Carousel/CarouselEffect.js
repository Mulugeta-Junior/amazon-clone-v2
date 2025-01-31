import React from 'react'
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {img} from "../Carousel/img/data";
import classes from './carousel.module.css';



function CarouselEffect() {

  return (
    <>
      <div className={classes.carousel_wrapper}>
        <ResponsiveCarousel
          autoplay={true}
          infiniteloop={true}
          showIndicator={false}
          showThumbs={false}
        >
          {img.map((carouselImage) => {
            return <img src={carouselImage} alt="#" key={carouselImage} />;
          })}
        </ResponsiveCarousel>
        <div className={classes.carousel_overlay}></div>
      </div>
    </>
  );
}

export default CarouselEffect;
