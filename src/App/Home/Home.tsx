import axios from "axios";
import { useEffect, useState } from "react";
import { authHeader } from "../../Services/AuthService";
import { Book } from "../AdminPage/BookManager/BookManager";

export function Home() {
  const [books, setBooks] = useState<Book[]>();

  useEffect(() => {
    (async () => {
      axios({
        method: "get",
        url: "https://localhost:44307/books",
        headers: authHeader(),
      })
        .then((res) => {
          console.log(res.data);
          setBooks(res.data);
        })
        .catch((err) => console.log(err));
    })();
  }, []);

  return (
    <div>
      {books &&
        books.length > 0 &&
        books.map((book: Book) => (
          <div key={book.id}>
            <div>{book.name}</div>
            <div>{book.author}</div>
            <div>{book.category.name}</div>
            <hr />
          </div>
        ))}
    </div>
  );
}
