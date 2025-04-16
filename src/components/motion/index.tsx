"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: "blur(4px)",
  },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 19,
      mass: 1.2,
    },
  },
};

function List({ children, className }: React.HTMLProps<HTMLDivElement>) {
  return (
    <motion.ul variants={container} initial="hidden" animate="show" className={className}>
      {children}
    </motion.ul>
  );
}

function Item({ children, className }: { children: React.ReactNode, className?: string }) {
  return <motion.li variants={item} className={className}>{children}</motion.li>;
}

export { List, Item };