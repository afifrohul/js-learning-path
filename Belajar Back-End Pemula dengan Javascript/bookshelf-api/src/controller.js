import { nanoid } from 'nanoid';
import books from './books.js';

export const createBook = (req, res) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message:
        'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const id = nanoid(16);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    return res.status(201).json({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: id },
    });
  }

  return res.status(500).json({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
};

export const getBooks = (req, res) => {
  const { name, reading, finished } = req.query;

  let filteredBook = books;

  if (name) {
    filteredBook = filteredBook.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (reading == 0) {
    filteredBook = filteredBook.filter((book) => book.reading == false);
  } else if (reading == 1) {
    filteredBook = filteredBook.filter((book) => book.reading == true);
  }

  if (finished == 0) {
    filteredBook = filteredBook.filter((book) => book.finished == false);
  } else if (finished == 1) {
    filteredBook = filteredBook.filter((book) => book.finished == true);
  }

  return res.status(200).json({
    status: 'success',
    data: {
      books: filteredBook.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });
};

export const getBookById = (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === id);

  if (book) {
    return res.status(200).json({
      status: 'success',
      data: { book },
    });
  }

  return res.status(404).json({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
};

export const editNoteById = (req, res) => {
  const { id } = req.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
  }

  if (readPage > pageCount) {
    return res.status(400).json({
      status: 'fail',
      message:
        'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
  }

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((n) => n.id === id);

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
    return res.status(200).json({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  }

  return res.status(404).json({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
};

export const deleteBook = (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((n) => n.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    return res.status(200).json({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  }

  return res.status(404).json({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
};
