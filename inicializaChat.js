import { FunctionDeclarationSchemaType, GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const funcoes = {
    taxaJurosParcelamento: ({ value }) => {
        if (!value || isNaN(value)) {
            return "Por favor, informe o número de parcelas como um valor válido.";
        }

        const meses = typeof value === "string" ? parseInt(value, 10) : value;

        if (meses <= 6) {
            return 3;
        } else if (meses <= 12) {
            return 5;
        } else if (meses <= 24) {
            return 7;
        } else {
            return "Não há taxa de juros definida para o número de parcelas fornecido.";
        }
    }
};



const tools = [
    {
        functionDeclarations: [
            {
                name: "taxaJurosParcelamento",
                description: "Retorna a taxa de juros de acordo com o número de parcelas",
                parameters: {
                    type: FunctionDeclarationSchemaType.OBJECT,
                    properties: {
                        value: {
                            type: FunctionDeclarationSchemaType.NUMBER,
                        },
                    },
                    required: ["value"],
                }
            }
        ]
    }
];


const model = genAI.getGenerativeModel(
    {
        model: "gemini-1.5-flash",
        tools
    },
    {
        apiVersion: "v1beta",
    },
);

export let chat;

export function inicializaChat() {
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
            {
                role: "user",
                parts: [{ text: "Você pode calcular a taxa de juros para parcelamento com base no número de parcelas fornecidas pelo cliente. Use a função `taxaJurosParcelamento` sempre que alguém perguntar sobre taxas de parcelamento." }],
            },
            {
                role: "model",
                parts: [{ text: "Entendido. Sempre que alguém perguntar sobre taxas de parcelamento, utilizarei a função adequada." }],
            },
        ],
        generationConfig: {
            maxOutputTokens: 1000,
        },
    });
}