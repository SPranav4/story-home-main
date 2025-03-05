// import { useState } from "react";
// import { MdOutlineMenu } from "react-icons/md";
// import { Link } from "react-router-dom";
// import MobileNavigation from "./MobileNavigation";
// import Navigation from "./Navigation";
// import { FaSearch } from "react-icons/fa";
// import navLogo from "../../../assets/navLogo1.png";
// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const items = (
//     <>
//       <div className="relative">
//         <input
//           type="text"
//           placeholder="Search"
//           className="input input-bordered input-[#EFEFEF] w-[220px] md:w-[270px] lg:w-[300px] h-[50px] rounded-full"
//         />
//         <FaSearch className="text-[#c5c5c5] text-xl absolute right-[-95px] md:right-6 lg:right-4 top-3.5" />
//       </div>
//     </>
//   );
//   return (
//     <div className="h-[98px] relative">
//       <div className="navbar max-w-[1200px] mx-auto mt-0 lg:mt-[29px] bg-base-100 flex justify-normal gap-[60px] items-end">
//         <div className="flex justify-normal items-center">
//           <div className="flex justify-between items-end">
//             <Link to="/">
//               <img src={navLogo} alt="" className="w-[120px] lg:w-[340px]" />
//             </Link>
//             <Navigation isMobile={false} setOpen={setOpen} />
//           </div>
//           <MdOutlineMenu
//             className="flex lg:hidden text-2xl mt-0.5 absolute top-4.5 right-2"
//             onClick={() => setOpen(!open)}
//           />
//         </div>
//         <div className="hidden lg:flex navbar-end gap-[20px]">{items}</div>
//       </div>
//       {open && <MobileNavigation setOpen={setOpen} items={items} />}
//     </div>
//   );
// };

// export default Navbar;


import { useState } from "react";
import { MdOutlineMenu } from "react-icons/md";
import { Link } from "react-router-dom";
import MobileNavigation from "./MobileNavigation";
import Navigation from "./Navigation";
import AIChatSearch from "../../common/AIChatSearch"; // Import the new component
import navLogo from "../../../assets/navlogo1.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  
  // Updated items to use the AIChatSearch component
  const items = (
    <>
      <AIChatSearch />
    </>
  );
  
  return (
    <div className="h-[98px] relative">
      <div className="navbar max-w-[1200px] mx-auto mt-0 lg:mt-[29px] bg-base-100 flex justify-normal gap-[60px] items-end">
        <div className="flex justify-normal items-center">
          <div className="flex justify-between items-end">
            <Link to="/">
              <img src={navLogo} alt="" className="w-[120px] lg:w-[340px]" />
            </Link>
            <Navigation isMobile={false} setOpen={setOpen} />
          </div>
          <MdOutlineMenu
            className="flex lg:hidden text-2xl mt-0.5 absolute top-4.5 right-2"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="hidden lg:flex navbar-end gap-[20px]">{items}</div>
      </div>
      {open && <MobileNavigation setOpen={setOpen} items={items} />}
    </div>
  );
};

export default Navbar;