import { ObjectId } from 'mongodb';

import Queries from './queries';
import Mutations from './mutations';

export default (db) => {
  const Users = db.collection("User");

  return {
    Query: Queries(db),
    Mutation: Mutations(db),
    Post: {
      createdBy: async ({ createdBy }) => {
        return createdBy ? await Users.findOne({ _id: ObjectId(createdBy) }) : {}
      }
    }
  }
};
