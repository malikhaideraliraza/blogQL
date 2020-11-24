import { combineResolvers } from 'apollo-resolvers';

import User from './user';
import Post from './post';
import Likes from './likes';


export default (db) => {
  return combineResolvers([
    User(db),
    Post(db),
    Likes(db)
  ]);
}
