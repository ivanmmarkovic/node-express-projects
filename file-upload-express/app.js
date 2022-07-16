const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const fileUpload = require('express-fileupload');
const path = require('path');





app.listen(PORT, () => console.log(`Server running on port ${PORT}`));