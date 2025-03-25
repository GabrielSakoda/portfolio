"use client";

import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import { MouseEvent } from "react";

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  spotlight?: boolean;
  glare?: boolean;
  border?: boolean;
  children: React.ReactNode;
}

export const MagicCard = ({
  as: Component = "div",
  spotlight = false,
  glare = false,
  border = false,
  children,
  className,
  ...props
}: MagicCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <Component
      className={cn(
        "relative w-full h-full rounded-xl transition duration-200 group/magic",
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      {children}

      {/* Spotlight */}
      {spotlight && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover/magic:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.1),
                transparent 80%
              )
            `,
          }}
        />
      )}

      {/* Glare */}
      {glare && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 mix-blend-overlay group-hover/magic:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.3),
                transparent 80%
              )
            `,
          }}
        />
      )}

      {/* Border */}
      {border && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover/magic:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                rgba(255,255,255,0.1),
                transparent 80%
              )
            `,
          }}
        />
      )}
    </Component>
  );
};
