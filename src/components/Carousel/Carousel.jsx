// import React, { useEffect, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "./carousel.css";
// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import "swiper/css/autoplay";

// import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper";
// import { getSlides } from "./fakeCarouselServices";

// //Firebase
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll,
//   list,
// } from "firebase/storage";
// import { storage } from "../../configs/firebaseConfig";
// import { collection, getDocs, setDoc, doc } from "firebase/firestore";
// import { app, db } from "../../configs/firebaseConfig";

// function Carousel(props) {
//   const [slides, setSlides] = useState([]);

//   const imagesListRef = ref(storage, "announce-images/");
//   useEffect(() => {
//     // const fetchData = async () => {
//     //   const querySnapshot = await getDocs(collection(db, "announce_links"));
//     //   const list = querySnapshot.docs.map((doc) => {
//     //     return { ...doc.data() };
//     //   });

//     //   console.log("list", list);
//     //   setSlides(list);
//     // };
//     // fetchData();
//     setSlides(getSlides());
//   }, []);

//   return (
//     <div className="container" id="announce">
//       <Swiper
//         effect={"coverflow"}
//         grabCursor={true}
//         centeredSlides={true}
//         loop={true}
//         coverflowEffect={{
//           rotate: 0,
//           stretch: 0,
//           depth: 100,
//           modifier: 2.5,
//         }}
//         autoplay={{
//           delay: 2500,
//           disableOnInteraction: false,
//         }}
//         slidesPerView={2}
//         modules={[EffectCoverflow, Autoplay]}
//         className="swiper_container"
//       >
//         {slides.map(({ image, link, index }) => (
//           <SwiperSlide key={index}>
//             <img
//               className="slide_image"
//               src={require(`./img2.jpg`)}
//               alt="slide_image"
//               onClick={() => window.open(link, "_blank").focus()}
//             />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// }

// export default Carousel;
