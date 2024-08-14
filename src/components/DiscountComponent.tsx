import React from "react";

function DiscountComponent({ discount }) {
  console.log(discount);
  return <div className="border-2 border-red-500 h-28">{discount.title}</div>;
}

export default DiscountComponent;
