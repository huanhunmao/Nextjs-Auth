import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://markfu1996:T9PyfJCyY9s2N8qi@cluster0.fdkjlve.mongodb.net/my-auth'
)

  return client;
}
