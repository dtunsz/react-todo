import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  IconButton,
  Button,
  TextField,
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  right: {
    float: "right",
    margin: 4,
    marginTop: 16,
  },
  capitalize: {
    textTransform: "capitalize",
    fontSize: 18,
  },
  pad: {
    margin: 8,
  },
  padSmall: {
    margin: 4,
  },
}));

export default function CategoryTodo() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ name: "", isDone: false });
  const [allTodos, setAllTodos] = useState([]);
  const [addTodo, setAddTodo] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);

  const { category } = useParams();
  const history = useHistory();

  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  useEffect(() => {
    let allTodos = window.localStorage.getItem("todo");
    if (allTodos) {
      allTodos = JSON.parse(allTodos);
      setAllTodos([...allTodos]);
    }
    if (category) {
      let categoryTodos = allTodos.filter(
        (todo) => todo.category && todo.category.name == category
      );
      setTodos([...categoryTodos]);
    }
  }, [category, addTodo]);

  const handleChange = (e) => {
    setTodo({ ...todo, name: e.target.value });
  };

  const createTodo = () => {
    let newTodo = todo;
    newTodo.category = todos[0].category;
    let all = window.localStorage.getItem("todo");
    all = JSON.parse(all);
    if (all && all.length) {
      all.push(newTodo);
      localStorage.setItem("todo", JSON.stringify(all));
    } else {
      let items = [];
      items.push(newTodo);
      localStorage.setItem("todo", JSON.stringify(items));
    }
    setAddTodo(!addTodo);
  };

  const closeModal = () => {
    setOpenDeleteCategory(false);
  };

  const deleteCategory = () => {
    let remaining = allTodos.filter((todo) => !todo.category);
    let remain = allTodos.filter((todo) => todo.category);
    let remainingT = remain.filter((todo) =>
      todos.some(
        (catTodo) =>
          catTodo.name !== todo.name &&
          catTodo.category.name !== todo.category.name
      )
    );

    const allRemainingTodos = [...remainingT, ...remaining];
    localStorage.setItem("todo", JSON.stringify(allRemainingTodos));
    setOpenDeleteCategory(false);
    history.push("/todos");
  };

  const deleteTodo = (todo) => {
    let all = todos;
    if (todo > -1) {
      let item = todos[todo];
      let otherTodos = todos.filter((todo) => todo.name != item.name);
      setTodos([...otherTodos]);
      let remainingTodos = allTodos.filter((todo) => [item].indexOf(todo) < 0);
      localStorage.setItem("todo", JSON.stringify(remainingTodos));
    }
    if (all.length === 1 && todo > -1) history.push("/todos");
  };

  const categoryModalBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Delete Category</h2>
      <p id="simple-modal-description">
        Are you sure you want to delete {category} category?
      </p>
      <span>Doing this will delete all the Todos in this category</span>
      <Button
        variant="contained"
        className={classes.right}
        color="secondary"
        size="small"
        onClick={deleteCategory}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        size="small"
        className={classes.right}
        onClick={closeModal}
      >
        Cancel
      </Button>
    </div>
  );

  return (
    <div>
      <span className={classes.capitalize}>{category}</span> category todos list
      {addTodo ? (
        <div>
          <TextField
            className={classes.pad}
            id="categoryTodo"
            onChange={handleChange}
            label="Todo Name"
            variant="outlined"
          />
          <Button
            variant="contained"
            disabled={addTodo && !todo.name}
            color="primary"
            className={classes.padSmall}
            onClick={createTodo}
          >
            Create
          </Button>
          <Button
            variant="contained"
            className={classes.padSmall}
            onClick={() => setAddTodo(!addTodo)}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Tooltip title="Add Todo" arrow>
          <IconButton color="primary" onClick={() => setAddTodo(!addTodo)}>
            <AddCircleOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
      <List>
        {todos && todos.length ? (
          todos.map((todo, index) => (
            <ListItem key={index} divider={true}>
              <ListItemText primary={index + 1 + "."} className={classes.mr} />
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
        <br />
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDeleteCategory(true)}
      >
        Delete Category
      </Button>
      <Modal
        open={openDeleteCategory}
        onClose={() => setOpenDeleteCategory(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {categoryModalBody}
      </Modal>
    </div>
  );
}
