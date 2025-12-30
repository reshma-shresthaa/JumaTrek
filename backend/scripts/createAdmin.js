
import dotenv from "dotenv"
import mongoose from "mongoose"
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"

import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, "../.env") })

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB")

        const args = process.argv.slice(2)
        if (args.length < 4) {
            console.log("Usage: node createAdmin.js <name> <email> <password> <contact>")
            process.exit(1)
        }

        const [name, email, password, contact] = args

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            console.log("User already exists")
            process.exit(1)
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const adminUser = await User.create({
            name,
            email,
            password: hashedPassword,
            contact,
            role: "Admin"
        })

        console.log("Admin user created successfully:", adminUser.email)
        process.exit(0)

    } catch (error) {
        console.error("Error creating admin:", error)
        process.exit(1)
    }
}

createAdmin()
