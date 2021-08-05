import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  IconButton,
  Typography,
  Button,
} from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { useHistory } from "react-router-dom";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const history = useHistory();

  useEffect(() => {
    let allTodos = window.localStorage.getItem("todo");
    if (allTodos) {
      allTodos = JSON.parse(allTodos);
      setTodos([...allTodos]);
    }
  }, []);

  const deleteTodo = (todo) => {
    if (todo > -1) {
      let item = todos[todo];
      let otherTodos = todos.filter((todo) => todo.name != item.name);
      setTodos([...otherTodos]);
      let remainingTodos = todos.filter((todo) => [item].indexOf(todo) < 0);
      localStorage.setItem("todo", JSON.stringify(remainingTodos));
    }
  };

  const clearAllTodos = () => {
    localStorage.removeItem("todo");
    history.push("/create");
  };
  return (
    <div>
      <Typography variant="h5">All Todos list</Typography>

      <List>
        {todos && todos.length ? (
          todos.map((todo, index) => (
            <ListItem key={index} divider={true}>
              <ListItemText primary={index + 1 + "."} />
              <ListItemText primary={todo.name} />
              <ListItemIcon>
                <Tooltip title="Delete" arrow>
                  <IconButton
                    color="secondary"
                    onClick={() => deleteTodo(index)}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Tooltip>
              </ListItemIcon>
            </ListItem>
          ))
        ) : (
          <div>No Todos</div>
        )}
      </List>
      {todos && todos.length ? (
        <Button color="secondary" variant="contained" onClick={clearAllTodos}>
          Clear all todos
        </Button>
      ) : (
        <Button
          color="primary"
          variant="contained"
          onClick={() => history.push("/create")}
        >
          Create New Todos
        </Button>
      )}
    </div>
  );
}
