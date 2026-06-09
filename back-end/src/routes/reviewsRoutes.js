const express = require("express");
const router = express.Router();

const {
    addReview,
    getReviews,
    removeReview
} = require("../controllers/reviewsController");
const { verifyToken } = require("../middlewares/verifyToken");


router.post("/", verifyToken, addReview);

router.get("/:productId", getReviews);

router.delete("/:id", removeReview);

module.exports = router;