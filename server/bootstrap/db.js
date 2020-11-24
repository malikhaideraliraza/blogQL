import { MongoClient } from 'mongodb';

//TODO create env file and make use of global variables
export default () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(`mongodb+srv://blogQLAdmin:blogQL@blogql.dyoqf.mongodb.net/<dbname>?retryWrites=true&w=majority`, { useUnifiedTopology: true }, 
    (err, client) => {
      if (err) reject(err)
      else {
        const db =  client.db('blogQL')
        console.log("connected to db")
        resolve(db)
      }
    })
  })
}