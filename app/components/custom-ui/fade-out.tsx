import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  eixo: "x" | "y";
  initialValueX?: number;
  initialValueY?: number;
  className?: string;
};

export default function FadeOut({ className, children, eixo, initialValueX = 0, initialValueY = 0 }: Props) {
  const randomValue = Math.random();
  const duration = (randomValue * 1000) / 1000;

  return (
    <>
      {eixo === "x" ? (
        <motion.div
          exit={{ opacity: 0, x: -initialValueX }}
          initial={{ opacity: 0, x: -initialValueX }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: duration, ease: "easeOut" }}
          className={className}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          exit={{ opacity: 0, y: -initialValueY }}
          initial={{ opacity: 0, y: -initialValueY }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration, ease: "easeOut" }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </>
  )
} 