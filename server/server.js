const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());



app.post('/initial-request', (req, res) => {
    let totalPrice = req.body.numberOfNights * 200;
    console.log(req.body);
    res.json({ totalPrice });
});


app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });