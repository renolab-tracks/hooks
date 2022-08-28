import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Users from "./Users";
import Header from "./Header";
import BookDetails from "./BookDetails";
import Todos from "./Todo";

export default function RoutesIndex() {
  return (
    <Router>
      <div>
        <Header />
        {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/todos" element={<Todos />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/book/:id" element={<BookDetails />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
