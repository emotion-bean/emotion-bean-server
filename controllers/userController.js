const UserDB = require('../models/userModel'); 

// 회원가입
exports.signup = async (req, res) => {
  const { name, email, password, fruits } = req.body;

  try {
    const existingUser = await UserDB.findOne({ email }).exec();
    if (existingUser) {
      return res.status(400).json({ success: false, errorMessage: 'Email already exists' });
    }

    const createdUser = await UserDB.create({ name, email, password, fruits });

    return res.status(201).json({ success: true, message: 'Signup successful', user: createdUser });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ success: false, errorMessage: 'Signup failed. Please try again.' });
  }
};

// 로그인
exports.login = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserDB.findOne({ email }).exec();

    if (user) {
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          fruits: user.fruits,
        },
      });
    } else {
      return res.status(404).json({ success: false, message: 'There is no account with this email' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during login' });
  }
};

// 열매 변경
exports.edit = async(req,res) => {
    try {
        const updatedDiary = await UserDB.findOneAndUpdate(
          { email, _id }, 
          { $set: { fruits } }, 
          { new: true } 
        );
    
        if (!updatedDiary) {
          return res
            .status(404)
            .json({ success: false, message: "Diary not found" });
        }
    
        return res.status(200).json({ success: true, diary: updatedDiary });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to update diary",
          error: error.message,
        });
      }
}