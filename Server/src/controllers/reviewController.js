const Review = require("../models/Review");

// Get all reviews for a specific book
exports.getAllReviewsForBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const reviews = await Review.find({ bookId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Submit a review for a book
exports.submitReview = async (req, res) => {
  const { bookId, user, rating, comment } = req.body;
  try {
    const review = new Review({ bookId, user, rating, comment });
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
