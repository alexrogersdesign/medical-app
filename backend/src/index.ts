import express from 'express';
import cors from 'cors'; 
import diagnosisRouter from './routes/diagnosisRouter';
import patientRouter from './routes/patientRouter';

const app = express();
// app.use(cors);
app.use(express.json());

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
}; 

app.use(cors(options)); 

app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});