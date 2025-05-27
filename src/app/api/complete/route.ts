import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { prompt } = await request.json();  

    console.log("the value being sent in --> " + prompt)
    
    const response = await fetch ("https://api.openai.com/v1/completions", {
        method:"POST", 
        headers: {
            "Content-Type" : "application/json", 
            "Authorization" : `Bearer ${process.env.OPENAI_API_KEY}`
        }, 
        body: JSON.stringify({
            model: "gpt-3.5-turbo-instruct",
            prompt : "what's the most probable next word? only 1 word answer. only give the best next single word. you're not allowed to give new line or empty characters" + prompt,
      max_tokens: 1,
      temperature: 0, 
      logprobs: 10
        })
    })

    const data = await response.json()
    console.log("sending this reponse" + data.choices[0].text)
    return NextResponse.json({ text: data.choices[0].text, logprobs: data.choices[0].logprobs});


  }
  



