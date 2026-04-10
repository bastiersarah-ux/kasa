"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface CloseDrawerLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export default function CloseDrawerLink({
  href,
  children,
  className = "",
}: CloseDrawerLinkProps) {
  const handleClick = () => {
    const checkbox = document.getElementById(
      "drawer-toggle",
    ) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
