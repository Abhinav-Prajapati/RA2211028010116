const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const PORT = process.env.MOCK_SERVER_PORT || 3001;


app.use(cors());
app.use(express.json());


const mockRoutes = require('./routes/mockRoutes');
app.use('/test', mockRoutes);


app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
});