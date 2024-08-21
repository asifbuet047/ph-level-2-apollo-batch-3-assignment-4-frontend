import { Box, Divider, Grid, ThemeProvider } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { myCustomMuiTheme } from "../utils/myCustomMuiTheme";
import { information } from "../utils/information";

function AboutUsPage() {
  return (
    <ThemeProvider theme={myCustomMuiTheme}>
      <Box className="pt-2 pb-4">
        <Grid container direction={"column"} rowGap={2} className="">
          <Grid xs={6} lg={4} item container justifyContent={"center"}>
            <Grid item container justifyContent={"center"} className="">
              <motion.p
                whileHover={{ scale: 1.2 }}
                className="text-6xl text-center p-5 font-bold"
              >
                About the Company
              </motion.p>
              <p className=" text-justify">
                Sportify Hub is a dynamic e-commerce platform dedicated to
                providing athletes and sports enthusiasts with premium-quality
                sports gear, apparel, and accessories. Founded on a passion for
                sports and a commitment to excellence, Sportify Hub has quickly
                become a trusted name in the industry, offering a vast selection
                of products for all types of sports, from mainstream to niche.
              </p>
            </Grid>
          </Grid>
          <Divider />
          <Grid xs={6} lg={8} item container justifyContent={"center"}>
            <Grid item className="">
              <motion.p
                whileHover={{ scale: 1.1 }}
                className="text-6xl text-center p-5 font-bold"
              >
                Our Vision
              </motion.p>
              <p className=" text-justify">
                "To be the leading global destination for athletes and sports
                enthusiasts, empowering them with innovative, high-quality gear
                and apparel that fuels their passion and performance."
              </p>
            </Grid>
          </Grid>
          <Divider />
          <Grid xs={6} lg={8} item container justifyContent={"center"}>
            <Grid item className="">
              <motion.p
                whileHover={{ scale: 1.1 }}
                className="text-6xl text-center p-5 font-bold"
              >
                Our Mission
              </motion.p>
              <p className="text-justify">
                "At Sportify Hub, our mission is to provide top-tier sports
                products and exceptional customer service, inspiring individuals
                of all ages and skill levels to pursue their athletic goals. We
                are committed to offering a diverse range of high-quality goods,
                promoting a healthy and active lifestyle, and fostering a
                community where every athlete can thrive."
              </p>
            </Grid>
          </Grid>
          <Grid item container direction={{ xs: "column", md: "row" }}>
            <Grid item container md={6}>
              <motion.p
                whileHover={{ scale: 1.1 }}
                className="text-6xl text-center p-5 font-bold"
              >
                Contact information
              </motion.p>
            </Grid>
            <Divider />
            <Grid item container direction={"column"} md={6}>
              <p className="font-bold text-xl">
                Brand name: {information.company_name}
              </p>
              <p className="font-semibold text-xl">CEO: {information.ceo}</p>
              <p className="font-semibold text-xl">
                Contact number: {information.contact_number}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default AboutUsPage;
