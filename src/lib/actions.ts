"use server"

import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "~/env";

const genAI = new GoogleGenerativeAI(env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

export async function run(search:string) {
  if (search){
    const result = await model.generateContent(search);
    const response = result.response.text();
    return response;
  }
  return "Enter some text atlesat"
}