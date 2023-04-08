import React from 'react'
// import ChooseUs from "../../components/chooseUs/ChooseUs";
import Comment from "../../components/comment/Comment";
// import HeroSlider from '../../components/hero-slider/HeroSlider'
import MenuSlider from "../../components/menuSlider/MenuSlider";
import PopularFood from "../../components/popular-food/PopularFood";
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import HeroCarousel from '../../components/heroCarousel/HeroCarousel';
import Testimonial from '../../components/testimonial/Testimonial';
import AboutUs from '../../components/about/AboutUs';
import ChooseUs from '../../components/choose/ChooseUs';
// import HomeSection from '../../components/homeSection/HomeSection';

const HomePage = () => {
  return (
    <div>
      <Header />
      {/* <HomeSection/> */}
      <HeroCarousel/>
      {/* <HeroSlider /> */}
      <PopularFood />
      <ChooseUs/>
      {/* <ChooseUs /> */}
      <MenuSlider />
      <AboutUs/>
      <Testimonial/>
      <Comment />
      <Footer/>
    </div>
  );
}

export default HomePage
