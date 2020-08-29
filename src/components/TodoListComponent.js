import React from "react";
import { Card, ListGroup, Row, Col, Button } from "react-bootstrap";
import "./TodoListComponent.css";

const TodoItem = ({ item }) => {
  return (
    <ListGroup.Item
      style={{
        backgroundColor: "transparent",
        border: "none",
        borderRadius: "20px",
        marginBottom: "40px",
        boxShadow:
          "-3px 3px 0px rgba(0,255,255,0.8), 3px -3px 5px rgba(0,0,0,0.5)",
      }}
    >
      <Row className="row-style">
        <Col xs={12} sm={6} md={8}>
          <div className="todo-item-name">
            <h6>{item.name}</h6>
          </div>
          <div className="todo-item-description">{item.description}</div>
        </Col>
        <Col xs={12} sm={6} md={4} className="buttons-style">
          <Button variant="outline-primary" style={{ marginRight: "10px" }}>
            Complete
          </Button>
          <Button variant="outline-danger">Delete</Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

const TodoListComponent = ({ todos }) => {
  console.log(todos);
  return (
    <div className="todo-list-container">
      <Card
        style={{ backgroundColor: "transparent", border: "1px solid orange" }}
      >
        <Card.Body>
          <Card.Title>Todo List</Card.Title>
          {todos.length === 0 ? (
            <div className="empty-container">No Todos</div>
          ) : (
            <ListGroup>
              {todos.map((item) => {
                return <TodoItem item={item} key={item.id} />;
              })}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default TodoListComponent;
