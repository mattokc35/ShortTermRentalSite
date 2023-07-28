const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/initial-request', (req, res) => {
    console.log(req.body);
    res.json({ message: "Hello from server!" });
});


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });