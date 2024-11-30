import { chat } from "./inicializaChat.js";

export async function executaChat(mensagem) {
    const result = await chat.sendMessage(mensagem);
    const response = result.response;
    const text = response.text();

    return { response: text };
}