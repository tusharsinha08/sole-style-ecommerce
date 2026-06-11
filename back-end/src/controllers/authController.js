const jwt = require("jsonwebtoken");
const {
    createUser,
    updateUserDetails,
    fetchUsersByEmail,
    fetchAllUsers,
    fetchUserById,
    adminUpdateUserById,
    getAdminUser,
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
        // const query = req.query;
        const users = await fetchAllUsers();

        res.send(users);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server Error" });
    }
};

const getUser = async (req, res) => {
    try {
        const email = req.params.email;
        

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

const getAdmin = async (req, res) => {
    try {
        const email = req.params.email;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const result = await getAdminUser(email);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getAdminUserController:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    addUser,
    getUser,
    updateUser,
    getAllUsers,
    getUserById,
    updateUserById,
    getAdmin
};