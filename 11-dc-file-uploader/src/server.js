const express = require('express');
const cors = require('cors');
const multer = require('multer');

const fs = require('fs');
const path = require('path');

const app = express();

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../', 'uploads'),
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${
      file.originalname
    }`;
    cb(null, fileName);
  },
});

const uploadImage = multer({ storage }).single('photo');

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../', 'uploads')));
app.use(express.static(path.join(__dirname, '../', 'dist')));

// routes
app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'dist', 'index.html'));
});

app.post('/image', uploadImage, (req, res) => {
  // console.log('req.file', req.file);
  if (req.file) {
    return res.json({ message: 'File uploaded successfully', file: req.file });
  }
  return res.status(400).json({ message: 'File upload failed' });
});

app.get('/all-images', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'dist', 'all-images.html'));
});

app.get('/api/get-all-images', (req, res) => {
  const files = [];
  const dir = path.join(__dirname, '../', 'uploads');
  fs.readdirSync(dir).forEach((file) => {
    files.push(file);
  });
  return res.json({ files });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
});
