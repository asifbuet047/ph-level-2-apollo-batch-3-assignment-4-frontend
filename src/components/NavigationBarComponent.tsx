import { Badge } from "@mui/material";
import { Button } from "antd";
import { NavLink } from "react-router-dom";

function NavigationBarComponent() {
  return (
    <div className="navbar bg-[#fefae0] rounded-md justify-end">
      <div className="flex flex-col">
        <ul className="menu menu-horizontal px-1">
          <li className="pl-2 pr-2">
            <NavLink to={"/"}>Homepage</NavLink>
          </li>
          <li className="pl-2 pr-2">
            <NavLink to={"/products"}>All Products</NavLink>
          </li>
          <li className="pl-2 pr-2">
            <NavLink to={"/manage"}>Manage Products</NavLink>
          </li>
          <li className="pl-2 pr-2">
            <Badge
              variant="standard"
              badgeContent={<Button shape="circle">4</Button>}
            >
              <NavLink to={"/cart"}>My Cart</NavLink>
            </Badge>
          </li>
          <li className="pl-2 pr-2">
            <NavLink to={"/about"}>About Us</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavigationBarComponent;
