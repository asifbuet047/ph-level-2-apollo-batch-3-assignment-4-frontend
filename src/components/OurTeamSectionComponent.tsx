import { Typography } from "@mui/material";
import { information } from "../utils/information";
import { Image } from "antd";

function OurTeamSectionComponent() {
  return (
    <div className="mt-4 sm:rounded-sm md:rounded-md lg:rounded-lg flex flex-col md:flex-row gap-2 pb-2 justify-center items-center">
      <Image
        src={information.developer_picture}
        preview={true}
        className="border-2 border-red-800"
      ></Image>
      <Typography variant="h4">
        CEO and Developer of {information.company_name}
      </Typography>
    </div>
  );
}

export default OurTeamSectionComponent;
