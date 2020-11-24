export default (db) => {
  const Posts = db.collection("Post")
  return {

    posts : async () => {
      try {
        const posts = await Posts.aggregate([
          {
            $lookup: {
              from:"Likes",
              localField:"_id",
              foreignField:"post",
              as:"postLikes"
            }
          },
          {
            $project: {
              _id:"$_id",
              title:"$title",
              body:"$body",
              createdAt:"$createdAt",
              createdBy:"$createdBy",
              likes:{ $size:"$postLikes" },
              likesData: "$postLikes.user"
            }
          }
        ]).sort({ createdAt : -1 }).toArray();
        return {
          success: true,
          message: "successful!",
          posts
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
