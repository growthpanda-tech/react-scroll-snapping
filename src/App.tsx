import * as React from "react";
import { motion, useScroll, useTransform } from "motion/react";

export default function App() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);

  const [currentSection, setCurrentSection] = React.useState(0);
  const [isScrolling, setIsScrolling] = React.useState(false);
  const sectionCount = 3;

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (event: WheelEvent) => {
      if (isScrolling) {
        return;
      }

      event.preventDefault();
      const delta = event.deltaY;

      if (delta > 0 && currentSection < sectionCount - 1) {
        setIsScrolling(true);
        setCurrentSection((prev) => prev + 1);
      } else if (delta < 0 && currentSection > 0) {
        setIsScrolling(true);
        setCurrentSection((prev) => prev - 1);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [currentSection, sectionCount, isScrolling]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: currentSection * window.innerHeight,
        behavior: "smooth",
      });

      const unlockScroll = () => setIsScrolling(false);
      const scrollTimeout = setTimeout(unlockScroll, 600);

      return () => clearTimeout(scrollTimeout);
    }
  }, [currentSection]);

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
