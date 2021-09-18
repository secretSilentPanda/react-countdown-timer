import { useState } from "react";
import Timer from "./Timer";
import { motion } from "framer-motion";

export default function Timers() {
  const [stats, setStats] = useState([{ index: Date.now() }]);

  function addTimer() {
    setStats([...stats, { index: Date.now() }]);
  }

  function remove(index) {
    setStats((stats) => stats.filter((stat) => stat.index !== index));
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-center w-screen h-screen">
        {stats.map((timer) => {
          return (
            <motion.div
              layout="true"
              key={timer.index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <Timer index={timer.index} remove={remove} />
            </motion.div>
          );
        })}
      </div>
      <button
        className="fixed grid px-4 pb-3 text-4xl font-extrabold text-white rounded-full place-items-center bottom-4 right-4"
        onClick={addTimer}
      >
        <div>+</div>
      </button>
    </div>
  );
}
