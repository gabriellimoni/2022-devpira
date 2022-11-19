import server from "./server";
import "./database";

server.listen(3000, () => {
  console.log("Running on port 3000");
});
