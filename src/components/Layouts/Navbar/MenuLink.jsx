import { NavLink } from "react-router-dom";

const MenuLink = ({ to, label, onClick }) => (
  <li>
    <NavLink
      to={to}
      className="text-[16px] hover:text-themeColor"
      onClick={onClick}>
      {label}
    </NavLink>
  </li>
);

export default MenuLink;
