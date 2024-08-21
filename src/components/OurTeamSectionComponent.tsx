import { Box, Grid, Typography } from "@mui/material";
import { information } from "../utils/information";
import { Image } from "antd";

function OurTeamSectionComponent() {
  return (
    <Box className="mt-4 mb-2">
      <Grid
        container
        direction={{ xs: "column", md: "row" }}
        rowSpacing={2}
        columnSpacing={2}
        justifyContent={"center"}
      >
        <Grid item container xs={6} justifyContent={"flex-end"}>
          <Image
            src={information.developer_picture}
            preview={true}
            className="border-2 border-red-800"
          ></Image>
        </Grid>

        <Grid item container xs={6} justifyContent={""} alignItems={"center"}>
          <Typography variant="h4">
            CEO and Developer of {information.company_name}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OurTeamSectionComponent;
