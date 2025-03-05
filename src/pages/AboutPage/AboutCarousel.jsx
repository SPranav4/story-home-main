// import React, { useEffect, useRef, useState } from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
// import classNames from "classnames";
// import { persons } from "../../components/common/data";
// import { Link } from "react-router-dom";
// const AboutCarousel = () => {
//   const [activeItem, setActiveItem] = useState(5);
//   const wrapperRef = useRef(null);
//   const timeoutRef = useRef(null);

//   useEffect(() => {
//     if (!wrapperRef.current) return;
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }

//     wrapperRef.current.style.setProperty(
//       "--transition",
//       "600ms cubic-bezier(0.22, 0.61, 0.36, 1)"
//     );

//     timeoutRef.current = setTimeout(() => {
//       wrapperRef.current?.style.removeProperty("--transition");
//     }, 900);

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, [activeItem]);

//   return (
//     <div className="flex h-full w-full items-center justify-center">
//       <div className="w-full max-w-full">
//         <ul
//           ref={wrapperRef}
//           className="group flex flex-col gap-3 md:h-[356px] md:flex-row md:gap-[1.5%]">
//           {persons.map((person, index) => (
//             <li
//               onClick={() => setActiveItem(index)}
//               aria-current={activeItem === index}
//               className={classNames(
//                 "relative cursor-pointer md:w-[8%] md:first:w-[1%] md:last:w-[1%] md:[&[aria-current='true']]:w-[68%]",
//                 "md:[transition:width_var(--transition,200ms_ease-in)]",
//                 "md:before-block before:absolute before:bottom-0 before:left-[-10px] before:right-[-10px] before:top-0 before:hidden before:bg-white",
//                 "md:[&:not(:hover),&:not(:first),&:not(:last)]:group-hover:w-[7%] md:hover:w-[12%]",
//                 "first:pointer-events-none last:pointer-events-none md:[&_img]:first:opacity-0 md:[&_img]:last:opacity-0"
//               )}
//               key={person.name}>
//               <div className="relative h-full w-full overflow-hidden rounded-none bg-[#c9c6c7]">
//                 <img
//                   className="absolute right-0 top-1/2 h-auto lg:w-[1200px] -translate-y-1/2 object-cover  md:left-1/2 md:h-[640px] md:w-[590px] md:-translate-x-1/2"
//                   src={person.img}
//                   alt={person.name}
//                   width="590px"
//                   height="640px"
//                 />
//                 <div
//                   className={classNames(
//                     "inset-0 duration-300 before:absolute before:bottom-0 before:left-[-546px] before:right-0 before:top-[-148px] before:z-10 before:bg-texture  after:bottom-[28px] after:left-0 after:right-[-434px] after:top-0 after:z-10 after:bg-texture md:absolute md:transition-opacity",
//                     activeItem === index ? "md:opacity-25" : "md:opacity-0"
//                   )}
//                 />
//                 <div
//                   className={classNames(
//                     "left-8 top-8 w-[590px] p-4 transition-[transform,opacity] md:absolute md:p-0",
//                     activeItem === index
//                       ? "md:translate-x-0 md:opacity-100"
//                       : "md:translate-x-4 md:opacity-0"
//                   )}>
//                   <h1 className=" text-white md:text-[32px] lg:text-[70px] text-center absolute top-[136px] left-[77px] lg:left-[236px]">
//                     About Us
//                   </h1>
//                   <div className="text-[16px] breadcrumbs mt-32 text-white absolute top-[106px] left-[77px] lg:left-[336px]">
//                     <ul>
//                       <li>
//                         <Link to={"/"}>home</Link>
//                       </li>
//                       <li>
//                         <a>about</a>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default AboutCarousel;


import React, { useEffect, useRef, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classNames from "classnames";
import { persons } from "../../components/common/data";
import { Link } from "react-router-dom";

const AboutCarousel = () => {
  const [activeItem, setActiveItem] = useState(5);
  const wrapperRef = useRef(null);
  const timeoutRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical md breakpoint
    };
    
    // Initial check
    checkIfMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    if (!wrapperRef.current) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    wrapperRef.current.style.setProperty(
      "--transition",
      "600ms cubic-bezier(0.22, 0.61, 0.36, 1)"
    );

    timeoutRef.current = setTimeout(() => {
      wrapperRef.current?.style.removeProperty("--transition");
    }, 900);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [activeItem]);

  // Mobile slider component
  const MobileSlider = () => {
    return (
      <div className="w-full relative h-[500px] overflow-hidden rounded-xl">
        <img
          className="absolute w-full h-full object-cover"
          src={persons[activeItem]?.img || persons[5]?.img}
          alt={persons[activeItem]?.name || "About Us"}
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
          <h1 className="text-white text-5xl mb-4">About Us</h1>
          <div className="text-white text-lg">
            <ul className="flex gap-2">
              <li>
                <Link to={"/"} className="hover:text-[#d6763e]">Home</Link>
              </li>
              <li className="before:content-['/'] before:mr-2">
                <span>About</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Mobile thumbnail navigation */}
        <div className="absolute bottom-6 left-0 right-0">
          <div className="flex justify-center gap-2 px-4">
            {persons.filter((_, index) => index !== 0 && index !== persons.length - 1).map((person, index) => (
              <button
                key={`mobile-thumb-${index}`}
                onClick={() => setActiveItem(index + 1)} // +1 because we filtered out first item
                className={classNames(
                  "w-12 h-12 rounded-full overflow-hidden border-2",
                  activeItem === index + 1 ? "border-[#d6763e]" : "border-white/50"
                )}
              >
                <img
                  src={person.img}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Desktop slider component
  const DesktopSlider = () => {
    return (
      <ul
        ref={wrapperRef}
        className="group flex flex-row gap-[1.5%] h-[356px]">
        {persons.map((person, index) => (
          <li
            onClick={() => setActiveItem(index)}
            aria-current={activeItem === index}
            className={classNames(
              "relative cursor-pointer w-[8%] first:w-[1%] last:w-[1%] [&[aria-current='true']]:w-[68%]",
              "[transition:width_var(--transition,200ms_ease-in)]",
              "before-block before:absolute before:bottom-0 before:left-[-10px] before:right-[-10px] before:top-0 before:hidden before:bg-white",
              "[&:not(:hover),&:not(:first),&:not(:last)]:group-hover:w-[7%] hover:w-[12%]",
              "first:pointer-events-none last:pointer-events-none [&_img]:first:opacity-0 [&_img]:last:opacity-0"
            )}
            key={person.name}>
            <div className="relative h-full w-full overflow-hidden rounded-none bg-[#c9c6c7]">
              <img
                className="absolute right-0 top-1/2 h-auto w-[1200px] -translate-y-1/2 object-cover left-1/2 h-[640px] w-[590px] -translate-x-1/2"
                src={person.img}
                alt={person.name}
                width="590px"
                height="640px"
              />
              <div
                className={classNames(
                  "inset-0 duration-300 before:absolute before:bottom-0 before:left-[-546px] before:right-0 before:top-[-148px] before:z-10 before:bg-texture after:bottom-[28px] after:left-0 after:right-[-434px] after:top-0 after:z-10 after:bg-texture absolute transition-opacity",
                  activeItem === index ? "opacity-25" : "opacity-0"
                )}
              />
              <div
                className={classNames(
                  "left-8 top-8 w-[590px] transition-[transform,opacity] absolute p-0",
                  activeItem === index
                    ? "translate-x-0 opacity-100"
                    : "translate-x-4 opacity-0"
                )}>
                <h1 className="text-white text-[70px] text-center absolute top-[136px] left-[236px]">
                  About Us
                </h1>
                <div className="text-[16px] breadcrumbs mt-32 text-white absolute top-[106px] left-[336px]">
                  <ul>
                    <li>
                      <Link to={"/"}>home</Link>
                    </li>
                    <li>
                      <a>about</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-full">
        {isMobile ? <MobileSlider /> : <DesktopSlider />}
      </div>
    </div>
  );
};

export default AboutCarousel;