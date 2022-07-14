import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss"


export default function InterviewerListItem(props) {

  const { name, avatar } = props;

  const interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected

  })


  return (
    <li onClick={props.setInterviewer} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {props.selected && props.name}
    </li>

  )

}