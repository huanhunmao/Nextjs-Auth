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

        const existUser = await db.collection('users').findOne({ email: email})

        if(existUser) {
            res.status(422).json({
                message: 'User already exists'
            })
            client.close()
            return 
        }

        const hashedPassword = await hashPassword(password)
        const result = await db.collection('users').insertOne({
            email: email,
            password: hashedPassword
        })

         res.status(201).json({
            message:'Create user successfully !'
        })
        client.close()
    } catch (error) {
        console.log('Error creating user:', error)
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

export default handler
