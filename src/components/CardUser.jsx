import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function CardUser({ title, image, description }) {
    const [liked, setLiked] = useState(false);
    const [hearts, setHearts] = useState([]);

    const handleLike = () => {
        setLiked(!liked);
        if (!liked) {
            const newHearts = Array.from({ length: 20 }).map((_, i) => ({
                id: i,
                x: Math.random() * 120 - 60,
                y: Math.random() * 30 - 15,
                scale: Math.random() * 0.6 + 0.5,
                duration: Math.random() * 0.6 + 0.4
            }));
            setHearts(newHearts);
            setTimeout(() => setHearts([]), 1000);
        }
    };

    return (
        <div className="w-64 h-80 rounded-2xl overflow-hidden shadow-lg bg-white p-4 transform transition-transform duration-300 hover:scale-105 flex flex-col items-center relative">
            <img className="w-32 h-32 object-cover rounded-full" src={image} alt={title} />
            <div className="mt-4 text-center">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <p className="text-lg text-gray-600 mt-2">{description}</p>
            </div>

            <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleLike}
                className="absolute bottom-4 inset-x-0 m-auto px-6 py-3 bg-red-500 text-white rounded-full shadow-md text-2xl w-32 flex items-center justify-center"
                style={{ borderRadius: '50px' }}
            >
                {liked ? "❤️ Like": "🤍 Like" }
            </motion.button>

            <AnimatePresence>
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        initial={{ opacity: 0, y: 0, scale: heart.scale }}
                        animate={{ opacity: 1, y: -120 - Math.random() * 60, x: heart.x, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: heart.duration }}
                        className="absolute text-red-500 text-2xl"
                        style={{ left: `50%`, bottom: `60px`, transform: `translateX(${heart.x}px) translateY(${heart.y}px)` }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

export default CardUser;