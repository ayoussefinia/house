import User from '../../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function createUser(args) {
  try {
    const {
      email,
      password,
      confirm
    } = args.userInput; //retrieve values from arguments
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists!');
    }
    if (password !== confirm) {
      throw new Error('Passwords are inconsistent!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword
    }, (err) => { if (err) throw err });
    user.save();
    // if user is registered without errors
    // create a token
    const token = jwt.sign({ id: user._id }, "mysecret");
    
    return { token, password: null, ...user._doc }
  }
  catch(err) {
    throw err;
  }
}

export async function login(args) {
  
  try {
    const {
      email,
      password
    } = args; //retrieve values from arguments

    const user = await User.findOne({ email });
    
    if (!user) {
      throw new Error('User not found');
    }

    const passwordIsValid = await bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      throw new Error('Password incorrect');
    }
    
    else {
      const token = jwt.sign({ id: user._id }, "mysecret");
      return { token, password: null, ...user._doc }
    }
    
  }
  catch(err) {
    throw err;
  }
}

