"use client"

import React, { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

export const Meteors = ({
  number = 500,
  minDelay = 0.1,
  maxDelay = 1,
  minDuration =   1,
  maxDuration = 10,
  angle = -45,
  className,
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  )

  useEffect(() => {
    const styles = [...new Array(number)].map(() => {
      // Meteors move Down-Left (-200vh X, +200vh Y).
      // To cover the screen, we need to spawn them from a wide area to the Right.
      // 0% to 100% covers the screen width mostly.
      // But since they move LEFT, we need to spawn them off-screen to the RIGHT (100% to 200%) mostly,
      // and some on-screen (0% to 100%) to fill the view initially.
      const startX = Math.random() * 200; // 0% to 200%
      const startY = Math.random() * -50 - 10; // Start above viewport
      
      return {
        // We pass angle here but applied to inner element
        "--angle": angle + "deg",
        top: `${startY}%`,
        left: `${startX}%`,
        animationDelay: Math.random() * (maxDelay - minDelay) + minDelay + "s",
        animationDuration:
          Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
          "s",
      };
    });
    setMeteorStyles(styles)
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {meteorStyles.map((style, idx) => (
        // Wrapper handles Position and Animation (Movement)
        <span
          key={idx}
          style={style as React.CSSProperties}
          className={cn(
            "animate-meteor absolute pointer-events-none",
            className
          )}
        >
          {/* Inner handles Rotation and Appearance */}
          <span className="flex h-1.5 w-1.5 rotate-[var(--angle)] items-center justify-center rounded-full bg-white shadow-[0_0_15px_3px_rgba(255,255,255,0.5)]">
            {/* Meteor Tail */}
            <div className="pointer-events-none absolute top-1/2 -z-10 h-[2px] w-[100px] -translate-y-1/2 bg-gradient-to-r from-white via-white/50  to-transparent" />
          </span>
        </span>
      ))}
    </div>
  )
  
}

export default Meteors;
// Meteors
