import Mutations from './mutations';

export default (db) => {
  return {
    Mutation: Mutations(db)
  }
};
