import React from "react"

interface UserInputProps {
  userInput: string;
  setUserInput: (value: string) => void;
  callAPI: (prompt: string) => Promise<void>;
}

export default function UserInput({ userInput, setUserInput, callAPI }: UserInputProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      callAPI(userInput)
    }
  }

  return (

    

    <input
      value={userInput}
      onChange={(event) => setUserInput(event.target.value)}
      onKeyDown={handleKeyDown}
      className="border-4 border-indigo-500"
    />
    
  )
}
