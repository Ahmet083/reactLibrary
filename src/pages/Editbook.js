import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

import Modal from "../components/Modal";
import { useSelector, useDispatch } from "react-redux";

const EditBook = (props) => {
  const dispatch = useDispatch();
  const { categoriesState, booksState } = useSelector((state) => state);
  console.log(booksState);
  const params = useParams();
  const navigate = useNavigate();

  console.log("params", params);
 // const booksState = useState();

  const [bookname, setbookname] = useState("");
  const [author, setauthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setcategory] = useState("");
  // const [categories, setCategories] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(booksState.books, params.kitapId);
    const arananKitap = booksState.books.find(
      (item) => item.id == params.kitapId
    );
    if (arananKitap === undefined) {
      navigate("/");
      return;
    }
    console.log(arananKitap);
    setbookname(arananKitap?.name);
    setauthor(arananKitap?.author);
    setIsbn(arananKitap?.isbn);
    setcategory(arananKitap?.categoryId);
    // axios
    //   .get(`http://localhost:3004/books/${params.kitapId}`)
    //   .then((res) => {
    //     console.log(res.data);
    //     setbookname(res.data.name);
    //     setAuthor(res.data.author);
    //     setIsbn(res.data.isbn);
    //     setCategory(res.data.categoryId);
    //     axios
    //       .get("http://localhost:3004/categories")
    //       .then((res) => {
    //         setCategories(res.data);
    //       })
    //       .catch((err) => console.log("categories error", err));
    //   })
    //   .catch((err) => console.log(err));

    document.title = `Kitaplik - Kitap Duzenle - ${arananKitap}`;
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const editBook = () => {
    if (bookname === "" || author === "" || category === "") {
      alert("Kitap adı, Kitap Yazarı ve Kategori boş bırakılamaz");
      return;
    }
    const updatedBook = {
      id: params.kitapId,
      name: bookname,
      author: author,
      categoryId: category,
      isbn: isbn,
    };
    console.log("updatedBook", updatedBook);

    axios
      .put(`http://localhost:3004/books/${params.kitapId}`, updatedBook)
      .then((res) => {
        console.log(res);
        dispatch({ type: "EDIT_BOOK", payload: updatedBook });
        setShowModal(false);
        navigate("/");
      })
      .catch((err) => console.log("edit error", err));
  };

  if (categoriesState.success !== true || booksState.success !== true) {
    return <Loading />;
  }
  return (
    <div>
      <Header />
      <div className="container my-5">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Kitap Adı"
                value={bookname}
                onChange={(event) => setbookname(event.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Kitap Yazarı"
                value={author}
                onChange={(event) => setauthor(event.target.value)}
              />
            </div>
          </div>
          <div className="row my-5">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="ISBN"
                value={isbn}
                onChange={(event) => setIsbn(event.target.value)}
              />
            </div>
            <div className="col">
              <select
                className="form-select"
                value={category}
                onChange={(event) => setcategory(event.target.value)}
              >
                <option value={""} selected>
                  Kategori Seçin
                </option>
                {categoriesState.categories.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <button
              onClick={() => {
                setShowModal(true);
              }}
              type="submit"
             
              className="btn btn-Edit btn-primary shadow-lg p-1 w-25"
            >
              {" "}
              Edit Book{" "}
            </button>

            <button
              onClick={() => navigate("/")}
              type="button"
              className="btn btn-outline-danger w-25 mx-2"
            >
              Vazgeç
            </button>
            <button type="submit" className="btn btn-primary w-25">
              Kaydet
            </button>
          </div>
        </form>
      </div>
      {showModal === true && (
        <Modal
          title={`Edit ${bookname}`}
          explain={`Do you want to edit ${bookname} on your list?`}
          warning="(If you accept, the book will be edited on your list. This action can't be undone!) "
          onCancel={() => setShowModal(false)}
          onConfirm={() => editBook()}
        />
      )}
    </div>
  );
};

export default EditBook;
