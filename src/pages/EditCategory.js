import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import { useParams } from "react-router-dom"
import axios from "axios";
import Loading from "../components/Loading";


const EditCategory = (props) => {
    const [category, setCategory] = useState(null);
    const [allCategories, setAllCategories] = state(null)
    const [newCategoryName, setNewCategoryName] = useState("")
    const params = useParams ()
 

    useEffect (() => {
        axios.get(`http://localhost:3004/categories`)
        .then((res) => {
            console.log(res.data);
            setAllCategories(res.data);
            const myCategory = res.data.find((item) => item.id ==params.categoryId);
            setCategory(myCategory);
            setNewCategoryName(myCategory.name)
        }) 
        .catch((err) => console.log("editCategoryGetErr", err))
    }, []);
     const handleEdit = (event) => {
        event.preventDefault()
        if (newCategoryName === "") {
           alert("Kategori Ismi Bos Birakilamaz")
        }
     }

    if (category === null) {
        return (
            <Loading />
        )
    }
    return (
        <div>
            <Header />
            <div className="container my-5">
            <form onSubmit={}>
            <div className="mb-3 ">
          <label for="exampleInputEmail1" className="form-label ">
            Kategori Ismi
          </label>
          <input
            
            type="text"
            className="form-control w-70"
            id="exampleInputEmail1"
            value={newCategoryName}
            onChange={(event)=> setNewCategoryName(event.target.value)}
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
           
        </div>

    );
};



export default EditCategory;