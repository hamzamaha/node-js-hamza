const { expressjwt: jwt } = require("express-jwt");


const authJwt=()=>{
    let secret = process.env.SECRET_KEY 

    return jwt({ 
        secret,
        algorithms: ["HS256"] 
    })
    .unless({
        path: [
        {url:/^\/images\/.*/},
        {url:'/users/login'},
        {url:'/users/register'},
        {url:'/products', methods:['POST']},
        {
            url:'/products', methods:['GET']
        }
        ]
    })
}

module.exports=authJwt