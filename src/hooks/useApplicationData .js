import axios from 'axios';
import { useEffect, useState } from 'react';


// HOOK RESPONSIBLE FOR THE CALCULATION OF THE COMPONENTS //

export default function useApplicationData() {
  const setDay = day => setState(prev => ({ ...prev, day }));
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviwers: {}
  })

  // FUNCTION RESPONSIBLE FOR SHOWING THE CORRECT NUMBER OF AVAILABLE DAYS //

  const countSpots = (state, appointments) => {
    const currentDay = state.days.find((day) => day.name === state.day);
    const appmntIds = currentDay.appointments;
    const spots = appmntIds.filter((id) => !appointments[id].interview).length;
    const currentDayIndex = state.days.findIndex((day) => day.name === state.day);
    const updatedDayObj = { ...currentDay, spots };
    const updatedDaysArr = [...state.days];
    updatedDaysArr[currentDayIndex] = updatedDayObj;
    return updatedDaysArr;
  };

  // FECTH INFORMATION FROM THE API //
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])

  // FUNCTION RESPONSIBLE FOR BOOKING AN INTERVIEW AND UPDATING THE API //
  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`,
      appointment
    ).then(() => {
      const days = countSpots(state, appointments)
      setState({ ...state, days, appointments })
    })
  };

  // FUNCTION RESPONSIBLE FOR CANCELING THE APPOINTMENT AND UPDATING THE API //
  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = countSpots(state, appointments)
        setState({ ...state, days, appointments })
      })
  };

  return (
    {
      state,
      setDay,
      bookInterview,
      cancelInterview
    }
  );
};
