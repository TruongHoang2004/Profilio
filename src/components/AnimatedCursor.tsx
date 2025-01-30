"use client";
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AnimatedCursor: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const cursorControls = useAnimation();

    useEffect(() => {

        const updateCursorPosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const updateCursorStyle = () => {
            const hoveredElement = document.querySelector(':hover') as HTMLElement;
            const cursorStyle = hoveredElement ? window.getComputedStyle(hoveredElement).cursor : 'default';
            setIsPointer(cursorStyle === 'pointer');
        };

        window.addEventListener('mousemove', updateCursorPosition);
        window.addEventListener('mouseover', updateCursorStyle);

        return () => {
            window.removeEventListener('mousemove', updateCursorPosition);
            window.removeEventListener('mouseover', updateCursorStyle);
        };
    }, []);

    useEffect(() => {
        cursorControls.start({
            scale: isPointer ? 1.5 : 1,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 25
            }
        });
    }, [isPointer, cursorControls]);


    return (
        <>
            {/* Main cursor */}
            <motion.div
                animate={cursorControls}
                initial={{ scale: 1, opacity: 1 }}
                style={{
                    left: position.x - 8,
                    top: position.y - 8,
                }}
                className="z-50 fixed bg-blue-500 rounded-full w-4 h-4 pointer-events-none mix-blend-difference"
            />

            {/* Cursor trail */}
            <motion.div
                animate={{
                    left: position.x - 16,
                    top: position.y - 16,
                    scale: isPointer ? 1.2 : 1
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 10,
                    mass: 0.5
                }}
                className="z-40 fixed border-2 border-blue-500 rounded-full w-8 h-8 pointer-events-none mix-blend-difference"
            />
        </>
    );
};

export default AnimatedCursor;
