import jwt from "jsonwebtoken"

//next is a flag 
//middleware hmesha routes m use hota h
export const isLoggedIn = async (req,res, next) => {
    try {
        console.log(req.cookies);
        let token = req.cookies?.token

        console.log("Token Found: " , token ? "YES" : "NO")

        if(!token){
            console.log("No token")
            return res.status(401).json({
                success: false,
                message: "Authentication failed"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded data: ", decoded);
        req.user = decoded;

        next();
        
    } catch (error) {
        console.log("Auth middleware failure")
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        })
    }

    //agr try catch m nhi gya to aage controller pr bhejne k liye next() hota h
    
}

