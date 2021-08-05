import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import { useHistory, useLocation } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@material-ui/core";
import SubjectOutlined from "@material-ui/icons/SubjectOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import FitnessCenterOutlinedIcon from "@material-ui/icons/FitnessCenterOutlined";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import LocalBarOutlinedIcon from "@material-ui/icons/LocalBarOutlined";
import CallOutlinedIcon from "@material-ui/icons/CallOutlined";
import CachedOutlinedIcon from "@material-ui/icons/CachedOutlined";
import AirlineSeatIndividualSuiteOutlinedIcon from "@material-ui/icons/AirlineSeatIndividualSuiteOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import SportsBaseballOutlinedIcon from "@material-ui/icons/SportsBaseballOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";

const drawerWidth = 240;

const useStyles = makeStyles(() => {
  return {
    page: {
      background: "#f9f9f9",
      padding: 30,
      width: "100%",
    },
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: "#f4f4f4",
    },
    capitalize: {
      textTransform: "capitalize",
    },
    space: {
      padding: 12,
    },
  };
});

export default function Layout({ children }) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [navItems, setNavItems] = useState([]);
  const fixedNavItems = [
    {
      text: "Create Todos",
      icon: <AddCircleOutlineOutlinedIcon color="secondary" />,
      path: "/create",
    },
    {
      text: "All Todos",
      icon: <SubjectOutlined color="secondary" />,
      path: "/todos",
    },
  ];

  useEffect(() => {
    let allTodos = window.localStorage.getItem("todo");
    if (allTodos) {
      allTodos = JSON.parse(allTodos);
      let categories = allTodos
        .filter((todo) => todo.category)
        .map((todo) => todo.category);
      categories = categories.filter(
        (item, index, self) =>
          index ===
          self.findIndex((t) => t.name === item.name && t.icon === item.icon)
      );

      if (categories.length) {
        let formattedItems = matchCatObjectToIcon(categories, iconItems);
        setNavItems([...fixedNavItems, ...formattedItems]);
      } else {
        setNavItems([...fixedNavItems]);
      }
    } else {
      setNavItems([...fixedNavItems]);
    }
  }, [location]);

  function matchCatObjectToIcon(cats, iconObjs) {
    let store = [];

    for (let i = 0; i < cats.length; i++) {
      for (let j = 0; j < iconObjs.length; j++) {
        if (cats[i].icon == iconObjs[j].text) {
          store.push({
            text: cats[i].name,
            icon: iconObjs[j].icon,
            path: `/todos/${cats[i].name.toLowerCase()}`,
          });
        }
      }
    }
    return store;
  }

  const iconItems = [
    {
      text: "hangout",
      icon: <LocalBarOutlinedIcon color="secondary" />,
      path: "",
    },
    {
      text: "work",
      icon: <WorkOutlineOutlinedIcon color="secondary" />,
      path: "",
    },
    {
      text: "home",
      icon: <HomeOutlinedIcon color="secondary" />,
      path: "",
    },
    {
      text: "fitness",
      icon: <FitnessCenterOutlinedIcon color="secondary" />,
      path: "",
    },
    {
      text: "income",
      icon: <MonetizationOnOutlinedIcon color="secondary" />,
      path: "",
    },
    {
      text: "call",
      icon: <CallOutlinedIcon color="secondary" />,
      path: "",
    },
    {
      text: "other",
      icon: <CachedOutlinedIcon color="secondary" />,
      path: "",
    },
    {
      text: "rest",
      icon: <AirlineSeatIndividualSuiteOutlinedIcon color="secondary" />,
      path: "",
    },
    {
      text: "education",
      icon: <SchoolOutlinedIcon color="secondary" />,
      path: "",
    },
    {
      text: "sport",
      icon: <SportsBaseballOutlinedIcon color="secondary" />,
      path: "",
    },
  ];

  return (
    <div className={classes.root}>
      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
      >
        <div>
          <Typography variant="h5" className={classes.space}>
            Blist Todos
          </Typography>
        </div>

        {/* links/list section */}
        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                className={classes.capitalize}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* main content */}
      <div className={classes.page}>{children}</div>
    </div>
  );
}
