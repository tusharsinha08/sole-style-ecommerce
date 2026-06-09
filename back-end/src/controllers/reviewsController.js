const {
    createReview,
    getReviewsByProductId,
    deleteReview
} = require("../services/reviewsService");


// CREATE REVIEW
const addReview = async (req, res) => {
    try {
        const { userName, email, productId, comment, rating } = req.body;

        if (!userName || !email || !productId || !comment || !rating) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const reviewData = {
            userName,
            email,
            productId,
            comment,
            rating: Number(rating)
        };

        const result = await createReview(reviewData);

        res.status(201).json({
            success: true,
            message: "Review created successfully",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// GET REVIEWS BY PRODUCT ID
const getReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const result = await getReviewsByProductId(productId);

        res.status(200).json({
            success: true,
            message: "Reviews fetched successfully",
            data: result
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// DELETE REVIEW
const removeReview = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await deleteReview(id);

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    addReview,
    getReviews,
    removeReview
};