import { motion } from 'motion/react';
import { variants } from '@/app/page';

const ProjectsSection = () => (
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
                Projects
            </motion.h2>
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                {[
                    { title: 'Project 1', desc: 'A revolutionary web app' },
                    { title: 'Project 2', desc: 'Mobile-first design system' }
                ].map((project, index) => (
                    <motion.div
                        key={project.title}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-white/10 backdrop-blur-sm p-6 rounded-xl"
                    >
                        <h3 className="mb-2 font-semibold text-white text-xl">{project.title}</h3>
                        <p className="text-white/80">{project.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </motion.div>
);

export default ProjectsSection;