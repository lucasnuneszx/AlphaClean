"use client";

import { motion } from "framer-motion";

const BRANDS = [
  "BMW", "VOLKSWAGEN", "TOYOTA", "HONDA", "MERCEDES-BENZ", 
  "PORSCHE", "AUDI", "LAND ROVER", "HYUNDAI", "FIAT", 
  "CHEVROLET", "JEEP", "FORD", "VOLVO", "MITSUBISHI"
];

// Double the array for seamless infinite scroll
const TICKER_ITEMS = [...BRANDS, ...BRANDS];

export function BrandTicker() {
  return (
    <section className="py-20 bg-[#000c24] border-y border-white/5 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-8 mb-12 flex items-center gap-4">
        <div className="w-8 h-px bg-[#9fe600]/50" />
        <span className="font-[Inter] text-[10px] text-[#9fe600] tracking-[0.4em] uppercase font-bold">
           Marcas que confiam na Alpha Clean
        </span>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 40,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap gap-20 items-center transition-all"
        >
          {TICKER_ITEMS.map((brand) => (
            <div
              key={brand}
              className="font-[Syncopate] text-3xl md:text-5xl font-black text-white/5 hover:text-[#9fe600]/20 transition-all cursor-default select-none tracking-tighter"
              style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" }}
            >
              {brand}
            </div>
          ))}
        </motion.div>

        {/* Fades */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#000c24] to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#000c24] to-transparent z-10" />
      </div>

      {/* Decorative Line */}
      <div className="container-custom mt-20 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
    </section>
  );
}
