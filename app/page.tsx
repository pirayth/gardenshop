"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Review {
  id: number;
  text: string;
  x: number;
  y: number;
}

export default function Home() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [sales, setSales] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);

  const fakeTexts = [
    "so happy with my pets, i got everything i ordered",
    "my garden is looking so nicee TYSMM",
    "arrived late but they got the pets",
    "best roblox garden shop, totally recommend",
    "amazing delivery, my garden looks awesome",
    "delivery was fast, but website was a bit difficult to move around",
    "I LOVEE THE PETS I BOUGHT",
    "easy sheckles!! prices are so cheap and LEGITTT",
    "super quick delivery, got all my pets",
    "really happy with my sheckles purchase",
    "my garden is filling up fast",
    "prices are fair and pets are great",
    "recommend to anyone who loves gag",
    "happy with how fast everything arrived",
    "LEGITT bought some sheckles",
    "totally impressed with my order",
    "website worked well and pets came fast",
    "my garden looks amazing thanks to this shop",
    "best deal ever!!",
    "trustworthy shop 100%",
    "fast response from support",
    "smooth experience overall",
    "definitely buying again",
    "best value for money",
    "pets are so cute omg",
    "LEGITT NO SCAM",
    "10/10 experience",
    "better than expected",
    "super satisfied",
    "wish i found this earlier!",
    "fastest delivery ever",
    "amazing deals",
    "everything works perfectly",
    "crazy good prices",
    "this sites legit",
    "great shop, no scam",
    "buying more soon",
    "top-tier service",
    "so easy to navigate",
    "bought a raccoon",
  ];

  useEffect(() => {
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const generateReviews = () => {
    const count = windowSize.width <= 768 ? 2 : 5;
    const safePadding = 100;
    const texts = [...fakeTexts].sort(() => Math.random() - 0.5).slice(0, count);

    return texts.map((text, index) => ({
      id: Date.now() + index,
      text,
      x: Math.random() * (windowSize.width - safePadding * 2) + safePadding,
      y: Math.random() * (windowSize.height - safePadding * 2) + safePadding,
    }));
  };

  useEffect(() => {
    setReviews(generateReviews());
    const interval = setInterval(() => {
      setReviews(generateReviews());
    }, 15000); // refresh every 15 seconds
    return () => clearInterval(interval);
  }, [windowSize]);

  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      count += Math.floor(Math.random() * 50) + 20;
      if (count >= 5000) {
        count = 5000;
        clearInterval(interval);
      }
      setSales(count);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white overflow-hidden">
      <AnimatePresence>
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            className="absolute bg-gray-800 bg-opacity-80 backdrop-blur-sm p-3 rounded-xl shadow-lg max-w-xs text-left"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              x: [review.x, review.x + (Math.random() * 40 - 20), review.x],
              y: [review.y, review.y + 50, review.y],
              rotate: [0, 5, -5, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ position: "absolute" }}
          >
            <p className="text-sm text-gray-200 mb-1">&quot;{review.text}&quot;</p>
            <div className="text-yellow-400 text-xs">★★★★★</div>
          </motion.div>
        ))}
      </AnimatePresence>

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

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl font-bold text-teal-400 mb-10"
        >
          {sales >= 5000 ? "5000+ Sales" : `${sales} Sales`}
        </motion.div>

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

        <div className="flex gap-6 text-sm text-gray-400 flex-wrap justify-center">
          <span>⚡ Instant Delivery</span>
          <span>🔒 Secure Payments</span>
          <span>✅ 24/7 Support</span>
        </div>
      </section>
    </main>
  );
}
