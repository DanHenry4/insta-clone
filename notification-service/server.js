const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Notification Service Running'));

const PORT = process.env.PORT || 4006;
app.listen(PORT, () => console.log(`Notification service running on port ${PORT}`));
