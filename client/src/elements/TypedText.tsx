import React, { ReactElement, useEffect, useState } from "react";

interface TypedTextProps {
  text: string;
  children: ReactElement;
}

function TypedText({ text, children }: TypedTextProps) {
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      if (index <= text.length) {
        const nextString = text.substring(0, index);
        setCurrentText(nextString);
        index++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      {currentText}
      {currentText === text && children}
    </>
  );
}

export default TypedText;
