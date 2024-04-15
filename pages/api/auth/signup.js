import { hashPassword } from "../../../lib/auth"
import { connectToDatabase } from "../../../lib/db"


async function handler(req,res){
    const data = req.body 
    const { email, password } = data 

    if(!email || !email.includes('@') || !password || !password.length < 7) {
        res.status(422).json({
            message: 'Invalid email or password'
        })
        return 
    }

    const client = await connectToDatabase()

    const db = client.db()
    const result = db.collection('users').insertOne({
        email: email,
        password: hashPassword(password)
    })

    console.log('result',result);

    res.status(201).json({
        message:'Create user successfully !'
    })
}

export default handler