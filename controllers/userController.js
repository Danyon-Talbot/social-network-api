const User = require('../models/User');


module.exports = {
    // GETs all Users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: 'Server Error' });
        }
    },

    // GETS one user by ID
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });

            if(!user) {
                return res.status(404).json({ message: 'No user found with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Creates new User
    async createUser(req, res) {
        try {
          const { username, email } = req.body;
          const user = await User.create({ username, email });
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    // Updates User by ID
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });

            if (!user) {
                return res.status(404).json({ message: "No user found with that ID"})
            }

            res.json(user);
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },

    // Deletes User by ID
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: "No user found with that ID"})
            }

            res.json({ message: "User Deletion Successful"})
        } catch (err) {
            res.status(500).json({ error: 'Server error' });
        }
    },
}