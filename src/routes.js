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
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBooksByIdHandler,
  },
  {
    method: "PUT",
    path: "/books/{id}",
    handler: editBooksByIdHandler,
  },
  {
    method: "DELETE",
    path: "/books/{id}",
    handler: deleteBooksByIdHandler,
  },
];

module.exports = routes;
