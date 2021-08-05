import React from "react";
import { Tooltip, IconButton } from "@material-ui/core";
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

export default function CategoryIcon(props) {
  const iconDisabler = (id) => {
    if (props.selectedIcon) {
      return id === props.selectedIcon;
    }
    return false;
  };

  return (
    <div>
      Select Category Icon -
      <Tooltip title="Home" arrow>
        <IconButton
          color="primary"
          id="home"
          disabled={iconDisabler("home")}
          onClick={() => props.selectIcon("home")}
        >
          <HomeOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Work" arrow>
        <IconButton
          color="primary"
          disabled={iconDisabler("work")}
          onClick={() => props.selectIcon("work")}
        >
          <WorkOutlineOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Fitness" arrow>
        <IconButton
          color="primary"
          disabled={iconDisabler("fitness")}
          onClick={() => props.selectIcon("fitness")}
        >
          <FitnessCenterOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Income" arrow>
        <IconButton
          color="primary"
          disabled={iconDisabler("income")}
          onClick={() => props.selectIcon("income")}
        >
          <MonetizationOnOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Hangout" arrow>
        <IconButton
          color="primary"
          disabled={iconDisabler("hangout")}
          onClick={() => props.selectIcon("hangout")}
        >
          <LocalBarOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Call" arrow>
        <IconButton
          color="primary"
          disabled={iconDisabler("call")}
          onClick={() => props.selectIcon("call")}
        >
          <CallOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Rest" arrow>
        <IconButton
          color="primary"
          disabled={iconDisabler("rest")}
          onClick={() => props.selectIcon("rest")}
        >
          <AirlineSeatIndividualSuiteOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Education" arrow>
        <IconButton
          color="primary"
          disabled={iconDisabler("education")}
          onClick={() => props.selectIcon("education")}
        >
          <SchoolOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Sport" arrow>
        <IconButton
          color="primary"
          disabled={iconDisabler("sport")}
          onClick={() => props.selectIcon("sport")}
        >
          <SportsBaseballOutlinedIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Other" arrow>
        <IconButton
          color="primary"
          disabled={iconDisabler("other")}
          onClick={() => props.selectIcon("other")}
        >
          <CachedOutlinedIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
