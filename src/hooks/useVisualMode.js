import { useState } from "react";

// HOOK RESPONSIBLE FOR MAKING THE TRANSITION AND BACK FUNCIONALITY BETWEEN PAST MODES //

export default function useVisualMode(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setMode(newMode)
      setHistory((prev) => [prev[0], newMode])
    } else {
      setMode(newMode)
      setHistory(prev => ([...history, newMode]))
    }
  };

  const back = () => {

    const newHistory = [...history]

    if (history.length >= 2) {
      newHistory.pop();
    }

    setHistory(newHistory)
    setMode(newHistory[newHistory.length - 1])
  };

  return { mode, transition, back }
};