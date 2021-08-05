import React, { useState } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import CategoryIcon from "./CategoryIcon";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  pad: {
    margin: 8,
  },
  padSmall: {
    margin: 4,
  },
}));

export default function CreateTodo() {
  const [todo, setTodo] = useState({ name: "", isDone: false });
  const [category, setCategory] = useState({ name: "", icon: "" });
  const [addCategory, setAddCategory] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const handleChange = (e) => {
    switch (e.target.id) {
      case "todoName":
        setTodo({ ...todo, name: e.target.value });
        break;

      case "categoryName":
        setCategory({ ...category, name: e.target.value.toLowerCase() });
        break;

      default:
        break;
    }
  };

  const toggleCategoryForm = (e) => {
    e.preventDefault();
    setAddCategory(!addCategory);
  };

  const submitTodo = (e) => {
    e.preventDefault();
    let todoItem = { ...todo };
    if (addCategory) {
      todoItem.category = category;
    }
    let all = window.localStorage.getItem("todo");
    all = JSON.parse(all);
    if (all && all.length) {
      all.push(todoItem);
      localStorage.setItem("todo", JSON.stringify(all));
    } else {
      let items = [];
      items.push(todoItem);
      localStorage.setItem("todo", JSON.stringify(items));
    }
    all = window.localStorage.getItem("todo");
    clearAllState();
    history.push("/todos");
  };

  const clearAllState = () => {
    setTodo({ name: "", isDone: false });
    setCategory({ name: "", icon: "" });
    setAddCategory(false);
  };

  return (
    <div>
      <Typography variant="h5">Create Todo</Typography>
      <form onSubmit={submitTodo}>
        {addCategory && (
          <CategoryIcon
            selectedIcon={category.icon}
            selectIcon={(icon) => setCategory({ ...category, icon: icon })}
          />
        )}
        <TextField
          className={classes.pad}
          id="todoName"
          onChange={handleChange}
          label="Todo Name"
          variant="outlined"
        />
        {addCategory ? (
          <div>
            <TextField
              label="Category Name"
              className={classes.pad}
              id="categoryName"
              variant="outlined"
              onChange={handleChange}
            />
            <Button
              onClick={toggleCategoryForm}
              color="secondary"
              variant="contained"
              className={classes.padSmall}
            >
              Remove Category
            </Button>
          </div>
        ) : (
          <Button
            onClick={toggleCategoryForm}
            color="default"
            variant="contained"
            className={classes.padSmall}
          >
            Add Category
          </Button>
        )}
        <Button
          onClick={submitTodo}
          color="primary"
          disabled={
            !todo.name || (addCategory && (!category.icon || !category.name))
          }
          variant="contained"
          className={classes.padSmall}
        >
          Create Todo
        </Button>
      </form>
    </div>
  );
}
