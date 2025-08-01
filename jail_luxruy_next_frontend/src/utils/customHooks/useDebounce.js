"use client"
import { useRef, useEffect } from "react";

function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  const debouncedCallback = (...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current); // Cleanup on unmount
  }, []);

  return debouncedCallback;
}

export default useDebounce;