import React  from "react";
import { useState, useEffect } from "react"

const AddCategoryForm = (props) => {

    useEffect = (() => {
        document.title = "Kategori Ekle"
    },[])
  return (
    <div className="container my-5">
      <form>
        <div className="mb-3 ">
          <label for="exampleInputEmail1" className="form-label ">
            Kategori Ismi
          </label>
          <input
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
