// imageController.js
import { createWorker } from 'tesseract.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs/promises';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = path.resolve(__dirname, '../Data.json');
const worker = await createWorker('eng');
export async function uploadImage(req, res) {
  // Iniciar el trabajador de Tesseract

  // Procesar la imagen y extraer el texto
  try {
    const {
      data: {
        text
      }
    } = await worker.recognize(req.file.path);
    const lines = text.split('\n'); // Dividir el texto en líneas
    res.json(lines); // Devolver las líneas como un arreglo
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }

  // Finalizar el trabajador de Tesseract
  await worker.terminate();
}
export async function createPedido(req, res) {
  try {
    const {
      name,
      pedido,
      restaurant
    } = req.body;
    const data = await fs.readFile(dataPath);
    let dataNew = await JSON.parse(data);
    let pedidoNuevo = {
      name,
      pedido,
      restaurant,
      status: false
    };
    let id = 0;
    if (dataNew.length > 0) {
      for (const i of dataNew) {
        if (i.id > id) {
          id = i.id;
        }
      }
      id += 1;
    } else {
      id = 1;
    }
    pedidoNuevo = {
      ...pedidoNuevo,
      id
    };
    dataNew.push(pedidoNuevo);
    const json = JSON.stringify(dataNew, null, 2);
    await fs.writeFile(dataPath, json, 'utf-8');
    res.json(pedidoNuevo);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}
export async function getPedidos(req, res) {
  try {
    let data = await fs.readFile(dataPath);
    let dataName = JSON.parse(data);
    res.json(dataName);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}
export async function getPedido(req, res) {
  try {
    const {
      id
    } = req.params;
    const data = await fs.readFile(dataPath);
    let dataName = await JSON.parse(data);
    const restaurant = dataName.find(obj => obj.id === parseInt(id));
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).send("Pedido no existe");
      // res.json(dataName)
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}
export async function deletePedido(req, res) {
  try {
    const {
      id
    } = req.params; // El ID del restaurante que quieres eliminar
    const data = await fs.readFile(dataPath, 'utf8');
    let dataName = await JSON.parse(data);

    // Filtrar el arreglo para eliminar el restaurante con el ID especificado
    const newDataName = dataName.filter(restaurant => restaurant.id !== parseInt(id));

    // Convertir el nuevo arreglo a una cadena de texto JSON
    const json = JSON.stringify(newDataName, null, 2);

    // Escribir la nueva cadena de texto JSON al archivo
    await fs.writeFile(dataPath, json, 'utf8');
    res.json({
      message: 'Pedido eliminado exitosamente.'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}
export async function updatePedido(req, res) {
  try {
    const {
      id
    } = req.params; // El ID del restaurante que quieres editar
    const {
      name,
      pedido,
      restaurant
    } = req.body; // Los nuevos datos del restaurante
    const data = await fs.readFile(dataPath, 'utf8');
    let dataName = JSON.parse(data);

    // Encontrar el índice del restaurante con el ID especificado
    const index = dataName.findIndex(restaurant => restaurant.id === parseInt(id));
    if (index !== -1) {
      // Actualizar los datos del restaurante
      dataName[index] = {
        ...dataName[index],
        name,
        pedido,
        restaurant
      };

      // Convertir el nuevo arreglo a una cadena de texto JSON
      const json = JSON.stringify(dataName, null, 2);

      // Escribir la nueva cadena de texto JSON al archivo
      await fs.writeFile(dataPath, json, 'utf8');
      res.json({
        message: 'Pedido actualizado exitosamente.'
      });
    } else {
      res.status(404).json({
        message: 'Pedido no encontrado.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}
export async function updatePedidoStatus(req, res) {
  try {
    const {
      id
    } = req.params; // El ID del restaurante que quieres editar
    const {
      status
    } = req.body; // Los nuevos datos del restaurante
    const data = await fs.readFile(dataPath, 'utf8');
    let dataName = JSON.parse(data);

    // Encontrar el índice del restaurante con el ID especificado
    const index = dataName.findIndex(restaurant => restaurant.id === parseInt(id));
    if (index !== -1) {
      // Actualizar los datos del restaurante
      dataName[index] = {
        ...dataName[index],
        status
      };

      // Convertir el nuevo arreglo a una cadena de texto JSON
      const json = JSON.stringify(dataName, null, 2);

      // Escribir la nueva cadena de texto JSON al archivo
      await fs.writeFile(dataPath, json, 'utf8');
      res.json({
        message: 'Pedido actualizado exitosamente.'
      });
    } else {
      res.status(404).json({
        message: 'Pedido no encontrado.'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}