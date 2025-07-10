// components/HeroSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative h-[500px] w-full bg-cover bg-center bg-[url('/image/pexels-olly-845434.jpg')]">
      <div className="absolute inset-0 bg-black/50" />
      <div className="container relative z-10 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Tỏa sáng với <br /> <span className="text-red-400">Phong cách</span> riêng
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-4 text-lg md:text-xl text-gray-200"
          >
            Đơn giản, cá tính, và đầy tự tin — bạn chính là nguồn cảm hứng cho phong cách hiện đại.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-6"
          >
            <Button className="bg-red-500 hover:bg-red-600 text-lg px-6 py-3 rounded-full">
              Khám phá ngay
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
