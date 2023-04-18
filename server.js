const server =require("./app")
require('./config/db')

const PORT=process.env.PORT || 5000;

server.listen(PORT,()=>{
    console.log(`the server is running in  http://localhost:${PORT}`);
})