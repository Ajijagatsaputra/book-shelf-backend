const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } =
    request.payload;

  if (name === undefined){
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku"
    });
    response.code(400);
    return response;
  }

  if ( readPage > pageCount){
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  if (reading === undefined) {
    reading = false
  }

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
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBooks);

  const isSucces = books.filter((books) => books.id === id).length > 0;

  if (isSucces) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal ditambahkan",
  });
  response.code(400);
  return response;
};

const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;
  let certainBooks = books;  

  if (name !== undefined) {
    certainBooks = certainBooks.filter((n) =>
      n.name.toUpperCase().includes(name.toUpperCase())
    );
  }

  if (reading !== undefined) {
    const isReading = reading === '1';  
    certainBooks = certainBooks.filter((n) => n.reading === isReading);
  }

  if (finished !== undefined) {
    const isFinished = finished === '1'; 
    certainBooks = certainBooks.filter((n) => n.finished === isFinished);
  }

  const response = h.response({
    status: "success",
    data: {
      books: certainBooks.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });

  response.code(200);
  return response;
}

const getBooksByIdHandler = (request, h) => {
  const { id } = request.params;
  const newBooks = books.filter((n) => n.id === id)[0];

  if (newBooks !== undefined) {
    console.log('DEBUG', newBooks);
    return {
      status: "success",
      data: {
        book: newBooks,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
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

  if (name === undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
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
      status: "success",
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

  if (index !== -1) {
    books.splice(index, 1); 
    const response = h.response({
      status: "success",
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
