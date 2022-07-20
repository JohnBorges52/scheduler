//GET ALL THE APPOINTMENTS FOR A SPECIFIC DAY //

export function getAppointmentsForDay(state, day) {

  if (state.days.length === 0) return [];

  const filteredDays = state.days.find((dayList) => {
    return dayList.name === day;
  });

  if (!filteredDays) return [];

  const mappedFilteredDays = filteredDays.appointments.map((appointment) => {
    return state.appointments[appointment]
  });

  return mappedFilteredDays;
};

//RETURN THE APPOINTMENT OF A SPECIFIC INTERVIEW //

export function getInterview(state, interview) {

  if (!interview) return null

  const interviwerID = interview.interviewer;

  const interviewerInfo = state.interviewers[interviwerID];

  const student = interview.student;

  const appointment = {
    student: student,
    interviewer: interviewerInfo
  };

  return appointment;
};

// GET ALL THE INTERVIEWERS FOR A SPECIFIC DAY //
export function getInterviewersForDay(state, day) {

  if (state.days.length === 0) return [];

  const filteredDays = state.days.find((dayList) => {
    return dayList.name === day
  });

  if (!filteredDays) return [];

  const mappedFilteredDays = filteredDays.interviewers.map((interviewer) => {
    return state.interviewers[interviewer]
  });

  return mappedFilteredDays;
};