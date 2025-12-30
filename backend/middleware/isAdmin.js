import jwt from "jsonwebtoken"
import User from "../model/user.model.js"

const isAdmin = async (req, res, next) => {
    try {
        let { token } = req.cookies
        if (!token) {
            return res.status(401).json({ message: "User doesn't have a token!" })
        }
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(verifyToken.userId)
        if (!user) {
            return res.status(401).json({ message: "User not found!" })
        }
        if (user.role !== "Admin") {
            return res.status(403).json({ message: "Access denied. Admin role required." })
        }

        req.userId = verifyToken.userId
        req.user = user
        next()

    } catch (error) {
        return res.status(401).json({ message: `isAdmin error ${error}` })
    }
}

export default isAdmin