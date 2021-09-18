import React, { useState } from "react";

export default function Controls({ setIsActive, setIsReset }) {
  const [action, setAction] = useState(false);

  function handlePause() {
    setAction(!action);
    setIsActive((prev) => !prev);
  }
  return (
    <div>
      <button onClick={handlePause}>{action ? "Start" : "Pause"}</button>
      <button onClick={setIsReset(true)}>Reset</button>
    </div>
  );
}
