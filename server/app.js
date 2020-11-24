import express from 'express';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors'
import { ObjectId } from 'mongodb';

//db connection function
import connectDB from './bootstrap/db'

// graphql schema & resolvers
import resolvers from './resolvers';
import typeDefs from './schemas';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json());
const init = async () => {

  const db = await connectDB();
  const server = new ApolloServer({
    typeDefs: `${ typeDefs }`,
    resolvers: resolvers(db),
    formatError: error => {
      console.log(error);
      console.log(error.extensions.exception.stacktrace);
      return error;
    },
    formatResponse: response => {
      console.log(response);
      return response;
    },
    formatRequest: request => {
      console.log(request);
      return request;
    },
    context: async context => {
      const { req } = context;

      const publicOperations = ["posts", "login", "createUser"];

      if (!publicOperations.includes(req.body.operationName)) {
        const userId = req.headers.authorization;
        if (!userId || userId === "null") throw new Error("Invalid User!");

        const Users = db.collection("User");
        const currentUser = await Users.findOne({ _id: ObjectId(userId) });

        if (!currentUser) throw new Error("Failed to Authorize!");

        return { ...context, currentUser };
      }

      return context;
    }
  });

  server.applyMiddleware({ app });
}
init()
app.listen(PORT,() => {
    console.log(`Server is running on: ${ PORT }`)
});
