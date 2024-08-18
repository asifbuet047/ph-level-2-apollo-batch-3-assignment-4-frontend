import { TDiscount } from "../types/AllTypes";
import { Grid } from "@mui/material";
import { Button } from "antd";
import { motion } from "framer-motion";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useNavigate } from "react-router-dom";

function DiscountComponent({ discount }) {
  const discountInfo: TDiscount = discount;
  const titles: string[] = discountInfo.title.split(" ");
  const navigate = useNavigate();

  const onBuyNowButtonClick = (event) => {
    console.log(discountInfo);
    navigate(`/details/${discountInfo.productId}`);
  };
  return (
    <Grid
      container
      className="bg-[url('sales_2.jpg')] bg-cover bg-center h-64 text-black"
    >
      <Grid
        container
        item
        direction={"column"}
        md={6}
        justifyContent={"space-around"}
        alignItems={"flex-start"}
        className="p-4"
      >
        <Grid container item>
          <p className="text-4xl font-bold mb-3">{discountInfo.product_name}</p>
        </Grid>

        <Grid
          container
          item
          justifyContent={"flex-start"}
          alignItems={"center"}
          direction={"row"}
        >
          <motion.div
            animate={{ scale: 1.09 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
            className="rounded-full p-4 inline-block border-4 border-red-500"
          >
            <div className="flex flex-row">
              <p className="text-5xl">{discountInfo.product_discount}</p>
              <svg
                className="w-12"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h48v48H0z" fill="none" />
                <g id="Shopicon">
                  <rect
                    x="2.201"
                    y="22"
                    transform="matrix(0.7071 -0.7071 0.7071 0.7071 -9.9411 23.9997)"
                    width="43.598"
                    height="4"
                  />
                  <path
                    d="M14,22c4.418,0,8-3.582,8-8s-3.582-8-8-8s-8,3.582-8,8S9.582,22,14,22z M14,10c2.206,0,4,1.794,4,4c0,2.206-1.794,4-4,4
		s-4-1.794-4-4C10,11.794,11.794,10,14,10z"
                  />
                  <path
                    d="M34,42c4.418,0,8-3.582,8-8s-3.582-8-8-8s-8,3.582-8,8S29.582,42,34,42z M34,30c2.206,0,4,1.794,4,4c0,2.206-1.794,4-4,4
		s-4-1.794-4-4C30,31.794,31.794,30,34,30z"
                  />
                </g>
              </svg>
            </div>
          </motion.div>
          <p className="text-3xl ml-4 ">discount</p>
        </Grid>
        <Grid container item>
          <Button
            size="large"
            type="dashed"
            iconPosition="start"
            icon={<ShoppingCartOutlinedIcon />}
            className="w-1/2 font-bold"
            onClick={onBuyNowButtonClick}
          >
            Buy now
          </Button>
        </Grid>
      </Grid>
      <Grid
        container
        item
        direction={"column"}
        alignItems={"flex-end"}
        justifyContent={"center"}
        md={6}
      >
        {titles.map((each) => (
          <Grid item>
            <p className="text-5xl font-extrabold pr-2">{each}</p>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default DiscountComponent;
