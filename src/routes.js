const {
  addBookHandler,
  getAllBooks,
  getBooksByIdHandler,
  editBooksByIdHandler,
  deleteBooksByIdHandler,
} = require("./handlerBooks");

const routes = [
  {
    method: "POST",
    path: "/books",
    handlerBooks: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handlerBooks: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handlerBooks: getBooksByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handlerBooks: editBooksByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handlerBooks: deleteBooksByIdHandler,
  },
];

module.exports = routes;
