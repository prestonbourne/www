"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Heading, Paragraph } from "@/components";
import { motion } from "framer-motion";

const REDIRECT_SECONDS = 5;

export default function NotFound() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(REDIRECT_SECONDS);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/");
    }, REDIRECT_SECONDS * 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div className="min-h-[80vh] w-full flex flex-col items-center justify-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-4 w-4 bg-action rounded-full"
            animate={{ y: [-8, 8, -8] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.div>

      <div className="text-center space-y-4">
        <Heading level={1} showHash={false}>
          Not all who wander are lost
        </Heading>
        <Paragraph>
          But, it would appear you are ;) Redirecting you back home in {seconds} seconds...
        </Paragraph>
      </div>
    </div>
  );
}
