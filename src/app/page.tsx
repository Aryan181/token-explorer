"use client";

import UserInput from "./UserInput";
import { useState } from "react";

import { ReactFlow } from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';



export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [totalList, setTotalList] = useState<{[token : string] : number}> ({});


  const handleTokenClick = (token: string) => {
    const cleaned = token.replace(/^["'\n\s]+|["'\n\s]+$/g, "");
    const updated = userInput.trim() + " " + cleaned;
    setUserInput(updated);
    callAPI(updated);
  };

  
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
    console.log(data.logprobs)
    setTotalList(data.logprobs?.top_logprobs?.[0] || {});
  }

  return (
    
    
    <div>
      <UserInput 
      userInput={userInput}
      setUserInput={setUserInput}
      callAPI={callAPI} 
    />


<ul>
  {Object.entries(totalList).map(([token, logprob]) => (
    <li key={token}>
      <button onClick={() => handleTokenClick(token)}>
        <strong>{token}</strong>
      </button>
      : {logprob.toFixed(4)}
    </li>
  ))}
</ul>


     
    </div>

    
    
    
  );
}

 