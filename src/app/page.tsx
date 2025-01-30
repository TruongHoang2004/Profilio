// pages/index.js
"use client"
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const technologies = [
  { name: "React", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "TypeScript", level: 80 },
  { name: "Node.js", level: 85 },
  { name: "Python", level: 75 },
  { name: "AWS", level: 70 }
];

const projects = [
  {
    title: "E-commerce Platform",
    description: "Full-stack e-commerce solution with real-time updates",
    tech: ["Next.js", "Node.js", "MongoDB"],
    image: "/api/placeholder/400/300"
  },
  {
    title: "Social Media App",
    description: "Mobile-first social platform with real-time messaging",
    tech: ["React Native", "Firebase", "Redux"],
    image: "/api/placeholder/400/300"
  },
  {
    title: "AI Dashboard",
    description: "Analytics dashboard with machine learning insights",
    tech: ["Python", "TensorFlow", "React"],
    image: "/api/placeholder/400/300"
  }
];

export default function Home() {
  interface Project {
    title: string;
    description: string;
    tech: string[];
    image: string;
  }

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const springScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effect for hero section
  const heroY = useTransform(springScrollProgress, [0, 1], [0, -300]);
  const heroOpacity = useTransform(springScrollProgress, [0, 0.2], [1, 0]);

  const bounceTransition = {
    type: "spring",
    stiffness: 200,
    damping: 10
  };

  // Staggered text animation
  const sentence = "Full Stack Developer".split("");

  return (
    <div ref={containerRef} className="bg-gray-900 text-white">
      {/* Animated cursor */}
      <motion.div
        className="z-50 fixed bg-blue-500 rounded-full w-6 h-6 pointer-events-none mix-blend-difference"
        animate={{
          x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
          y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
          scale: [1, 1.2, 1]
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 25
        }}
      />

      {/* Hero Section */}
      <motion.section
        className="relative flex justify-center items-center min-h-screen overflow-hidden"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="z-10 text-center">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={bounceTransition}
            className="mb-6 font-bold text-7xl"
          >
            John Doe
          </motion.h1>
          <div className="flex justify-center space-x-1 mb-8 text-2xl">
            {sentence.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05
                }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Animated background particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500 rounded-full w-2 h-2"
            animate={{
              x: [
                Math.random() * window?.innerWidth || 0,
                Math.random() * window?.innerWidth || 0
              ],
              y: [
                Math.random() * window?.innerHeight || 0,
                Math.random() * window?.innerHeight || 0
              ]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </motion.section>

      {/* Skills Section */}
      <section className="flex justify-center items-center py-20 min-h-screen">
        <div className="mx-auto px-4 max-w-4xl">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16 font-bold text-4xl text-center"
          >
            Skills & Technologies
          </motion.h2>
          <div className="gap-8 grid">
            {technologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{tech.name}</span>
                  <span>{tech.level}%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-blue-500 h-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 min-h-screen">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-16 font-bold text-4xl text-center"
        >
          Projects
        </motion.h2>
        <div className="gap-8 grid md:grid-cols-2 lg:grid-cols-3 mx-auto px-4 max-w-7xl">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              layoutId={project.title}
              onClick={() => setSelectedProject(project)}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 rounded-lg cursor-pointer overflow-hidden"
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="mb-2 font-bold text-2xl">{project.title}</h3>
                <p className="mb-4 text-gray-400">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="z-50 fixed inset-0 flex justify-center items-center bg-black/80 p-4"
            >
              <motion.div
                layoutId={selectedProject.title}
                className="bg-gray-800 rounded-lg w-full max-w-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <h3 className="mb-4 font-bold text-3xl">{selectedProject.title}</h3>
                  <p className="mb-6 text-gray-400">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((tech) => (
                      <span
                        key={tech}
                        className="bg-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Contact Section with floating elements */}
      <section className="relative flex justify-center items-center min-h-screen overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="z-10 text-center"
        >
          <h2 className="mb-8 font-bold text-4xl">Let's Connect</h2>
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="mb-6"
          >
            <a href="mailto:john@example.com" className="text-xl hover:text-blue-500 transition-colors">
              john@example.com
            </a>
          </motion.div>
          <div className="flex justify-center space-x-6">
            {['GitHub', 'LinkedIn', 'Twitter'].map((platform, index) => (
              <motion.a
                key={platform}
                href="#"
                whileHover={{ scale: 1.2, rotate: 10 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {platform}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Floating shapes background */}
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-blue-500/20 rounded-full w-20 h-20"
            animate={{
              x: [
                Math.random() * window?.innerWidth || 0,
                Math.random() * window?.innerWidth || 0
              ],
              y: [
                Math.random() * window?.innerHeight || 0,
                Math.random() * window?.innerHeight || 0
              ],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </section>

      {/* Progress bar */}
      <motion.div
        className="top-0 right-0 left-0 z-50 fixed bg-blue-500 h-1 origin-left"
        style={{ scaleX: springScrollProgress }}
      />
    </div>
  );
}