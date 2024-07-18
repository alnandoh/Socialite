"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpCircle } from "lucide-react";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <Button
      variant="outline"
      className={`fixed bottom-2 right-2 sm:bottom-6 sm:right-6 lg:bottom-10 w-12 h-12 p-2.5 rounded-lg shadow-lg transition-opacity ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <ArrowUpCircle className="w-6 h-6 sm:w-8 sm:h-8" />
    </Button>
  );
};

export default ScrollToTopButton;
