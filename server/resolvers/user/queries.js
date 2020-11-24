import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default (db) => {
  const Users = db.collection('User');

  return {
    login: async (root, { email, password }) => {
      try {
        const user = await Users.findOne({ email });

        if (!user) throw new Error("User Not Found !");

        if (!await bcrypt.compare(password, user.password)) throw new Error("Invalid Credentials !");

        const token = jwt.sign(
          { userId: user._id, email, name: user.name },
          'somesupersecretkey',
          { expiresIn: '365d' }
        );
        return {
          success: true,
          message:"User LogIn Successfully !",
          userId: user._id,
          token
        };
      } catch (err) {
        return {
          success: false,
          message: err.message
        }
      }
    }
  }
}
