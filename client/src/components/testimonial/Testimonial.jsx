import React from "react";
import "./testimonial.css";
import { Carousel } from "react-bootstrap";
import fawaz from "../../images/fawaz.jpg";

const Testimonial = () => {
  return (
    <div className="Testimonial">
      <div className="testimonialContainer">
        <div className="testimonialContent">
          <Carousel>
            <Carousel.Item>
              <img src={fawaz} alt="" className="testimonialImage" />
              <div className="testimonialName mt-2">Fawaz Owo</div>
              <div className="testimonialJob my-1">Web Developer</div>
              <div className="testimonialText">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                alias, omnis nisi cumque eos aliquam facere, voluptates nemo
                molestias animi ad deleniti adipisci nihil? Soluta ad atque in
                vel ut.
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <img src={fawaz} alt="" className="testimonialImage" />
              <div className="testimonialName mt-2">Fawaz Owo</div>
              <div className="testimonialJob my-1">Web Developer</div>
              <div className="testimonialText">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                alias, omnis nisi cumque eos aliquam facere, voluptates nemo
                molestias animi ad deleniti adipisci nihil? Soluta ad atque in
                vel ut.
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <img src={fawaz} alt="" className="testimonialImage" />
              <div className="testimonialName mt-2">Fawaz Owo</div>
              <div className="testimonialJob my-1">Web Developer</div>
              <div className="testimonialText">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
                alias, omnis nisi cumque eos aliquam facere, voluptates nemo
                molestias animi ad deleniti adipisci nihil? Soluta ad atque in
                vel ut.
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
