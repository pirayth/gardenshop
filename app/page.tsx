"use client"; // <- This is required for Framer Motion

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [sales, setSales] = useState(0);

  // Get window size safely (only runs on client)
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Fake sales counter animation
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 50) + 20; // Random increment
      if (count >= 5000) {
        count = 5000;
        clearInterval(interval);
      }
      setSales(count);
    }, 50); // speed of animation
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white overflow-hidden">
      {/* Floating Shapes */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-50 blur-sm"
          initial={{
            x: Math.random() * windowSize.width,
            y: Math.random() * windowSize.height,
          }}
          animate={{
            y: ["-5%", "105%"],
            x: `+=${Math.random() * 60 - 30}`,
            rotate: [0, 360],
          }}
          transition={{
            duration: 30 + Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center h-screen px-6 relative z-10">
        <span className="text-xs font-semibold tracking-wide border border-violet-500 px-3 py-1 rounded-full text-violet-300 mb-4 shadow-md">
          🌸 New Pet Garden Collection
        </span>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
          className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-teal-300 bg-clip-text text-transparent"
        >
          Grow Your Garden
        </motion.h1>

        <p className="max-w-2xl text-gray-300 text-lg mb-6">
          Collect, trade, and grow playful pets & sheckles for your Roblox
          garden. A colorful adventure with endless fun!
        </p>

        {/* Sales Counter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl font-bold text-teal-400 mb-10"
        >
          {sales >= 5000 ? "5000+ Sales" : `${sales} Sales`}
        </motion.div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link href="/pets" passHref legacyBehavior>
            <a aria-label="Shop Pets">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 15px rgba(236,72,153,0.6)",
                }}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-7 rounded-xl text-lg shadow-lg"
              >
                🐾 Shop Pets
              </motion.button>
            </a>
          </Link>

          <Link href="/sheckles" passHref legacyBehavior>
            <a aria-label="Buy Sheckles">
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 15px rgba(34,211,238,0.6)",
                }}
                className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-7 rounded-xl text-lg shadow-lg"
              >
                💰 Buy Sheckles
              </motion.button>
            </a>
          </Link>

          {/* Support Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(255,215,0,0.6)",
            }}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-7 rounded-xl text-lg shadow-lg"
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSc3nFgA9thz7XOGSZgf98CnN8B7srG1ds2aherVklQEwGFhHg/viewform?usp=dialog",
                "_blank"
              )
            }
          >
            🛠 Support
          </motion.button>
        </div>

        {/* Feature Badges */}
        <div className="flex gap-6 text-sm text-gray-400 flex-wrap justify-center">
          <span>⚡ Instant Delivery</span>
          <span>🔒 Secure Payments</span>
          <span>✅ 24/7 Support</span>
        </div>
      </section>
    </main>
  );
}
