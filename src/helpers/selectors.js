export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) return []
  const filteredDays = state.days.find((dayList) => {
    return dayList.name === day;
  })
  if (!filteredDays) return []
  const mappedFilteredDays = filteredDays.appointments.map((appointment) => {
    return state.appointments[appointment]
  })
  return mappedFilteredDays;
}

export function getInterview(state, interview) {

  if (!interview) return null


  const interviwerID = interview.interviewer /* id */

  const interviewerInfo = state.interviewers[interviwerID]

  const student = interview.student

  const whateverfornow = {
    student: student,
    interviewer: interviewerInfo
  }

  return whateverfornow



}

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) return []

  const filteredDays = state.days.find((dayList) => {
    return dayList.name === day
  })
  if (!filteredDays) return []

  const mappedFilteredDays = filteredDays.interviewers.map((interviewer) => {


    return state.interviewers[interviewer]
  })

  return mappedFilteredDays
}


