import "./App.css";
import Layout from "./components/Layout";
import { FaMinus, FaPlus, FaStop, FaPlay } from "react-icons/fa6";
import { MdLoop } from "react-icons/md";
import { useState, useEffect } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timerRunning, setTimerRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handleStartStop = () => {
    if (timerRunning) {
      clearInterval(intervalId);
      setTimerRunning(false);
    } else {
      const id = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
        setTimerRunning(true);
      }, 1000);
      setIntervalId(id);
    }
  };

  const handleReset = () => {
    clearInterval(intervalId);
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    setTimerLabel("Session");
    setTimerRunning(false);
  };

  useEffect(() => {
    if (timeLeft === 0 && timerLabel === "Session") {
      setTimerLabel("Break");
      setTimeLeft(breakLength * 60);
    } else if (timeLeft === 0 && timerLabel === "Break") {
      setTimerLabel("Session");
      setTimeLeft(sessionLength * 60);
    }
  }, [timeLeft, timerLabel, breakLength, sessionLength]);

  return (
    <>
      <Layout>
        <div className="text-4xl border p-4 rounded-xl">
          <h1 className="">25 + 5 Clock</h1>
        </div>
        <div className="flex justify-around items-center gap-3">
          <section id="break" className="bg-gray-600 p-10">
            <div id="break-label">
              <h2 className="text-2xl">Break Length</h2>
            </div>
            <div id="break-length">{breakLength}</div>

            <div className="flex justify-around items-center m-2 p-2 border rounded-lg bg-slate-600 hover:bg-slate-500 transition duration-100">
              <button
                id="break-decrement"
                onClick={() => setBreakLength((prev) => prev - 1)}
              >
                <FaMinus className="w-6 h-6" />
              </button>
              <button
                id="break-increment"
                onClick={() => setBreakLength((prev) => prev + 1)}
              >
                <FaPlus />
              </button>
            </div>
          </section>
          <section id="session" className="bg-gray-600 p-10">
            <div id="session-label">
              <h2 className="text-2xl">Session Length</h2>
            </div>
            <div id="session-length">{sessionLength}</div>
            <div className="flex justify-around items-center">
              <button
                id="session-decrement"
                onClick={() => setSessionLength((prev) => prev - 1)}
              >
                <FaMinus />
              </button>
              <button
                id="session-increment"
                onClick={() => setSessionLength((prev) => prev + 1)}
              >
                <FaPlus />
              </button>
            </div>
          </section>
        </div>
        <section>
          <div id="timer-label">{timerLabel}</div>
          <div id="time-left">{formatTime(timeLeft)}</div>
        </section>
        <div className="flex justify-around items-center w-20 ">
          <button id="start_stop" onClick={handleStartStop}>
            {timerRunning ? <FaStop /> : <FaPlay />}
          </button>
          <button id="reset" onClick={handleReset}>
            <MdLoop />
          </button>

          <div>
            <audio
              id="beep"
              src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            ></audio>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default App;
