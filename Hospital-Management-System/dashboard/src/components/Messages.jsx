import "./Messages.css";
import { API_URL } from "../api.js";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated, authChecked } = useContext(Context);
  useEffect(() => {
    if (!authChecked || !isAuthenticated) return;
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/v1/message/getall`,
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response?.data?.message || error.message || "Something went wrong");
      }
    };
    fetchMessages();
  }, [authChecked, isAuthenticated]);

  if (!authChecked) {
    return <main className="page auth-loading" role="status">Checking your session…</main>;
  }
  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <section className="page messages">
      <h1>MESSAGE</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;
