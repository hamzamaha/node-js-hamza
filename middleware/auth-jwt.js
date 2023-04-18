const { expressjwt: jwt } = require("express-jwt");


const authJwt=()=>{
    let secret = process.env.SECRET_KEY 

    return jwt({ 
        secret, algorithms: ["HS256"] 
    })
    .unless({
        path: [
        {url:'/users/login'},
        {url:'/users/register'},
        {
            url:'/products', methods:['GET']
        }
        ]
    })
}

module.exports=authJwt