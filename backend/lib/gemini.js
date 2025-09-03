import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"
dotenv.config()

const apiKey = "AIzaSyCb3dsigwI0yMVNqPSh1L5YklEShqd0UT4"
if (!apiKey) throw new Error("GEMINI_API_KEY missing");

export const genAI = new GoogleGenerativeAI(apiKey);

// Good default model for speed + cost
export const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
