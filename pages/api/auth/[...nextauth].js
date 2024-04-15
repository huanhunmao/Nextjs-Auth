import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { connectToDatabase } from '../../../lib/db'
import { verifyPassword } from '../../../lib/auth'

export default NextAuth({
    session:{
        jwr: true
    },
    provider: [
        Providers.Credentials({
            async authorize(credentials){
                const client = await connectToDatabase()

                const userCollection = client.db().collection('user')

                const user = await userCollection.findOne({
                    email: credentials.email
                })

                if(!user){
                    client.close()
                    throw new Error('User not found')
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                )

                if(!isValid){
                    client.close()
                    throw new Error('Could not login with this password')
                }

                client.close()
                return {
                    email: user.email,
                }
            }
        })
    ]
})