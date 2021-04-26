import React from "react";
import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Home } from "./Home/Home";
import { Login } from "./Login/Login";
import UserContext from "../Context/UserContext";
import Header from "./Header/Header";
import BookManager from "./AdminPage/BookManager/BookManager";
import BorrowManager from "./AdminPage/BorrowManager/BorrowManager";
import CategoryManager from "./AdminPage/CategoryManager/CategoryManager";
import BorrowedBooks from "./Home/BorrowedBooks";
import AddBook from "./AdminPage/BookManager/AddBook";
import EditBook from "./AdminPage/BookManager/EditBook";
import EditCategory from "./AdminPage/CategoryManager/EditCategory";
import AddCategory from "./AdminPage/CategoryManager/AddCategory";
import BorrowDetail from "./AdminPage/BorrowManager/BorrowDetail";

function App() {
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setCurrentUser(JSON.parse(token));
    }
  }, []);

  let userLogin = null;
  let routeLink = null;
  if (currentUser !== null) {
    if (currentUser.role === 0) {
      userLogin = <Redirect to="/admin" />;
      routeLink = (
        <>
          <Route exact path="/admin">
            <BookManager />
          </Route>
          <Route path="/admin/addBook">
            <AddBook />
          </Route>
          <Route path="/admin/books/:bookId/edit">
            <EditBook />
          </Route>
          <Route path="/admin/addCategory">
            <AddCategory />
          </Route>
          <Route path="/admin/categories/:categoryId/edit">
            <EditCategory />
          </Route>
          <Route path="/admin/borrowManager">
            <BorrowManager />
          </Route>
          <Route path="/admin/borrowRequests/:borrowRequestId">
            <BorrowDetail />
          </Route>
          <Route path="/admin/categoryManager">
            <CategoryManager />
          </Route>
        </>
      );
    } else if (currentUser.role === 1) {
      userLogin = <Redirect to="/" />;
      routeLink = (
        <>
          <Route path="/borrowedBooks">
            <BorrowedBooks />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </>
      );
    }
  } else {
    userLogin = <Login />;
  }

  
  if (currentUser && currentUser.role === 0) {
    
  }
  return (
    <Router>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="a">
          <Header />
          <Switch>
            <Route path="/login">{userLogin}</Route>
            {routeLink}
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
