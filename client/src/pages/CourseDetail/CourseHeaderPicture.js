import React from 'react'
import { useState } from 'react'
import CourBody from './CourseInfomation'
// import '../../components/CourseDetailed.css'
import background1 from '../../components/images/sushi-unsplash.jpg';
import background2 from '../../components/images/test/istock韓風課程.jpg';
import background3 from '../../components/images/test/istock舒食拌飯課程.jpg';

function CourseHeaderPicture(props) {
    let {image1 , image2 , image3} = props;
  return (
    <>
    <div className="Coursedetail CourseDetail-headerColor">
    <div id="carouselExampleIndicators" className="carousel slide CourseDetail-headerPicture" data-bs-ride="carousel">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
      <img src={image1} className="d-block w-100" alt="..."></img>
    </div>
    <div className="carousel-item">
      <img src={image2} className="d-block w-100" alt="..."></img>
    </div>
    <div className="carousel-item">
      <img src={image3} className="d-block w-100" alt="..."></img>
    </div>
  </div>
  <button className="carousel-control-prev Course-headerPictureButton" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next Course-headerPictureButton" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
    </div>
    </>
  )
}

export default CourseHeaderPicture