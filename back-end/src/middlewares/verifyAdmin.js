const { getUsersCollection } = require("../config/db")


const verifyAdmin = async (req, res, next) => {
    try {
        const usersCollection = getUsersCollection();
        const email = req.email;
        const user = await usersCollection.findOne({ email })

        if (!user) {
            return res.send.status(404).send({ message: "User not found" })
        }

        if (user.role !== 'admin') {
            return res.send.status(403).send({ message: "Forbidden - Admin access only" })
        }

        next()
    } catch (error) {
        res.status(500).send({ message: 'Server Error', error })
    }
}

module.exports = {
    verifyAdmin
}