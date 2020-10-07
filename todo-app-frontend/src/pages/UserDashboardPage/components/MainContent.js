import React, { useState, useEffect } from "react";
import "./MainContent.css";
import AddTodoComponent from "./AddTodoComponent";
import TodoListContainer from "./TodoListContainer";

import axiosInstance from "../../../utils/axiosInstance";
import { message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useAuth } from "../../../context/auth";

const { confirm } = Modal;

const MainContent = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const { authUser, logout } = useAuth();

  const handleAddTodo = ({ name, description }) => {
    setBtnLoading(true);
    axiosInstance
      .post(`/create-todo/${authUser}`, {
        name: name,
        description: description,
      })
      .then((res) => {
        setBtnLoading(false);
        message.success(res.data.message);
        fetchTodoList();
      })
      .catch((err) => {
        setBtnLoading(false);
        console.log(err);
        if (err.response) {
          if (err.response.status === 401) {
            logout();
          } else {
            message.error(
              err.response.data.message +
                ",You already have a todo with that name"
            );
          }
          console.log(err.response);
        } else {
          message.error(err.message);
          console.log(err.message);
        }
      });
  };

  const handleDeleteTodo = (name, todoItemId, completed) => {
    if (completed === false) {
      confirm({
        title:
          "Are you sure you want to delete this todo, it is not completed yet?",
        icon: <ExclamationCircleOutlined />,
        content: name,
        okText: "DELETE",
        okType: "danger",
        cancelText: "CLOSE",
        onOk() {
          console.log("OK");
          setLoading(true);
          axiosInstance
            .delete(`/delete-todo/${authUser}/${todoItemId}`)
            .then((res) => {
              setLoading(false);
              message.success(res.data.message);
              console.log(res);
              fetchTodoList();
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
              if (err.response) {
                if (err.response.status === 401) {
                  logout();
                } else {
                  message.error("Unable to delete task");
                }
                console.log(err.response);
              } else {
                message.error(err.message);
                console.log(err.message);
              }
            });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    } else {
      setLoading(true);
      axiosInstance
        .delete(`/delete-todo/${authUser}/${todoItemId}`)
        .then((res) => {
          setLoading(false);
          message.success(res.data.message);
          fetchTodoList();
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          if (err.response) {
            if (err.response.status === 401) {
              logout();
            } else {
              message.error("Unable to delete task");
            }
            console.log(err.response);
          } else {
            message.error(err.message);
            console.log(err.message);
          }
        });
    }
  };

  const handleCompleteTodo = (todoItemId) => {
    setLoading(true);
    axiosInstance
      .put(`/complete-todo/${authUser}/${todoItemId}`)
      .then((res) => {
        setLoading(false);
        console.log(res);
        message.success(res.data.message);
        fetchTodoList();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response) {
          if (err.response.status === 401) {
            logout();
          } else {
            message.error("Unable to complete task");
          }
          console.log(err.response);
        } else {
          message.error(err.message);
          console.log(err.message);
        }
      });
  };

  const fetchTodoList = () => {
    setLoading(true);
    console.log(authUser);
    if (authUser !== null) {
      axiosInstance
        .get(`/get-all-todos/${authUser}`)
        .then((res) => {
          console.log(res.data);
          const todolist = res.data.items.map((item) => {
            return {
              id: item._id,
              name: item.name,
              description: item.description,
              completed: item.completed,
            };
          });

          setTodos(todolist);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
          if (err.response) {
            if (err.response.status === 401) {
              logout();
            } else {
              message.error("Unable to fetch todos");
            }
            console.log(err.response);
          } else {
            console.log(err.message);
            message.error(err.message);
          }
        });
    }
  };

  useEffect(fetchTodoList, []);

  return (
    <div className="main-content-style">
      <AddTodoComponent handleAddTodo={handleAddTodo} btnLoading={btnLoading} />
      <TodoListContainer
        todos={todos}
        handleDeleteTodo={handleDeleteTodo}
        handleCompleteTodo={handleCompleteTodo}
        loading={loading}
      />
    </div>
  );
};

export default MainContent;
