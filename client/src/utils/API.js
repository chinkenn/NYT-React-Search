import axios from "axios";

export default {
  // Gets all books
  getBooks: function () {
    return axios.get("/api/books");
  },
  // Gets the book with the given id
  getBook: function (id) {
    return axios.get("/api/books/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function (id) {
    return axios.delete("/api/books/" + id);
  },
  // Saves a book to the database
  saveBook: function (bookData) {
    return axios.post("/api/books", bookData);
  },
  getArticles: function (search) {
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=" + search);
  },
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },
  getSavedArticles: function() {
    return axios.get("/api/articles");
  },
  deleteArticle: function (id) {
    return axios.delete("/api/articles/" + id);
  }
};
