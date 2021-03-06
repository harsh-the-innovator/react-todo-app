import React from "react";
import { List } from "antd";
import "./TodoListContainer.css";
import TodoItem from "./TodoItem";

const TodoListContainer = ({
  todos,
  handleDeleteTodo,
  handleCompleteTodo,
  openModal,
  loading,
}) => {
  return (
    <div className="todo-list-container">
      <div style={{ color: "#fff" }}>TODO LIST</div>
      {todos === null || todos.length === 0 ? (
        <div className="empty-container">No Todos</div>
      ) : (
        <List
          loading={loading}
          dataSource={todos}
          renderItem={(item) => {
            return (
              <TodoItem
                item={item}
                handleDeleteTodo={handleDeleteTodo}
                handleCompleteTodo={handleCompleteTodo}
                openModal={openModal}
              />
            );
          }}
        />
      )}
    </div>
  );
};

export default TodoListContainer;
