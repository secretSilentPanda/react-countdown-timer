import React, { useEffect, useState } from "react";

export default function Timer({ index, remove }) {
  const [timeInput, setTimeInput] = useState(0);
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [minTime, setMinTime] = useState(0);

  useEffect(() => {
    let time = new Date().toISOString();
    const limit = time.substring(0, time.length - 5);
    setMinTime(limit);
  }, []);

  useEffect(() => {
    let interval;
    if (isActive && !isReset && time > 10) {
      interval = setInterval(() => {
        setTime(time - 10);
        clearInterval(interval);
      }, 10);
    }
    return () => clearInterval(interval);
  });

  function handlePause() {
    setIsActive(!isActive);
    setIsReset(false);
  }

  function handleReset() {
    setIsReset(true);
    setIsActive(false);
    setTime(0);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let diff = new Date(timeInput).getTime() - Date.now();

    setTime(diff);
    setIsActive(true);
    setIsReset(false);
  }

  return (
    <div className="relative px-3 py-6 m-4 space-y-4 bg-gray-800 rounded-lg shadow-lg w-96">
      <div
        onClick={() => remove(index)}
        className="absolute inline-block p-0 text-red-700 bg-white rounded-full cursor-pointer -top-2 -right-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <form action="">
        <input
          className="px-2 py-1 border border-gray-400 rounded-md shadow-md"
          type="datetime-local"
          step="1"
          min={minTime}
          onChange={(e) => setTimeInput(e.target.value)}
        />
        <button onClick={handleSubmit} type="submit">
          Start
        </button>
      </form>
      <div className="flex items-center justify-center space-x-2 text-white">
        <div>{("0" + Math.floor((time / 60000) % 100)).slice(-2)}</div>
        <div>{("0" + Math.floor((time / 1000) % 100)).slice(-2)}</div>
        <div>{("0" + Math.floor((time / 10) % 100)).slice(-2)}</div>
      </div>
      <div className="flex items-center justify-center">
        <button disabled={time < 1} onClick={handlePause}>
          {isActive ? "Pause" : "Resume"}
        </button>
        <button disabled={time < 1} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
