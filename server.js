
const express = require('express');
const app = express();
const port = 3000;
var cors = require('cors')

app.use(cors())


const { fetchData } = require('./fetchData');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/instagram', async (req, res) => {
  try {

    const data = await fetchData();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
