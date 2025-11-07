require('dotenv').config({ path: './.env.local' });
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { initializeWebSocketServer, handleUpgrade } = require("./lib/websocket-server");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

// When using Next.js 13+ App Router, we need to specify the directory
const app = next({ dev, hostname, port, dir: "." });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      // Be sure to pass the request to the Next.js handler
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling request", err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  // 1. Initialize the WebSocket Server
  initializeWebSocketServer(server);

  // 2. Handle the 'upgrade' event for WebSockets
  server.on("upgrade", (req, socket, head) => {
    const parsedUrl = parse(req.url, true);
    
    if (parsedUrl.pathname === "/api/voice") {
      handleUpgrade(req, socket, head);
    } else {
      // If not a voice API path, destroy the socket
      socket.destroy();
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});