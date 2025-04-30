import { Button, Typography } from "antd";
import React from "react";
import { motion } from "framer-motion";
import MainImage from "../../assets/image/MainImage.jpeg";

const Home = () => {
  const { Text } = Typography;
  return (
    <div className="flex flex-col ">
      <div className="flex items-start justify-start py-15">
        <div className="flex flex-col py-10 ml-16 sm:py-25">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-bold font-serif"
          >
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="text-[#6C12AC]"
            >
              EduWise
            </motion.span>{" "}
            Smarter Project
            <br />
            Management for Students.
          </motion.div>
          <div className="mt-4">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
              className="text-2xl font-serif"
            >
              Organize, Collaborate, and Succeed!
            </motion.span>{" "}
          </div>
          <div className="mt-4">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
              className="text-sm font-serif "
            >
              Tired of messy project coordination and missed deadlines? <br />
              EduWise is here to streamline student project management—making
              teamwork effortless, <br /> deadlines manageable, and success
              inevitable.
            </motion.span>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="text-sm font-serif "
          >
            <div className="flex flex-col justify-start items-center sm:items-start py-15">
              <Button type="primary" className="w-[160px] !h-10">
                Get Started
              </Button>
            </div>
          </motion.div>
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1,
              delay: 0.3,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <div className="hidden md:block p-5 m-8 w-full ml-15">
              <img
                src={MainImage}
                alt="MainImage"
                className="block float-left"
              />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex justify-center w-full ">
        <span className="text-3xl font-bold">
          We Provide The Best <span className="text-[#6C12AC]"> Service </span>
        </span>
      </div>
      <div className="">hi</div>
    </div>
  );
};

export default Home;
