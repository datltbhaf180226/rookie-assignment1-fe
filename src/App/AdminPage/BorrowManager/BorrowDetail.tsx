import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { authHeader } from "../../../Services/AuthService";
import "../../Assets/table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

function BorrowDetail() {
  const { borrowRequestId } = useParams<any>();
  const [borrowRequests, setBorrowRequests] = useState<any>();
  const [borrowRequestDetails, setBorrowRequestDetails] = useState<any>();

  useEffect(() => {
    (async () => {
      axios({
        method: "get",
        url: `https://localhost:44307/borrowRequests/${borrowRequestId}`,
        headers: authHeader(),
      })
        .then((res) => {
          console.log(res.data);
          setBorrowRequests(res.data);
        })
        .catch((err) => console.log(err));
    })();
  }, [borrowRequestId]);

  useEffect(() => {
    (async () => {
      axios({
        method: "get",
        url: `https://localhost:44307/borrowRequestDetails/${borrowRequestId}`,
        headers: authHeader(),
      })
        .then((res) => {
          console.log(res.data);
          setBorrowRequestDetails(res.data);
        })
        .catch((err) => console.log(err));
    })();
  }, [borrowRequestId]);

  const handleRequestStatus = (status: any) => {
    if (status === 0) {
      return <div style={{ color: "orange", fontWeight: 600 }}>Pending</div>;
    } else if (status === 1) {
      return <div style={{ color: "green", fontWeight: 600 }}>Aprrove</div>;
    } else {
      return <div style={{ color: "red", fontWeight: 600 }}>Reject</div>;
    }
  };

  return (
    <div>
      <table className="productTable">
        <thead>
          <tr>
            <th>No.</th>
            <th>BookId</th>
            <th>Name</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {borrowRequestDetails &&
            borrowRequestDetails.length > 0 &&
            borrowRequestDetails.map((borrowRequestDetail: any, index: any) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{borrowRequestDetail.book.id}</td>
                <td>{borrowRequestDetail.book.name}</td>
                <td>{borrowRequestDetail.book.author}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {borrowRequests &&
          borrowRequests.length > 0 &&
          borrowRequests.map((borrowRequest: any) => (
            <div key={borrowRequest.user.id}>
              <div>UserId: {borrowRequest.user.id}</div>
              <div>UserName: {borrowRequest.user.username}</div>
              <div style={{ display: "flex" }}>
                Status: {handleRequestStatus(borrowRequest.status)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BorrowDetail;
