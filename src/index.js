import app from "./app.js";

// Usa el PORT proporcionado en el entorno o por defecto a 4000
const port = process.env.PORT || 4000;

async function main() {
    // Escucha en `port` y 0.0.0.0
    app.listen(port, "0.0.0.0", function () {
        console.log("Server on port", port);
    });
}

main();
