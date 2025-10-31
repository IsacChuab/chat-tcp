import net from "net";

interface Client {
  clientId: number;
  socket: net.Socket;
}

const clients = {} as Record<number, Client>;
let nextClientId = 1;

const server = net.createServer((socket) => {
  console.log("New client connected");
  const clientId = nextClientId++;
  clients[clientId] = { clientId, socket };

  socket.on("data", (data) => {
    const message = data.toString().trim();

    Object.values(clients).forEach((clientObj: Client) => {
      if (clientObj.socket === socket) {
        console.log(`Received from user ${clientObj.clientId}:`, message);
      }

      if (clientObj.socket !== socket) {
        clientObj.socket.write(
          `user ${clientObj.clientId}:  ${message}` + "\n",
        );
      }
    });
  });

  socket.on("end", () => {
    console.log("Client disconnected", clientId);
    delete clients[clientId];
  });
});

server.listen(3008, () => {
  console.log("Server running on port 3008");
});
