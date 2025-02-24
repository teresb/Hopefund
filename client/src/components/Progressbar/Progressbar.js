// src/components/ProgressBar.js
import React from "react";

const ProgressBar = ({
  progress, // optional explicit progress (0-100)
  raised,   // donation raised amount
  goal,     // donation goal amount
  variant = "horizontal", // "horizontal" or "circular"
  width = "100%",
  height = "20px",
  backgroundColor = "#e0e0e0",
  fillColor = "#76c7c0",
  size = 100, 
  strokeWidth = 10,
  showPercentage = true,
  className = "",
}) => {
  // Automatically calculate progress if not provided
  let computedProgress = progress;
  if ((progress === undefined || progress === null) && raised != null && goal != null) {
    computedProgress = Math.min(100, (raised / goal) * 100);
  }
  computedProgress = computedProgress ?? 0;

  if (variant === "horizontal") {
    return (
      <div
        className={`relative ${className}`}
        style={{
          width: width,
          height: height,
          backgroundColor: backgroundColor,
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${computedProgress}%`,
            height: "100%",
            backgroundColor: fillColor,
            transition: "width 0.3s ease-in-out",
          }}
        />
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">
            {Math.round(computedProgress)}%
          </div>
        )}
      </div>
    );
  } else if (variant === "circular") {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - computedProgress / 100);
    return (
      <svg width={size} height={size} className={className}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={fillColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.3s ease-in-out" }}
        />
        {showPercentage && (
          <text
            x="50%"
            y="50%"
            dy="0.3em"
            textAnchor="middle"
            className="text-sm font-bold fill-current"
          >
            {Math.round(computedProgress)}%
          </text>
        )}
      </svg>
    );
  } else {
    return null;
  }
};

export default ProgressBar;
