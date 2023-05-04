const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { body, validationResult } = require('express-validator');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('server running...');
});

app.use(cors());
app.use(express.json());

//iCFmmhPjFdUk2hvV
//meraj154213

const uri =
  'mongodb+srv://meraj154213:iCFmmhPjFdUk2hvV@cluster0.hj5abn5.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

//define the schema for data
const readingSchema = {
  moistureSensor: {
    type: Number,
    required: true,
  },
  npk: {
    type: Object,
    required: true,
    properties: {
      nitrogen: {
        type: Number,
        required: true,
      },
      phosphorus: {
        type: Number,
        required: true,
      },
      potassium: {
        type: Number,
        required: true,
      },
    },
  },
  dht11: {
    type: Object,
    required: true,
    properties: {
      temperature: {
        type: Number,
        required: true,
      },
      humidity: {
        type: Number,
        required: true,
      },
    },
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
};

async function run() {
  try {
    const dataCollection = client.db('smartAgri').collection('readings');
    // create a document to insert
    // const reading = {
    //     n: "350",
    //     p: "350",
    //     k: "350",
    //     date: "27/3/23"
    // }
    // const result = await dataCollection.insertOne(reading);
    // console.log(result);

    app.get('/readings', async (req, res) => {
      const cursor = dataCollection.find({});
      const readings = await cursor.toArray();
      res.send(readings);
    });

    app.get('/readings/:id', async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const reading = await dataCollection.findOne(query);
      res.send(reading);
    });
    //Add a POST endpoint that saves the data to database
    app.post('/readings');
    app.post(
      '/readings',
      [
        // Validate the request body against the schema
        // body('moistureSensor').isInt(),
        // body('npk.nitrogen').isInt(),
        // body('npk.phosphorus').isInt(),
        // body('npk.potassium').isInt(),
        // body('dht11.temperature').isInt(),
        // body('dht11.humidity').isInt(),
        body('moisture').isNumeric().withMessage('Moisture must be a number'),
        body('npk.nitrogen')
          .isNumeric()
          .withMessage('Nitrogen must be a number'),
        body('npk.phosphorus')
          .isNumeric()
          .withMessage('Phosphorus must be a number'),
        body('npk.potassium')
          .isNumeric()
          .withMessage('Potassium must be a number'),
        body('dht11.temperature')
          .isNumeric()
          .withMessage('Temperature must be a number'),
        body('dht11.humidity')
          .isNumeric()
          .withMessage('Humidity must be a number'),
      ],
      async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        // Save the data to the database
        const reading = req.body;
        const result = await dataCollection.insertOne(reading);
        res.send(result);
      }
    );
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
