const express = require('express');
const userRoutes = require('./app/routes/route');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api', userRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
