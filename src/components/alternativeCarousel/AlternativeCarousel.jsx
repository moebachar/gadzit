import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "./alternativeCarousel.scss";
import { Carousel } from "react-responsive-carousel";

//Firebase
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { app, db } from "../../configs/firebaseConfig";

function AlternativeCarousel(props) {
  const indexs = [1, 2, 3, 4];
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "announce_links"));
      const list = querySnapshot.docs.map((doc) => {
        return { ...doc.data() };
      });

      console.log("list", list);
      setSlides(list);
    };
    fetchData();
  }, []);
  return (
    <div id="announce">
      <Carousel
        autoPlay
        interval={3000}
        infiniteLoop
        stopOnHover
        swipeable
        showThumbs={false}
        centerMode
        centerSlidePercentage={50}
        showIndicators={false}
      >
        {slides.map(({ image, link, index }) => (
          <div
            key={index}
            className="container"
            style={{ cursor: "pointer" }}
            onClick={() => window.open(link, "_blank").focus()}
          >
            <img src={image} className="container__image" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default AlternativeCarousel;
