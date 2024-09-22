import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import sampleData from '../sampleData/sampleData.json';
import type { SampleData, SampleDataArray } from '../types/SampleData';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

/**
 * I took advantage of using environemnt variables
 * I did this because when time comes to deploy the api, I can use
 * these env variables to set things like the api url, the port and also
 * work on the cors
 */

/**
 * I thought about splitting up the routes and importing them
 * This can allow you to do things, like pass different middleware to each route
 * Things you might do this for are validation, authentication etc
 * 
 * I did not do this here as it was a pretty simple get request, but if I was to expand on the api,
 * I would do this.
 */

const app = express();
const port = process.env.PORT || 5001;
const url = process.env.API_URL;
const frontEndUrl = process.env.FRONTEND_URL;
const frontEndPort = process.env.FRONTEND_PORT;

// Middleware
app.use(cors({
  origin: `${frontEndUrl}${frontEndPort}`,
  methods: ['GET', 'POST'],
}));

// We want to return json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data: SampleDataArray = sampleData as SampleDataArray;

// GET endpoint to return sample data
app.get('/data', (req: Request, res: Response) => {
  res.json(data);
});

// Endpoint to get data by PIC
app.get('/data/pic/:pic', (req: Request, res: Response) => {
  const { pic } = req.params;

  // Check if 'pic' is provided
  if (!pic) {
    return res.status(400).json({ message: 'PIC parameter is required.' });
  }

  // Filter the sample data based on the provided PIC
  const filteredData = data.filter((item: SampleData) => item.PIC === pic);

  if (filteredData.length > 0) {
    res.json(filteredData);
  } else {
    // return error if we did not find the pic provided
    res.status(404).json({ message: 'Data not found for the specified PIC.' });
  }
});

// Default endpoint
app.get('/', (req: Request, res: Response) => {
  // might as well return beef haha
  res.send('🥩');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${url}${port}`);
});

export { app };