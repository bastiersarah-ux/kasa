"use client";

import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type NavigationContextType = {
  hasPreviousRoute: boolean;
};

const NavigationContext = createContext<NavigationContextType>({
  hasPreviousRoute: false,
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const historyCount = useRef(0);

  useEffect(() => {
    historyCount.current++;
  }, [pathname]);

  return (
    <NavigationContext.Provider
      value={{ hasPreviousRoute: historyCount.current > 0 }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);
