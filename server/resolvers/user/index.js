import Queries from './queries';
import Mutations from './mutations';

export default (db) => {
  return {
    Query: Queries(db),
    Mutation: Mutations(db)
  }
};
