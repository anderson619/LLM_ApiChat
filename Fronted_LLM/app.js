const chatBox = document.getElementById("chat-box");
const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("message-input");


// agregar mensaje al chat
function addMessage(text, sender) {

    const div = document.createElement("div");

    div.classList.add("message");
    div.classList.add(sender);

    div.innerText = text;

    chatBox.appendChild(div);

    // scroll automático
    chatBox.scrollTop = chatBox.scrollHeight;

    return div;
}


// consumir API FastAPI
async function sendMessage() {

    const message = input.value.trim();

    if (!message) return;

    // mensaje usuario
    addMessage(message, "user");

    // limpiar input
    input.value = "";

    // mensaje temporal
    const loadingMessage = addMessage("Pensando...", "bot");

    loadingMessage.classList.add("loading");

    try {

        const response = await fetch("https://llm-apichat.onrender.com/ai-chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message
            })

        });

        const data = await response.json();

        // quitar animación
        loadingMessage.classList.remove("loading");

        // reemplazar mensaje
        loadingMessage.innerText = data;

    } catch (error) {

        console.error(error);

        loadingMessage.classList.remove("loading");

        loadingMessage.innerText = "Error conectando con FastAPI";
    }
}


// botón enviar
sendBtn.addEventListener("click", sendMessage);


// enviar con Enter
input.addEventListener("keypress", (e) => {

    if (e.key === "Enter") {
        sendMessage();
    }

});