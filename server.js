const express = require('express');
const app = require('./index')
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server listening on port 3000');
} )