import { useEffect, useRef } from "react";

//custom hook for handling multiple keypress events
export const useKey = (key, cb) => {
  const callBackRef = useRef(cb);
  useEffect(() => {
    callBackRef.current = cb;
  });
  useEffect(() => {
    const handle = (e) => {
      if (key === "multiple" || e.key === key) {
        callBackRef.current(e);
      }
    };
    document.addEventListener("keypress", handle);
    return () => document.removeEventListener("keypress", handle);
  }, [key]);
};
