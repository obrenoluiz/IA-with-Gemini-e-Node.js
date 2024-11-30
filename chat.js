import { chat } from "./inicializaChat.js";

export async function executaChat(mensagem) {
    console.log("Tamanho do histórico: " + (await chat.getHistory()).length);
    const result = await chat.sendMessage(mensagem);
    const response = result.response;
    const text = response.text();

    return { response: text };
}