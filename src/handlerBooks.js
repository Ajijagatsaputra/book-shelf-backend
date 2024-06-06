const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage } =
    request.payload;
  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBooks = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    id,
    finished,
    insertedAt,
    updatedAt,
  };

  books.push(newBooks);

  const isSucces = books.filter((books) => books.id === id).length > 0;

  if (isSucces) {
    const response = h.response({
      status: "succes",
      message: "Buku berhasil ditambahkan",
      data: {
        booksId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal, menambahkan buku. Mohon isi nama buku",
  });
  response.code(400);
  return response;
};

const getAllBooks = () => ({
  status: "succes",
  data: {
    books,
  },
});

getBooksByIdHandler = (request, h) => {
  const { id } = request.params;
  const books = books.filter((n) => n.id === id)[0];

  if (books !== undefined) {
    return {
      status: "sukses",
      data: {
        books,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message:
      "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
  });
  response.code(400);
  return response;
};

const editBooksByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (name === undefined){
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku, mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if ( readPage > pageCount){
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku, readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((books) => books.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: "sukses",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteBooksByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((n) => n.id === id);

  if(index !== -1){
    books.splice(index, -1);
    const response = h.response({
      status: "succes",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooks,
  getBooksByIdHandler,
  editBooksByIdHandler,
  deleteBooksByIdHandler,
};
