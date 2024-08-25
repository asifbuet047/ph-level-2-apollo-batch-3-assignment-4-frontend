import { Badge } from "@mui/material";
import { Button, Image } from "antd";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { TCartData } from "../types/AllTypes";

function NavigationBarComponent() {
  const cart = useAppSelector((state) => state.cart.items) as TCartData[];
  return (
    <div className="navbar bg-[#fefae0] rounded-md justify-between">
      <div className="rounded-full overflow-clip">
        <Image src="./logo_03.jpg" width={80} preview={false} />
      </div>
      <div className="">
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
            {cart?.length > 0 ? (
              <Badge
                variant="standard"
                badgeContent={<Button shape="circle">{cart.length}</Button>}
              >
                <NavLink to={"/cart"}>My Cart</NavLink>
              </Badge>
            ) : (
              <Badge
                variant="standard"
                badgeContent={<Button shape="circle">0</Button>}
              >
                <NavLink to={"/cart"}>My Cart</NavLink>
              </Badge>
            )}
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
