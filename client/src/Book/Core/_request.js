import axios from "axios";
const URL = process.env.REACT_APP_API_URL;

export const BOOK_URL = `${URL}/book`;
export const REVIEW_URL = `${URL}/review`;

export const getAllBooks = async (email, username, password) => {
  try {
    const response = await axios.get(`${BOOK_URL}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

export const getBookById = async (bookId) => {
  try {
    const response = await axios.get(`${BOOK_URL}/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

export const postreview = async (bookId, user, rating, comment) => {
  try {
    const response = await axios.post(REVIEW_URL, {
      bookId,
      user,
      rating,
      comment,
    });
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

export const getReview = async (bookId) => {
  try {
    const response = await axios.get(`${REVIEW_URL}/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};
