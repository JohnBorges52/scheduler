import React from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'
import { useState } from 'react'

//CREATE A FORM SO THE USER CAN FILL WITH THEIR INFORMATION OF THE APPOINTMENT //

export default function Form(props) {

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //FUNCTION TO VALIDADE IF THE USER PUT THE RIGHT INFORMATION //
  function validate() {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer);
  }

  // MAKE AN EMPTY FIELD WHEN THE USER CANCEL AND GO BACK
  const reset = function () {
    setStudent('')
    setInterviewer(null)
  }
  const cancel = function () {
    reset()
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>

        <section className="appointment__validation">{error}</section>

        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>

      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
};
