// server.js
// Minimal Express server to serve index.html, handle uploads, and list images.
// Usage:
// 1) npm init -y
// 2) npm install express multer
// 3) mkdir uploads
// 4) node server.js
//
// It will serve at http://localhost:3000

const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const UPLOAD_DIR = path.join(__dirname, 'uploads');

// ensure uploads folder exists
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// configure multer storage with safe filenames
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    // sanitize the original name somewhat and add timestamp
    const safeName = file.originalname.replace(/[^\w.\-() ]+/g, '_');
    const unique = Date.now() + '-' + Math.round(Math.random()*1e6);
    cb(null, unique + '-' + safeName);
  }
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } }); // 50MB limit

// serve index.html (client)
app.use(express.static(path.join(__dirname)));

// upload endpoint
app.post('/upload', upload.single('image'), (req, res) => {
  if(!req.file) return res.status(400).json({ error: 'No file uploaded' });
  // return basic info
  res.json({
    name: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    path: '/uploads/' + req.file.filename
  });
});

// list images endpoint
app.get('/images', (req, res) => {
  fs.readdir(UPLOAD_DIR, (err, files) => {
    if(err) return res.status(500).json({ error: 'Unable to list uploads' });
    // filter common image extensions
    const images = files
      .filter(f => /\.(jpe?g|png|gif|webp|avif|svg)$/i.test(f))
      .map(f => {
        const stat = fs.statSync(path.join(UPLOAD_DIR, f));
        return {
          name: f,
          url: '/uploads/' + encodeURIComponent(f),
          size: stat.size,
          mtime: stat.mtimeMs
        };
      })
      .sort((a,b) => b.mtime - a.mtime);
    res.json(images);
  });
});

// make sure uploads are served
app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '1d' }));

// fallback: serve index.html for any other route (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
  console.log('Uploads folder: ' + UPLOAD_DIR);
  console.log('Original project reference: /mnt/data/ImagePutter_unzipped/ImagePutter');
});
