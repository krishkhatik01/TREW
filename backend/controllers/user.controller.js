import User from "../models/user.model.js"; 
import uploadOnCloudinary from "../config/cloudinary.js";

export const getCurretUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password"); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ 
      message: "Error fetching user", 
      error: error.message
    });
  }
};

export const suggestedUsers = async (req, res) => {
  try {
    // Increased limit to 15 to test horizontal scrolling
    const users = await User.find({ _id: { $ne: req.userId } })
      .select("-password")
      .limit(15); 

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ 
      message: "Error fetching suggested users", 
      error: error.message 
    });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { name, userName, bio, profession, location, website, gender } = req.body;
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fixed the userName check syntax
    const sameUserWithUserName = await User.findOne({ userName: userName }).select("-password");
    if(sameUserWithUserName && sameUserWithUserName._id.toString() !== req.userId) {
      return res.status(400).json({message: "Username already taken"});
    }

    let profileImage;
    if (req.file) {
      profileImage = await uploadOnCloudinary(req.file.path);
    }

    user.name = name;
    user.bio = bio;
    user.profession = profession;
    user.location = location;
    user.gender = gender;
    
    // Only update profileImage if a new file was uploaded
    if (profileImage) {
      user.profileImage = profileImage;
    }

    await user.save();
    return res.status(200).json({message: "Profile updated successfully", user});

  } catch (error) {
    return res.status(500).json({ 
      message: "Error updating profile", 
      error: error.message 
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOne({ userName }).select("-password")
    if(!user) {
      return res.status(404).json({message: "User not found"});
    }
    return res.status(200).json({user});


  } catch (error) {
    
    return res.status(500).json({ 
      message: "Error fetching profile", 
      error: error.message 
    });
    
  }
};