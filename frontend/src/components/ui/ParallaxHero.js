"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function ParallaxHero() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
    target: container,
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="relative w-full min-h-[90vh] mb-20 overflow-hidden bg-black">
      <div
        className="relative flex h-full min-h-[90vh] items-center justify-center overflow-hidden"
        ref={container}
      >
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-10 text-center text-white">
          <div className="space-y-12">
            <h1
              className="text-6xl md:text-[10vw] uppercase font-black tracking-tighter"
              style={{ color: '#ffffff', textShadow: '0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.4)' }}
            >
              Vip Vazraa Pickles
            </h1>
            <p
              className="text-xl md:text-[2.2vw] opacity-90 font-semibold tracking-[0.8em] uppercase"
              style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}
            >
              Premium Homemade Pickles
            </p>
          </div>
        </div>
        <div className="absolute top-[-10vh] left-0 h-[120vh] w-[100vw]">
          <div className="absolute inset-0 z-[5] bg-gradient-to-tr from-orange-500/20 via-transparent to-pink-500/10 pointer-events-none"></div>
          <div className="absolute inset-0 z-[5] bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none"></div>
          <motion.div className="relative h-full w-full" style={{ y }}>
            <Image
              alt="Konaseema heritage"
              className="brightness-125 contrast-125 saturate-110"
              fill
              priority
              src="/images/37.png"
              style={{ objectFit: "cover" }}
            />
          </motion.div>
        </div>
      </div>
      {/* Dynamic Glow Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#fdfcf9] to-transparent z-20"></div>
    </div>
  );
}
