import moment from 'moment';

export default (db) => {
  const Posts = db.collection("Post")
  const Users = db.collection("User")

  return {
    createPost : async (root, { postInput: { title, body } }, { currentUser }) => {
      try {
        const result = await Posts.insertOne({
          title,
          body,
          createdAt: moment().valueOf(),
          createdBy: currentUser._id.toString()
        });

        return {
          success: true,
          message: "Post has been created successfully!",
          post: result.ops[0]
        };

      } catch (err) {
        return {
          success: false,
          message: err.message
        };
      }
    }
  }
}
