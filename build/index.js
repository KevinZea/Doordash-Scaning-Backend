import app from "./app.js";
const port = 4000;
async function main() {
  app.listen(port);
  console.log("Server on port", port);
}
main();