"use client";

import UserInput from "./UserInput";
import { useState } from "react";
import '@xyflow/react/dist/style.css';



export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [dataReceived, setDataReceived] = useState<Array<{ token: string; probability: number }>>([]);
  const [isLoading, setIsLoading] = useState(false);



  const callAPI = async (prompt: string) => {
    setIsLoading(true);
    
    console.log("sending the value --> " + prompt)
    const val = 
    
    
    await fetch("api/complete", {
      method: "POST", 
      headers: {
        "Content-Type" : "application/json" 
      },
      body: JSON.stringify({prompt})
    })

    

    const data = await val.json()
    console.log("raw data -->", data);

    const topLogprobs = data.logprobs.top_logprobs[0];
    console.log("total values --> " + topLogprobs)
    const first = data?.logprobs?.top_logprobs?.[0];
if (!first || Object.keys(first).length === 0) {
  console.warn("Model returned no tokens – likely thought the prompt was complete.");
  return;               // ← early-out so UI doesn't crash
}

    const topLogprobsArray = Object.entries(topLogprobs); // [ [token, logprob], ... ] 
    console.log(topLogprobsArray);
    const converted = Object.entries(topLogprobs).map(([token, logprob]) => ({
      token,
      probability: Math.exp(Number(logprob)) * 100,
    }));
    
    setDataReceived(converted);
    setIsLoading(false);
    

  }

  const handleTokenClick = async (e: React.MouseEvent<HTMLUListElement>) => {

    const li = (e.target as HTMLElement).closest("li");
    if (!li) return;

    const rawToken = li.getAttribute("data-token") || "";
    const cleanedToken = rawToken.replace(/\s+/g, " ").trim();  
    const newAPIcallVal = userInput.trimEnd() + " " + cleanedToken;

    console.log("Clicked LI with value:", rawToken);
     
    console.log("now we're sending off this --> " + newAPIcallVal)
    setUserInput(newAPIcallVal)
    const cleanedPrompt = newAPIcallVal.trimEnd();
    await callAPI(cleanedPrompt);
  }


  const displayToken = (token: string): string => {
    if (token === "\n") return "[\\n]";
    if (token === "\n\n") return "[\\n\\n]";
    if (token.trim() === "" && token.includes(" ")) return "[space]";
    if (token === "\t") return "[\\t]";
    if (token === "\r") return "[\\r]";
    if (token === " ") return "[space]";
    if (/^\s+$/.test(token)) return `[${JSON.stringify(token)}]`; // catches other whitespace
  
    return token;
  };
  
  

  return (
    
    
    <div className="flex justify-center pt-[20vh] h-screen">
      <div className="flex flex-col items-center space-y-6">

      <h1 className="text-4xl font-bold">What's the next token?</h1>
      <h4>ChatGPT gives you one answer, but under the hood, it has many options to choose from</h4>

      
      <UserInput 
      userInput={userInput}
      setUserInput={setUserInput}
      callAPI={callAPI} 
    />

 
   

{isLoading ? (
  <p className="text-gray-500 mt-4">Loading...</p>
) : dataReceived.length > 0 ? (
  <div>
    <h2 className="text-sm text-gray-700 mb-2">Click on the token you want to see appended to the sentance</h2>
    <ul onClick={handleTokenClick}>
      {dataReceived.map(({ token, probability }, index) => (
        <li key={index} data-token={token} className="mb-2">
          The token{" "}
          <strong className="border border-red-500 rounded px-1">
            {displayToken(token)}
          </strong>{" "}
          has a {probability.toFixed(2)}% chance of showing up after the word{" "}
          <strong className="border border-red-500 rounded px-1">
            {userInput}
          </strong>
        </li>
      ))}
    </ul>
  </div>
) : null}


<a href="https://docs.google.com/document/d/e/2PACX-1vQ-o78wvzHF4lQguaCqI--sg2Pe3uSGJVQSCa-2KVlS5uhRqTVFNOjLr92pS-kXZzFKKfLH0Ktt860L/pub">
<h4 className="text-blue-600 underline cursor-pointer">project details</h4>
</a>

</div>


     
    </div>

    
    
    
  );
}

 