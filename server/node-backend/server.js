
const express = require('express');
const app = express();


app.get('/', (req, res) => res.send('API Working'))

app.listen(4000, () => {
  console.log('✅ Node.js backend running at http://localhost:4000');
});
 