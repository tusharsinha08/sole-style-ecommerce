const { addContactDetails } = require("../services/contactsService");
const { sendContactEmail } = require("../utils/sendEmail");

const addContact = async (req, res) => {
    try {
        const data = req.body;
        await addContactDetails(data)

        await sendContactEmail(data);

        res.status(201).send({
            success: true,
            message: "Message sent successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).send({
            success: false,
            message: "Failed to send message",
        });
    }
}

module.exports = {
    addContact
}