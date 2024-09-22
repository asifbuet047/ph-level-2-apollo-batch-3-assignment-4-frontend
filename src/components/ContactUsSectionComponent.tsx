import {  IconButton, TextField } from "@mui/material";
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
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    blockHeadless: true,
    limitRate: {
      id: "app",
      throttle: 10000,
    },
  });

  const onSubmit = () => {
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from: getValues().mail,
          cc: getValues().mail,
          from_name: getValues().name,
          title: getValues().title,
          to_name: "Guys",
          message: getValues().body,
        }
      )
      .then((response) => {
        if (response.status == 200) {
          toast.success("Feedback sent successfully");
        } else {
          toast.error(response.text);
        }
      })
      .catch((error) => toast.error(error));
  };
  return (
    <div className="pt-2 pb-2 mt-2 mb-2 flex flex-col justify-center items-center">
      <div>
        <p className="text-6xl text-center p-5 font-bold">Contact Us</p>
      </div>
      <div>
        <Lottie options={{ animationData: gmail }} width={100}></Lottie>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-evenly items-center">
        <div>
          <div className="mt-1 mb-1">
            <p className="text-3xl font-semibold">Let Us know Your feedback</p>
          </div>
          <div className="flex flex-row justify-center mt-1 mb-1">
            <div>
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
            </div>

            <motion.div
              whileHover={{
                x: 15,
              }}
            >
              <IconButton
                disabled={!isInternet}
                onClick={handleSubmit(onSubmit)}
              >
                <SendIcon fontSize="large" />
              </IconButton>
            </motion.div>
          </div>
        </div>
        <div className="mt-1">
          <div className="mt-2 mb-2">
            <TextField
              disabled={!isInternet}
              label="Your name"
              {...register("name", { required: "Name should be given" })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="mt-2 mb-2">
            <TextField
              disabled={!isInternet}
              label="Title"
              {...register("title", { required: "Title must be given" })}
            />
            {errors.title && (
              <p className="text-red-600">{errors.title.message}</p>
            )}
          </div>
          <div className="mt-2 mb-2">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsSectionComponent;
