"use client"
import { variants } from "@/app/page";
import { motion } from "motion/react";

const AboutMeSection = () => (
    <motion.div
        className="flex justify-center items-center h-screen"
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
    >
        <div className="mx-auto px-4 max-w-2xl">
            <motion.h2
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="mb-8 font-bold text-4xl text-white"
            >
                About Me
            </motion.h2>
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-xl"
            >
                <p className="text-lg text-white/90 leading-relaxed">
                    I'm a passionate developer with a focus on creating beautiful and functional web experiences.
                    My journey in web development started with a curiosity for design and has evolved into a
                    deep love for creating intuitive user interfaces.
                </p>
            </motion.div>
        </div>
    </motion.div>
);

export default AboutMeSection;