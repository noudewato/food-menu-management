import React from "react";
import Slider from "react-slick";
import {Container, Row, Col } from "react-bootstrap";
import './category.css'

const Category = () => {
  const categories = [
    {
      category: "All",
    },
    {
      category: "Rice",
    },
    {
      category: "Pizza",
    },
    {
      category: "Burger",
    },
    {
      category: "Salad",
    },
    {
      category: "Sandwich",
    },
    {
      category: "Combo",
    },
    {
      category: "Sea Food",
    },
    {
      category: "Beef Food",
    },
    {
      category: "Chicken Foog",
    },
    {
      category: "Hommos",
    },
    {
      category: "Wraps",
    },
    {
      category: "Pasta",
    },
    {
      category: "Drink & Water",
    },
    {
      category: "Cocktail",
    },
    {
      category: "Dissert",
    },
    {
      category: "Cake",
    },
    {
      category: "Sweet",
    },
    {
      category: "Box",
    },
    {
      category: "Last",
    },
    ];
    
    const settings = {
      infinite: true,
      slidesToShow: 8,
      slidesToScroll: 1,
      speed: 500,
      rows: 1,
      slidesPerRow: 1,
    //   autoplay: true,
    //   autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  return (
    <div className="category">
      <Container>
        <Row>
          <Col>
            <div>
              <Slider {...settings}>
                {categories.map((item, index) => (
                  <button className="btn-category" key={index}>
                    {item.category}
                  </button>
                ))}
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Category;
