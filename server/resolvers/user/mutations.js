import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default (db) => {
  const Users = db.collection('User');

  return {
    createUser : async (root , { userInput: { email, password, name} }) => {
      try {
        const existingUser = await Users.findOne({ email })

        if (existingUser) throw new Error("User Already Exists !");
        
        const hashedPassword = await bcrypt.hash(password, 12);
    
        const result = await Users.insertOne({
          email,
          password: hashedPassword,
          name,
        });
    
        const user = result.ops[0]
        const token = jwt.sign(
          { userId: user.id, email: user.email , name: user.name },
          'somesupersecretkey',
          { expiresIn: '365d' }
        );
        return { 
         success: true,
         message: "User Created Successfully !",
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
