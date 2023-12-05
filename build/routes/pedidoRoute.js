import express from 'express';
import multer from 'multer';
import { uploadImage, createPedido, getPedidos, getPedido, deletePedido, updatePedido, updatePedidoStatus } from '../controllers/pedidoController.js';
const upload = multer({
  dest: '../uploads/'
});
const router = express.Router();
router.get('/', getPedidos);
router.get('/:id', getPedido);
router.post('/upload', upload.any(), uploadImage);
router.post('/create', createPedido);
router.delete('/delete/:id', deletePedido);
router.put('/update/:id', updatePedido);
router.put('/status/:id', updatePedidoStatus);
export default router;