import { Box, Divider, Grid, TextField, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { myCustomMuiTheme } from "../utils/myCustomMuiTheme";
import { information } from "../utils/information";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "antd";

function AboutUsPage() {
  const [sendFeedback, setSendFeedback] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  emailjs.init({
    publicKey: "MeXa0qVlupvi7AdyI",
    blockHeadless: true,
    limitRate: {
      id: "app",
      throttle: 10000,
    },
  });

  const onSubmit = () => {
    setSendFeedback(true);
    emailjs
      .send("service_zcevm4c", "template_iqts0qn", {
        from: getValues().mail,
        cc: getValues().mail,
        from_name: getValues().name,
        title: getValues().title,
        to_name: "Guys",
        message: getValues().body,
      })
      .then((response) => {
        if (response.status == 200) {
          setSendFeedback(false);
          toast.success("Feedback sent successfully");
        } else {
          setSendFeedback(false);
          toast.error(response.text);
        }
      })
      .catch((error) => {
        setSendFeedback(false);
        toast.error(error);
      });
  };

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
          <Divider />
          <Grid item container direction={{ xs: "column", md: "row" }}>
            <Grid item container md={6}>
              <motion.p
                whileHover={{ scale: 0.8 }}
                className="text-6xl text-center p-5 font-bold"
              >
                Contact information
              </motion.p>
            </Grid>

            <Grid item container direction={"column"} md={6} rowSpacing={2}>
              <p className="font-bold text-xl mt-2 mb-2">
                Brand name: {information.company_name}
              </p>
              <p className="font-semibold text-xl mt-2 mb-2">
                CEO: {information.ceo}
              </p>
              <p className="font-semibold text-xl mt-2 mb-2">
                Contact number: {information.contact_number}
              </p>
              <Divider />
              <p className="font-semibold text-xl mt-2 mb-2">
                Give Us a feedback
              </p>
              <Grid
                item
                container
                justifyContent={"space-evenly"}
                direction={"column"}
                rowSpacing={2}
                className="p-2"
              >
                <Grid item>
                  <TextField
                    label="Your name"
                    {...register("name", { required: "Name should be given" })}
                  />
                  {errors.name && (
                    <p className="text-red-600">{errors.name.message}</p>
                  )}
                </Grid>
                <Grid item>
                  <TextField
                    label="Your mail"
                    {...register("mail", {
                      required: "Mail must be given",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter valid mail",
                      },
                    })}
                  ></TextField>
                  {errors.mail && (
                    <p className="text-red-600">{errors.mail.message}</p>
                  )}
                </Grid>
                <Grid item>
                  <TextField
                    label="Title"
                    {...register("title", { required: "Title must be given" })}
                  />
                  {errors.title && (
                    <p className="text-red-600">{errors.title.message}</p>
                  )}
                </Grid>
                <Grid item>
                  <TextField
                    label="Your message"
                    fullWidth
                    multiline
                    {...register("body", {
                      required: "Body should be included",
                      minLength: {
                        value: 10,
                        message: "Body should be at least 10 character",
                      },
                    })}
                  />
                  {errors.body && (
                    <p className="text-red-600">{errors.body.message}</p>
                  )}
                  <Grid item className="p-2">
                    <Button
                      loading={sendFeedback}
                      type="primary"
                      icon={<SendIcon />}
                      iconPosition="end"
                      onClick={handleSubmit(onSubmit)}
                    >
                      <span className="font-bold">Send</span>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default AboutUsPage;
