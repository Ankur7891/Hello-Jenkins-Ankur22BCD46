const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (_, res) => {
  res.send('Ankur Majumdar (2022BCD0046) Says Hello!!!');
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`);
  });
}

module.exports = app; 
