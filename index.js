const express = require('express'); 
const routes = require('./Routes/users.js');

const app = express();
const PORT = 4000; 
app.use("/app", routes);

app.listen(PORT, () => { 
    console.log("Server is running at port " + PORT); 
});
