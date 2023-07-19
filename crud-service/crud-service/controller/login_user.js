import UserInfo from '../model/login_user.js';
import jwt from 'jsonwebtoken';


const secret = "IamnotfatIamjustfluffy" 

export const register = async (req, res) => {

  let user = req.body;
  console.log(user);

  const existingUser = await UserInfo.findOne({"email": user.email});

  if(existingUser) {
    return res.status(404).json("USER ALREADY EXISTS !!!");
  }

  user = await UserInfo.create(user);

  res.status(200).json(user);

}

export const login = async (req, res) => {

  try {

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      console.log(user);

      if(!user) {
          return res.status(404).json({
              description: "User Does Not Exist !!!",
              content: {
                  type: 'Client Error',
                  code: '404',
                  path: '/user/profile/login',
                  message: 'User does not exist'
              }
          });
      }

      // console.log(mac_address);

      let isPasswordCorrect = await bcrypt.compare(password, user.password);

      // if(mac_address !== user.mac_address) isPasswordCorrect = false;

      if(!isPasswordCorrect) {
          return res.status(404).json({
              description: "Invalid Credentials !!!",
              content: {
                  type: 'Application Error',
                  code: '404',
                  path: '/user/profile/login',
                  message: 'Invalid credentials'
              }
          });
      }

      const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "365d" });

      res.status(200).json({ content: user, token, description: 'Logged in Successfully'});

  } catch (error) {
      res.status(500).json({
          description: 'User could not be logged in due to unexpected error',
          content: {
              type: 'System error',
              code: '500',
              path: '/user/profile/login',
              message: `Error processing request ${error.message}`
          }
      });
  }

};