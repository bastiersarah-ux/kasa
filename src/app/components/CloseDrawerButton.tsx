"use client";

import { ReactNode } from "react";

interface CloseDrawerButtonProps {
  children: ReactNode;
  className?: string;
}

export default function CloseDrawerButton({
  children,
  className = "",
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
    <button className={className} onClick={handleClick}>
      {children}
    </button>
  );
}
