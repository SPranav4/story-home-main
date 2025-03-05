import React from "react";
import { MdOutlineClose } from "react-icons/md";
import { menus } from "../../common/data";
import MenuLink from "./MenuLink";

const MobileNavigation = ({ setOpen, items }) => (
  <div
    className="absolute top-0 right-0 h-[100vh] w-[76%] flex-col bg-[#f7cbab] z-[99] shadow-md"
    style={{ boxShadow: "- 10px 0px 10px 1px #aaaaaa" }}>
    <MdOutlineClose
      className="text-xl mt-1 absolute top-5 right-2"
      onClick={() => setOpen(false)}
    />
    <ul className="py-16 px-10 flex flex-col gap-7 justify-center item-center">
      {menus.map(({ to, label }) => (
        <MenuLink
          key={to}
          to={to}
          label={label}
          onClick={() => setOpen(false)}
        />
      ))}
      <div className="flex flex-col navbar-end mt-8 gap-[20px]">{items}</div>
    </ul>
  </div>
);
export default MobileNavigation;
