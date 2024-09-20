import { Badge } from "@mui/material";
import { Button, Image } from "antd";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { TCartData } from "../types/AllTypes";

function NavigationBarComponent() {
  const cart = useAppSelector((state) => state.cart.items) as TCartData[];
  return (
    <div className="flex bg-[#87F1FF] flex-col md:flex-row rounded-md justify-between items-center px-2 py-2">
      <div className="rounded-full overflow-clip xs:w-16 md:w-24 border-2 border-red-500">
        <a href="/">
          <Image src="./logo_03.jpg" preview={false} />
        </a>
      </div>
      <div className="xs:w-full md:w-auto">
        <ul className="menu menu-vertical md:menu-horizontal">
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
              <NavLink to={"/cart"}>My Cart</NavLink>
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
