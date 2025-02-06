"use client"
import { variants } from "@/app/page";
import { motion } from "motion/react";

const WelcomeSection = () => (
    <motion.div
        className="flex justify-center items-center h-screen"
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
    >
        <div className="text-center">
            <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mb-6 font-bold text-7xl text-white"
            >
                Welcome
            </motion.h1>
            <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-white/90 text-xl"
            >
                Scroll to explore my portfolio
            </motion.p>
        </div>
    </motion.div>
);

export default WelcomeSection;