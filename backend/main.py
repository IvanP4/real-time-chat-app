from fastapi import FastAPI, WebSocket
from starlette.routing import WebSocketRoute
from typing import List

app = FastAPI()

active_connections: List[WebSocket] = []

async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            for connection in active_connections:
                await connection.send_text(data)
    except:
        active_connections.remove(websocket)

# Manually register the WebSocket route
app.router.routes.append(WebSocketRoute("/ws", websocket_endpoint))
