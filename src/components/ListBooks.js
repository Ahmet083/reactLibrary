import React, {useEffect, useState} from "react";
import axios from "axios";
import Loading from "./loading";
import { Link } from "react-router-dom";

 const ListBooks = (props) => {
 const [books, setBooks] =useState (null);
 const [categories, setCategories]=useState(null);
 const [didUpDate, setDidUpDate]= useState(false)

  useEffect(() => {

     axios
       .get("http://localhost:3004/books")
       .then((resBook) => {
        
        setBooks(resBook.data);
        axios.get("http://localhost:3004/categories")
        .then((resCat) => {
          setTimeout(()=> {
            setCategories(resCat.data);
          }, 1000);

        })
        .catch((err) => console.log("categories err", err));
       })
       .catch((err) => console.log("books err", err));
   },[didUpDate]);
   const deleteBook=(id) => {
    console.log(id);
    axios.delete(`http://localhost:3004/books/${id}`)
    .then(res=> {
      console.log(res);
      setDidUpDate(!didUpDate)
    })
   
     };

   if (books === null || categories === null ) {
    return <Loading />;
    
   }

    return ( 
      <div className="container my-5">
        <div className="my-3 d-flex justify-content-end">
            <link to={"/add-book"} className="btn btn-primary ">
            Kitap Ekle
            </link>
        </div>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">Kitabin Adi</th>
      <th scope="col">YAZAR</th>
      <th scope="col">Kategori</th>
      <th className="text-center" scope="col">ISBN</th>
      <th scope="col">Islem</th>
    </tr>
    <td>
      
    </td>
  </thead>
  <tbody>
  {books.map((book) => {
     const category = categories.find(
      (cat) => cat.id === book.categoryId
    );
    return (
      <tr>
      <td>{book.name}</td>
      <td>{book.author}</td>
      <td>{category.name}</td>
      <td className="text-center">{book.isbn === "" ? "-----" : book.isbn}
      </td>
      <td>
      <div className="btn btn-group" role="group" >
  <button type="button" className="btn btn-outline-danger text-light btn-sm"
  onClick={() => deleteBook(book.id)}>
     Delete
  </button>
 
</div>
      </td>
    </tr> 

     );
  })}
  </tbody>
</table>
</div>
        

    )
 }

 export default ListBooks;