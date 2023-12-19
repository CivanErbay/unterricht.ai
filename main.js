// import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

const __dirname = path.resolve();
const port = 3002; // Choose a port for your Express server

/// express setup
const app = express();
// app.use(cors());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

/// serve client
app.use(express.static(path.join(__dirname, 'dist')));
/// API routing
app.get('/api/data', (req, res) => {
  // Handle API requests here
  res.json({ message: 'Hello from Express!' });
});

// const httpServer = http.createServer(app);
// httpServer.listen(3000);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
