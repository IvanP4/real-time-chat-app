const ws = new WebSocket("ws://127.0.0.1:8000/ws");

ws.onopen = () => {
    console.log("✅ Connected to WebSocket server");
};

ws.onmessage = (event) => {
    console.log("📨 Message received:", event.data);
    const chat = document.getElementById("chat");
    chat.innerHTML += `<p>${event.data}</p>`;
};

ws.onerror = (error) => {
    console.error("❌ WebSocket error:", error);
};

ws.onclose = () => {
    console.warn("⚠️ WebSocket connection closed");
};

function sendMessage() {
    const input = document.getElementById("message");
    if (input.value.trim() !== "") {
        ws.send(input.value);
        input.value = "";
        console.log("📤 Message sent");
    }
}
