import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../Database/model.js';


const router = Router();

const createToken = (email) => {
  return jwt.sign({ email }, 'secret', { expiresIn: '1h' });
};

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // Check if user login is valid
  // If yes, create token and return it to client

  const user = await User.findOne({ email: email });

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      const token = createToken(email);
      console.log(token);
      res.status(200).json({ token: token })
    } else {
      res
        .status(401)
        .json({ message: 'Authentication failed, invalid username or password.' });
    }
  } else {
    res.status(400).json({ message: "User not found please signup first" })
  }
  // res.status(200).json({ token: token, user: { email: 'dummy@dummy.com' } });
});

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email: email });
    if (!userFound) {
      const newUser = await User.create({ email: email, password: bcrypt.hashSync(password, 10) });
      const token = createToken(email);
      res.status(201).json({ newUser: "New user got created", token: token });
    }else{
      res.status(400).json({ message: "Email already exists" })
    }
  } catch (err) {
    console.log(err);
  }

  // Hash password before storing it in database => Encryption at Rest
  // bcrypt
  //   .hash(password, 12)
  //   .then(hashedPW => {
  //     // Store hashedPW in database
  //     console.log(hashedPW);

  //     try{
  //       await User.insertOne({email:email,password:password})

  //     }catch(err){
  //       console.log("user is not created");
  //     }

  //     const token = createToken();
  //     res
  //       .status(201)
  //       .json({ token: token, user: { email: 'dummy@dummy.com' } });
  //   })
  //   .catch(err => {
  //     console.error(err);
  //     res.status(500).json({ message: 'Creating the user failed.' });
  //   });
  // Add user to database
});

export default router;
