import { hashPassword } from "../../../lib/auth"
import { connectToDatabase } from "../../../lib/db"

async function handler(req, res){
    if(req.method !== "POST"){
        return res.status(405).end() // Method Not Allowed
    }

    try {
        const data = req.body 
        const { email, password } = data 

        if(!email || !email.includes('@') || !password) {
            return res.status(422).json({
                message: 'Invalid email or password'
            })
        }

        const client = await connectToDatabase()
        const db = client.db()

        const hashedPassword = await hashPassword(password)
        const result = await db.collection('users').insertOne({
            email: email,
            password: hashedPassword
        })

        return res.status(201).json({
            message:'Create user successfully !'
        })
    } catch (error) {
        console.error('Error creating user:', error)
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

export default handler
