import React from "react";
import DayListItem from "./DayListItem";

// CREATE A DAY LIST TO BE USED BY OTHER COMPONENTS //

export default function DayList(props) {

  const { days } = props
  const list = days.map((day) => {

    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.onChange}
      />
    );
  });

  return (
    <ul>
      {list}
    </ul>
  );
};