import { useState, useEffect } from "react";

export function useValidateImage(url) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);
  }, [url]);

  return isValid;
}
