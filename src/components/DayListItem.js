import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames";

//CREATE EACH ITEM OF THE LIST //

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  // FUNCTION TO DETERMINE WHAT TO SHOW ACCORDING TO SPOTS AVAILABLE
  const formatSpots = () => {
    if (props.spots === 0) {
      return "no spots remaining"
    }
    if (props.spots === 1) {
      return props.spots + " spot remaining"

    } else {
      return props.spots + " spots remaining"

    }
  };

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
};
