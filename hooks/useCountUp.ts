"use client";

import { useEffect } from "react";
import { useMotionValue, useTransform, animate, MotionValue } from "framer-motion";

export function useCountUp(
  end: number,
  duration: number = 2.5,
  isInView: boolean
): MotionValue<number> {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest: number) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, end, {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      });
      return () => animation.stop();
    }
  }, [isInView, end, duration, count]);

  return rounded;
}