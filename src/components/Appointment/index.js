import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "hooks/useVisualMode";

// REDIRECT TO EACH PLACE DEPENDING WHERE THE USER CLICKS //

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  // FUNCTION TO SAVE A APPOINTMENT INTO THE DB //
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props
      .bookInterview(props.id, interview)
      .then(() => { transition(SHOW) })
      .catch(error => transition(ERROR_SAVE, true))
  }

  // FUNCTION TO DELETE AN EXISTING APPOINTMENT //
  function destroy() {
    transition(DELETING, true)
    props
      .cancelInterview(props.id)
      .then(() => { transition(EMPTY) })
      .catch((error) => transition(ERROR_DELETE, true))
  };

  return (
    // RENDERS EACH COMPONENT ACCORDING TO THE ACTION THE USER MAKES //
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
        <Show student={props.interview.student} interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)} onEdit={() => { transition(EDIT) }} />
      }
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} onSave={save} />}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRM && <Confirm onConfirm={destroy} onCancel={back} />}
      {mode === EDIT && < Form interviewers={props.interviewers} interviewer={props.interview.interviewer.id} student={props.interview.student} onCancel={back} onSave={save} />}
      {mode === ERROR_DELETE && <Error message={"Could not cancel the apointment!"} onClose={back} />}
      {mode === ERROR_SAVE && <Error message={"Could not save the apointment!"} onClose={back} />}

    </article>
  );
};




