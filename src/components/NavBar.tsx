import { motion } from "framer-motion";

const NavBar = () => {
    return (
        <nav className="top-0 z-50 fixed bg-gray-900/80 backdrop-blur-sm w-full">
            <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex justify-between items-center h-16">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="font-bold text-xl"
                    >
                        JD
                    </motion.div>
                    <div className="md:block hidden">
                        <div className="flex items-baseline space-x-4 ml-10">
                            {["About", "Skills", "Projects", "Contact"].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="px-3 py-2 rounded-md font-medium text-sm hover:text-gray-300 transition-colors"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;