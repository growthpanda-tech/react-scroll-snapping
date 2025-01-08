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
          <div className="bg-red-400 w-1/3 h-[50vh] inline-grid text-3xl place-items-center text-white">
            Section 01
          </div>
          <div className="bg-green-400 h-[50vh] inline-grid w-1/3 text-3xl place-items-center text-white">
            Section 02
          </div>
          <div className="bg-blue-400 h-[50vh] inline-grid w-1/3 text-3xl place-items-center text-white">
            Section 03
          </div>
        </motion.div>
      </div>
      <div className="h-screen snap-start"></div>
      <div className="h-screen snap-start"></div>
    </div>
  );
}
