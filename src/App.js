import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddBook from "./pages/AddBook"

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path ="/" element={<Home />} />
       <Route path ="/add-book" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
