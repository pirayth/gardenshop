"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Review {
  text: string;
  stars: number;
  x: number;
  y: number;
}

export default function Home() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [sales, setSales] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Large pool of human-like reviews
  const fakeTexts = [
    "Super smooth experience, pets came exactly as promised!",
    "Got my pets so fast, thank youuu!",
    "Had a little delay but customer support was great.",
    "Honestly the best Roblox garden shop I’ve tried.",
    "My garden looks so much better now, so happy!",
    "Fast delivery, and the prices are really good.",
    "LOVE the pets I bought!! Definitely coming back.",
    "Totally worth it, I didn’t expect it to be this easy.",
    "Everything arrived as expected, super quick too!",
    "Great prices and very reliable, 10/10.",
    "My garden is filling up fast, can’t stop collecting!",
    "Secure and fast, exactly what I was looking for.",
    "Highly recommend if you want pets without hassle.",
    "So impressed with how fast everything came through!",
    "Legit service, got my sheckles and pets right away.",
    "Really happy with my order, no issues at all.",
    "Website was easy to use and pets came super fast!",
    "Will definitely tell my friends about this shop.",
    "Excellent service, thank you for making it so easy.",
    "This shop never disappoints, always on time.",
    "Affordable and reliable, what more could you ask for?",
    "Didn’t expect it to be this fast, blown away.",
    "Love how everything worked without stress.",
    "Quick, simple, and trustworthy.",
    "Support team was helpful and friendly.",
    "Absolutely legit, 5 stars for sure.",
    "If you’re thinking about it, just do it.",
    "So far the best experience I’ve had online.",
    "Couldn’t be happier, thanks guys!",
    "Got my pets and sheckles in minutes, wow!",
    "Best shop for Roblox pets hands down.",
    "Always reliable, thank you so much.",
    "Prices are fair and delivery is lightning fast.",
    "Everything worked as advertised.",
    "Love this site, will keep coming back.",
    "Such a good experience every time.",
    "Shop is 100% legit, highly recommend.",
    "Perfect every time, never had an issue.",
  ];

  // Update window size
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Generate random reviews with positions spread evenly
  const generateReviews = () => {
    const selectedTexts = [...fakeTexts].sort(() => Math.random() - 0.5).slice(0, 10);
    const reviewsArray: Review[] = [];

    const minX = 50; // padding from left
    const maxX = windowSize.width - 250; // avoid cutting off
    const minY = 50; // padding from top
    const maxY = windowSize.height - 200; // avoid cutting off

    selectedTexts.forEach((text, index) => {
      const x = minX + ((maxX - minX) / 10) * index + Math.random() * 40; // spread horizontally
      const y = minY + Math.random() * (maxY - minY);
      reviewsArray.push({
        text,
        stars: 4 + Math.round(Math.random()), // 4 or 5 stars
        x,
        y,
      });
    });

    return reviewsArray;
  };

  // Initialize reviews once positions are known
  useEffect(() => {
    if (windowSize.width > 0) {
      setReviews(generateReviews());
    }
  }, [windowSize]);

  // Refresh reviews every 30 seconds
  useEffect(() => {
    if (windowSize.width > 0) {
      const interval = setInterval(() => {
        setReviews(generateReviews());
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [windowSize]);

  // Fake sales counter
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

  const isMobile = windowSize.width <= 768;

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white overflow-hidden">
      {/* Floating Reviews */}
      {reviews.slice(0, isMobile ? 4 : 8).map((review, i) => (
        <motion.div
          key={i}
          className="absolute bg-gray-800 bg-opacity-80 backdrop-blur-sm p-3 rounded-xl shadow-lg max-w-xs text-left"
          style={{ left: review.x, top: review.y }}
          initial={{ opacity: 0 }}
          animate={{
            y: [review.y, review.y + 150, review.y],
            x: [review.x, review.x + (Math.random() * 30 - 15), review.x],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <p className="text-sm text-gray-200 mb-1">&quot;{review.text}&quot;</p>
          <div className="text-yellow-400 text-xs">
            {Array.from({ length: 5 }, (_, idx) => (idx < review.stars ? "★" : "☆")).join("")}
          </div>
        </motion.div>
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
