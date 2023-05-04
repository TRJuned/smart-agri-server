// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();
// const port = 3000;

// mongoose.connect('mongodb://localhost:27017/mydb', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

// const dataSchema = new mongoose.Schema({
//   sensor: String,
//   value: Number
// });

// const Data = mongoose.model('Data', dataSchema);

// app.use(express.json());

// app.post('/data', (req, res) => {
//   const data = new

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<//

// const express = require('express');
// const mongoose = require('mongoose');

// const app = express();

// // Connect to MongoDB database
// mongoose.connect('mongodb://localhost/my-database', { useNewUrlParser: true, useUnifiedTopology: true });

// // Define a schema for the data
// const dataSchema = new mongoose.Schema({
//   sensor: String,
//   value: Number
// });

// // Create a model for the data
// const Data = mongoose.model('Data', dataSchema);

// // Parse incoming request body as JSON
// app.use(express.json());

// // Handle incoming HTTP POST requests on the /data endpoint
// app.post('/data', (req, res) => {
//   // Extract the data from the request body
//   const { sensor, value } = req.body;

//   // Create a new instance of the Data model with the extracted data
//   const data = new Data({
//     sensor,
//     value
//   });

//   // Save the data to the MongoDB database
//   data.save((err) => {
//     if (err) {
//       console.error(err);
//       res.sendStatus(500);
//     } else {
//       res.sendStatus(200);
//     }
//   });
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server started on port 3000');
// });
