const User = require("../models/User");

// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch user profile.",
            error: error.message,
        });
    }
};

// Update logged-in user's profile
const updateProfile = async (req, res) => {
    try {
        const { name, bio, profileImage } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        if (name) user.name = name;
        if (bio !== undefined) user.bio = bio;
        if (profileImage !== undefined) user.profileImage = profileImage;

        await user.save();

        res.json({
            message: "Profile updated successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update profile.",
            error: error.message,
        });
    }
};

module.exports = {
    getUserProfile,
    updateProfile,
};