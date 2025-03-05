import React, { useState, useEffect } from "react";

 import Banner from "./Banner/Banner";

 import FeaturedServicePart from "./FeaturedServices/FeaturedServicePart";

 import EstimatePart from "./EstimatePart/EstimatePart";

 import REviewPart from "./ReviewPart/REviewPart";

 import BrandingPart from "./BrandingPart/BrandingPart";

 import ProjectPart from "./ProjectPart/ProjectPart";

 import StatsPart from "./StatsPart/StatsPart";

 import ArticalPart from "./ArticlePart/ArticalPart";

 import LastPart from "./LastPart/LastPart";

 import PopupForm from "./popup/popup";
 
const Home = () => {

   const [isPopupOpen, setIsPopupOpen] = useState(false);

   const [hasShownPopup, setHasShownPopup] = useState(false);
 
  // Auto-popup functionality

   useEffect(() => {

     // Only show popup once per session

     if (!hasShownPopup) {

       const timer = setTimeout(() => {

         setIsPopupOpen(true);

         setHasShownPopup(true);

       }, 5000); // 5 seconds
 
      return () => clearTimeout(timer);

     }

   }, [hasShownPopup]);
 
  const openPopup = () => {

     setIsPopupOpen(true);

   };
 
  const closePopup = () => {

     setIsPopupOpen(false);

   };
 
  return (
<>
<Banner openPopup={openPopup} />
<FeaturedServicePart />
<EstimatePart />
<REviewPart />
<BrandingPart />
<ProjectPart />
<StatsPart />
<ArticalPart />
<LastPart />
<PopupForm isOpen={isPopupOpen} onClose={closePopup} />
</>

   );

 };
 
export default Home;