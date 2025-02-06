"use client"
import { variants } from "@/app/page";
import { motion } from "motion/react";

const SkillsSection = () => (
    <motion.div
        className="flex justify-center items-center h-screen"
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
    >
        <div className="mx-auto px-4 max-w-4xl">
            <motion.h2
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="mb-8 font-bold text-4xl text-white"
            >
                Skills
            </motion.h2>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
                {['React', 'Next.js', 'TailwindCSS'].map((skill, index) => (
                    <motion.div
                        key={skill}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
                    >
                        <h3 className="mb-2 font-semibold text-white text-xl">{skill}</h3>
                    </motion.div>
                ))}
            </div>
        </div>
    </motion.div>
);

export default SkillsSection;