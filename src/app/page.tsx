"use client";

import UserInput from "./UserInput";
import { useState } from "react";

import { ReactFlow } from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';



export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [dataReceived, setDataReceived] = useState<[string, number][]>([]);
  const [showRawTokens, setShowRawTokens] = useState(false);

  const callAPI = async (prompt: string) => {
    console.log("sending the value --> " + prompt)
    const val = await fetch("api/complete", {
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
  return;               // ← early-out so UI doesn’t crash
}

    const topLogprobsArray = Object.entries(topLogprobs); // [ [token, logprob], ... ] 
    console.log(topLogprobsArray);
    const converted = Object.entries(topLogprobs).map(([token, logprob]) => ({
      token,
      probability: Math.exp(logprob) * 100,
    }));
    
    setDataReceived(converted);
    

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
    
    
    <div>
      <UserInput 
      userInput={userInput}
      setUserInput={setUserInput}
      callAPI={callAPI} 
    />

 




<ul onClick={handleTokenClick}>
  {dataReceived.map(({ token, probability }, index) => (
    <li key={index} data-token={token}>
      The token <strong>{displayToken(token)}</strong> has a <></>{probability.toFixed(2)}% of showing up
    </li>
  ))}
</ul>



     
    </div>

    
    
    
  );
}

 