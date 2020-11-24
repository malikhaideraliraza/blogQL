import { ObjectId } from 'mongodb';

export default (db) => {

  const Likes = db.collection("Likes");
  const Posts = db.collection("Post");

  return {
    
    addLike: async (root, { postId }, { currentUser }) => {
      try {
        const post = await Posts.findOne({ _id: ObjectId(postId) });
        if (!post) throw new Error('Post Not Found!');

        await Likes.insertOne({ user : currentUser._id, post : ObjectId(postId) });
        
        return {
          success: true,
          message: "You have liked this post successfully!"
        }

      } catch (err) {
        return {
          success: false,
          message: err.message
        }
      }
    },

    cancelLike : async (root, {postId}, { currentUser }) => {
      try {
        const post = await Posts.findOne({ _id:ObjectId(postId) });
        if (!post) throw new Error('Invalid Post !');
        await Likes.deleteOne({ user : currentUser._id, post : ObjectId(postId) })
        return {
          success: true,
          message: "Post Unliked !"
        }
      } catch (err) {
        return {
          success: false,
          message: err.message
        }
      }
    }
  }
}
