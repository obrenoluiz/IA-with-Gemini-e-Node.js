import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let chat;

function inicializaChat() {
    chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "Sempre que te perguntarem o link do site, retorne esse link: http://localhost:3000/" }],
            },
            {
                role: "model",
                parts: [{ text: "Entendido." }],
            },
            {
                role: "user",
                parts: [{ text: "Você é Jordi, um chatbot amigável que representa a empresa Jornada Viagens, que vende pacotes turísticos para destinos nacionais e internacionais. Você pode responder mensagens que tenham relação com viagens." }],
            },
            {
                role: "model",
                parts: [{ text: "Entendido." }],
            },
        ],
        generationConfig: {
            maxOutputTokens: 1000,
        },
    });
}

export {
    chat,
    inicializaChat
}