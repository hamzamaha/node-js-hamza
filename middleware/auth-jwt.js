const { expressjwt: jwt } = require("express-jwt");


const authJwt=()=>{
    let secret = process.env.SECRET_KEY 

    return jwt({ 
        secret,
        algorithms: ["HS256"] 
    })
    .unless({
        path: [
            // to autorize all routes
            // {url:/(.*)/} 

        {url:/^\/images\/.*/},
        {url:'/api/v1/users/login'},
        {url:'/api/v1/users/register'},
        // {url:'/products', methods:['POST']},
        // {
        //     url:'/products', methods:['GET']
        // }
        ]
    })
}

module.exports=authJwt