import express from 'express' 
import multer from 'multer' 
import cors from 'cors' 
import path from 'path' 
import { fileURLToPath } from 'url' 
import { dirname } from 'path' 
import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data';

// Configuración para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url) 
const __dirname = dirname(__filename) 

const app = express() 
const port = 3000 

app.use(cors()) 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) 
  }
}) 

const upload = multer({ storage: storage }) 

app.post('/predict', upload.single('image'), async (req, res) => {
    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(req.file.path));

      if (!req.file) {
        return res.status(400).json({ error: 'No file' });
      }
  
      const response = await axios.post('http://localhost:8000/predict', formData, {

        headers: formData.getHeaders(),
      });
  
      res.json(response.data);

      fs.unlink(req.file.path, (err) => {
        if (err) console.error('Error erasing the file', err);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Prediction error' });
    }
  });

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`) 
}) 

export default app  