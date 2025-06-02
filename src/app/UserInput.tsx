import React, { useRef, useEffect } from "react";

interface UserInputProps {
  userInput: string;
  setUserInput: (value: string) => void;
  callAPI: (prompt: string) => Promise<void>;
}

export default function UserInput({ userInput, setUserInput, callAPI }: UserInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      callAPI(userInput);
    }
  };

  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const width = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${width + 30}px`;  
    }
  }, [userInput]);

  return (
    <div className="relative">
      <input
        value={userInput}
        ref={inputRef}
        onChange={(event) => setUserInput(event.target.value)}
        placeholder="Enter a random word + hit enter to begin"
        onKeyDown={handleKeyDown}
        className="border-4 border-indigo-500 mx-auto w-fit px-2 py-1 rounded transition-all duration-100"
        style={{ minWidth: "250px" }}
      />
      <span
        ref={spanRef}
        className="invisible absolute whitespace-pre"
      >
        {userInput || "Enter a random word + hit enter to begin"}
      </span>
    </div>
  );
}
