"use client";

import { ReactNode } from "react";

interface CloseDrawerButtonProps {
  children?: ReactNode;
  className?: string;
  "aria-label"?: string;
}

export default function CloseDrawerButton({
  children,
  className = "",
  "aria-label": ariaLabel,
}: CloseDrawerButtonProps) {
  const handleClick = () => {
    const checkbox = document.getElementById(
      "drawer-toggle",
    ) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  };

  return (
    <button className={className} onClick={handleClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
