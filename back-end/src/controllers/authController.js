const jwt = require("jsonwebtoken");
const {
    createUser,
    updateUserDetails,
    fetchUsersByEmail,
    fetchAllUsers,
    fetchUserById,
    adminUpdateUserById,
} = require("../services/authService")


const addUser = async (req, res) => {
    try {
        const user = req.body

        const existingUser = await fetchUsersByEmail(user.email);
        if (existingUser) {
            return res.send({ message: "User already exists" });
        }

        const result = await createUser(user);

        res.send(result);
    } catch (error) {
        console.error(error)
        res.send(error)
    }
};

const getAllUsers = async (req, res) => {
    try {
        const query = req.query;
        const users = await fetchAllUsers(query);

        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server Error" });
    }
};

const getUser = async (req, res) => {
    try {
        const email = req.params.email;
        console.log('hit the email', email);
        

        const user = await fetchUsersByEmail(email);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.send(user);
    } catch (error) {
        res.status(500).send({ message: "Server Error" });
    }
};


const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        

        const user = await fetchUserById(id);

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        res.send(user);
    } catch (error) {
        res.status(500).send({ message: "Server Error" });
    }
};

// UPDATE USER NAME
const updateUser = async (req, res) => {
    try {
        const user = req.body;
        const result = await updateUserDetails(user);

        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Server Error" });
    }
};


const updateUserById = async (req, res) => {
    try {
        const id = req.params;
        const data = req.body;
        
        const result = await adminUpdateUserById(id, data);

        res.send(result);
    } catch (error) {
        res.status(500).send({ message: "Server Error" });
    }
};


module.exports = {
    addUser,
    getUser,
    updateUser,
    getAllUsers,
    getUserById,
    updateUserById
};