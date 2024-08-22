import { Grid, IconButton, TextField } from "@mui/material";
import Lottie from "react-lottie";
import gmail from "../../public/gmail.json";
import SendIcon from "@mui/icons-material/Send";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useAppSelector } from "../redux/hooks";

function ContactUsSectionComponent() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const isInternet = useAppSelector((state) => state.general.general.internet);

  emailjs.init({
    publicKey: "MeXa0qVlupvi7AdyI",
    blockHeadless: true,
    limitRate: {
      id: "app",
      throttle: 10000,
    },
  });

  const onSubmit = () => {
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
          toast.success("Feedback sent successfully");
        } else {
          toast.error(response.text);
        }
      })
      .catch((error) => toast.error(error));
  };
  console.log(isInternet);
  return (
    <Grid container direction={"row"} className="pt-2 pb-2 mt-2 mb-2">
      <Grid item md={12}>
        <p className="text-6xl text-center p-5 font-bold">Contact Us</p>
      </Grid>
      <Grid item container direction={"row"} md={12}>
        <Grid
          item
          container
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          md={6}
        >
          <Grid
            item
            container
            md={6}
            justifyContent={"center"}
            className="h-full"
          >
            <Lottie options={{ animationData: gmail }} width={100}></Lottie>
          </Grid>
          <Grid
            item
            container
            direction={"column"}
            md={6}
            justifyContent={"center"}
            alignItems={"flex-start"}
            className="h-full"
          >
            <Grid item md={6} alignContent={"end"} className="w-full">
              <p className="text-3xl font-semibold">Your mail</p>
            </Grid>
            <Grid
              item
              container
              direction={"row"}
              justifyContent={"flex-start"}
              columnGap={2}
              md={6}
              alignItems={"center"}
              className=""
            >
              <Grid
                item
                container
                md={6}
                direction={"column"}
                justifyContent={"flex-start"}
              >
                <TextField
                  disabled={!isInternet}
                  label="Mail"
                  {...register("mail", {
                    required: "Mail must be given",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter valid mail",
                    },
                  })}
                ></TextField>
                {errors.mail && (
                  <p className="text-red-600">{errors.mail.message}</p>
                )}
              </Grid>

              <motion.div
                whileHover={{
                  scale: 1.5,
                }}
                className=""
              >
                <IconButton
                  disabled={!isInternet}
                  onClick={handleSubmit(onSubmit)}
                >
                  <SendIcon fontSize="large" />
                </IconButton>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent={"space-evenly"}
          direction={"column"}
          md={6}
          rowGap={1}
          className=""
        >
          <Grid item>
            <TextField
              disabled={!isInternet}
              label="Your name"
              {...register("name", { required: "Name should be given" })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </Grid>
          <Grid item>
            <TextField
              disabled={!isInternet}
              label="Title"
              {...register("title", { required: "Title must be given" })}
            />
            {errors.title && (
              <p className="text-red-600">{errors.title.message}</p>
            )}
          </Grid>
          <Grid item>
            <TextField
              disabled={!isInternet}
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default ContactUsSectionComponent;
