import { useState, useRef } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { config } from "@/config";

const stickers = ["⭐", "💖", "🌈", "✨", "💫", "🦋", "🌸", "💝", "🎀", "💗"];

const RetroChao = () => {
  const [accepted, setAccepted] = useState(false);
  const noRef = useRef<HTMLButtonElement>(null);

  const handleNoHover = () => {
    if (!noRef.current) return;
    const btn = noRef.current;
    const parent = btn.parentElement;
    if (!parent) return;
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    btn.style.position = "fixed";
    btn.style.left = `${20 + Math.random() * maxX}px`;
    btn.style.top = `${20 + Math.random() * maxY}px`;
    btn.style.zIndex = "999";
  };

  const handleYes = () => {
    setAccepted(true);
    confetti({ particleCount: 200, spread: 120, colors: ["#ff00ff", "#00ffff", "#ffff00", "#ff69b4"] });
    setTimeout(() => confetti({ particleCount: 100, spread: 160 }), 300);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='30' y='35' text-anchor='middle' font-size='20'%3E✨%3C/text%3E%3C/svg%3E")`,
        backgroundColor: "#ff69b4",
        fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
      }}
    >
      <style>{`
        @keyframes marquee { from { transform: translateX(100%); } to { transform: translateX(-100%); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Marquee */}
      <div className="overflow-hidden border-y-4 border-yellow-300 bg-purple-800 py-2">
        <div
          className="whitespace-nowrap text-2xl font-bold text-yellow-300"
          style={{ animation: "marquee 8s linear infinite" }}
        >
          💖💖💖 {config.senderName} ❤️ {config.recipientName} 💖💖💖 WILL YOU BE MY VALENTINE??? 💖💖💖 {config.senderName} ❤️ {config.recipientName} 💖💖💖
        </div>
      </div>

      {/* Scattered stickers */}
      {stickers.map((s, i) => (
        <div
          key={i}
          className="absolute text-3xl select-none sm:text-4xl"
          style={{
            left: `${5 + (i * 17) % 90}%`,
            top: `${10 + (i * 23) % 80}%`,
            animation: `spin ${3 + i}s linear infinite`,
            opacity: 0.7,
          }}
        >
          {s}
        </div>
      ))}

      {/* Polaroid photos */}
      <div className="relative mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-6 px-4">
        {config.photos.slice(0, 4).map((src, i) => (
          <motion.div
            key={i}
            className="relative"
            initial={{ rotate: -10 + i * 7, scale: 0 }}
            animate={{ rotate: -10 + i * 7, scale: 1 }}
            transition={{ delay: i * 0.15, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: 0, zIndex: 10 }}
          >
            {/* Tape */}
            <div
              className="absolute -top-3 left-1/2 z-10 h-6 w-12 -translate-x-1/2"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,200,0.7), rgba(255,255,200,0.4))",
                transform: `translateX(-50%) rotate(${-5 + i * 3}deg)`,
              }}
            />
            <div className="rounded bg-white p-2 shadow-xl">
              <img
                src={src}
                alt=""
                className="h-32 w-28 object-cover sm:h-40 sm:w-36"
              />
              <p className="mt-1 text-center text-xs text-pink-600">
                xoxo 💋
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative mx-auto mt-8 max-w-md px-4 pb-12 text-center">
        <motion.div
          className="rounded-xl border-4 border-dashed border-yellow-300 bg-purple-900/80 p-6"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring" }}
        >
          <h1
            className="mb-4 text-3xl font-bold text-cyan-300 sm:text-4xl"
            style={{ animation: "blink 1s ease infinite", textShadow: "0 0 20px cyan" }}
          >
            BE MY VALENTINE???
          </h1>
          <p className="mb-2 text-lg text-pink-200">
            Dear {config.recipientName},
          </p>
          <p className="mb-6 text-sm leading-relaxed text-pink-100/80">
            {config.message}
          </p>
          <p className="mb-6 text-yellow-300">
            — {config.senderName} 💌
          </p>

          {!accepted ? (
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={handleYes}
                className="rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 px-8 py-3 text-lg font-bold text-white shadow-lg transition hover:scale-110 active:scale-95"
              >
                YES!! 💖
              </button>
              <button
                ref={noRef}
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                className="rounded-lg bg-gray-600 px-6 py-3 text-lg font-bold text-white transition"
              >
                No 😢
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 8 }}
            >
              <p
                className="text-4xl font-bold text-yellow-300"
                style={{ textShadow: "0 0 30px yellow" }}
              >
                OMG YESSS!!! 🎉🎉🎉
              </p>
              <p className="mt-2 text-pink-200">
                {config.senderName} is SO HAPPY rn!!!
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Visitor counter lol */}
        <p className="mt-6 text-xs text-purple-300/60">
          ⭐ You are visitor #{Math.floor(Math.random() * 9999) + 1} ⭐
        </p>
      </div>
    </div>
  );
};

export default RetroChao;