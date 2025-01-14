import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function App() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  return (
    <div
      ref={containerRef}
      className="snap-y snap-mandatory h-screen overflow-y-auto scroll-smooth"
    >
      <div className="sticky top-0 h-screen snap-start overflow-hidden">
        <motion.div
          className="flex w-[300%] h-full place-items-center"
          style={{ x }}
        >
          <Section className="bg-red-400">Section 01</Section>
          <Section className="bg-green-400">Section 02</Section>
          <Section className="bg-blue-400">Section 03</Section>
        </motion.div>
      </div>
      <div className="h-screen snap-start"></div>
      <div className="h-screen snap-start"></div>
    </div>
  );
}

function Section({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-1/3 h-[50vh] inline-grid text-3xl place-items-center text-white ${className}`}
    >
      {children}
    </div>
  );
}
