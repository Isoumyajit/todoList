import "./App.css";
import React from "react";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Header />
      <TodoList />
      <Footer />
    </>
  );
}

export default App;
