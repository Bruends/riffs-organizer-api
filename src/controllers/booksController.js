const { openDbConnection, closeDbConnection } = require("../models/connection");
const userBooksSchema = require("../models/userBooksSchema");

const updateUserBooks = async (username, booksCallback) => {
  try {
    openDbConnection();
    const user = await userBooksSchema.findOne({ username });
    const newBooks = booksCallback(user.books);
    user.books = newBooks;
    await user.save();
    return { books: user.books };
  } catch (err) {
    return { error: err.message };
  } finally {
    closeDbConnection();
  }
};

const addBook = async (request, response) => {
  const { username } = request;
  const { book } = request.body;

  const addResponse = await updateUserBooks(username, (userBooks) => {
    return [book, ...userBooks];
  });

  if (!addResponse.error) response.status(201).json(addResponse);
  else response.status(500).json(addResponse);
};

const updateBook = (request, response) => {
  const { username } = request;
  const { book } = request.body;
  const { _id } = book;

  const updateResponse = updateUserBooks(username, (userBooks) => {
    newBooks = userBooks.filter((userBook) => userBook._id != _id);
    return [book, ...newBooks];
  });

  if (!updateResponse.error) response.status(200).json({});
  else response.status(500).json(updateResponse);
};

const deleteBook = (request, response) => {
  const { username } = request;
  const { _id } = request.body;

  const deleteResponse = updateUserBooks(username, (userBooks) => {
    return userBooks.filter((book) => book._id != _id);
  });

  if (!deleteResponse.error) response.status(200).json({});
  else response.status(500).json(deleteResponse);
};

const showAll = async (request, response) => {
  const { username } = request;
  try {
    openDbConnection();
    const user = await userBooksSchema.findOne({ username });
    response.json(user.books);
    console.log(user);
  } catch (err) {
    response.status(500).json({ error: err.message });
  }
  closeDbConnection();
};

module.exports = {
  showAll,
  addBook,
  updateBook,
  deleteBook,
};
