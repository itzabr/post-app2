require("dotenv").config();
require("./config/db");
require("./config/passport");

const http = require("http");
const app = require("./app");

const server = http.createServer(app);

// socket
require("./socket")(server);

server.listen(process.env.PORT || 3000, () => {
  console.log("🚀 Server running");
});
