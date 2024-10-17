import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const images = [
    { src: "/assets/slicker1.jpg", alt: "A beautiful landscape" },
    { src: "/assets/slicker2.jpg", alt: "A serene beach view" },
    { src: "/assets/slicker3.jpg", alt: "A vibrant city skyline" },
  ];

  return (
    <div style={{ height: "400px",marginLeft:"20px"}} >
      <Slider {...settings}>
        <div>
          <img
            src={"/assets/slicker1.jpg"}
            alt={"Slicker"}
            style={{ width: "100vw", height: "400px", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src={"/assets/slicker2.jpg"}
            alt={"Slicker"}
            style={{ width: "100vw", height: "400px", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src={"/assets/slicker3.jpg"}
            alt={"Slicker"}
            style={{ width: "100vw", height: "400px", objectFit: "cover" }}
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
