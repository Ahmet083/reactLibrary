import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AddCategoryForm = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [categoryName, setCategoryName] = useState("");
  const { categoriesState } = useSelector((state) => state);

  useEffect(() => {
    document.title = "Kitaplık - Kategori Ekle";
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault(); 
    if (categoryName === "") {
      alert("Kategori Ismi Bos Birakilamaz");
      return;
    }
    const hasCategory = categoriesState.categories.find(
      (item) => item.name.toLowerCase() === categoryName.toLowerCase()
    );
    if(hasCategory !== undefined ){
      alert("Bu kategory zaten kayitlidir")
      return;
    }

    const newCategory = {
      id: new Date().getTime(),
      name: categoryName[0].toUpperCase() + categoryName.substring(1),
    }
    axios
    .post('http://localhost:3004/categories', newCategory)
    .then((res)=>{
      console.log(res.data);
      dispatch({type: "ADD_CATEGORY, payload: newCategory"})
      navigate("/categories");

    })
   .catch((err) => console.log('addCategoryErr', err))
  };


  return (
    <div className="container my-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 ">
          <label for="exampleInputEmail1" className="form-label ">
            Kategori Ismi
          </label>
          <input
            value={categoryName}
            onChange={(event) => setCategoryName(event.target.value)}
            type="text"
            className="form-control w-70"
            id="exampleInputEmail1"
          />
        </div>

        <div className="mb-3 form-check"></div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary w-50">
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
