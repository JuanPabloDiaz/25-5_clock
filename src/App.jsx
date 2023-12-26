import "./App.css";
import Layout from "./Components/Layout";
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
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft > 0) return prevTimeLeft - 1;
          clearInterval(id);
          return 0;
        });
      }, 1000);
      setIntervalId(id);
      setTimerRunning(true);
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
    if (timeLeft === 0) {
      document.getElementById("beep").play();
      clearInterval(intervalId);
      if (timerLabel === "Session") {
        setTimerLabel("Break");
        setTimeLeft(breakLength * 60);
      } else if (timerLabel === "Break") {
        setTimerLabel("Session");
        setTimeLeft(sessionLength * 60);
      }
    }
  }, [timeLeft, timerLabel, breakLength, sessionLength, intervalId]);

  return (
    <>
      <Layout>
        <div className="p-4 rounded-lg bg-black">
          <h1 className="text-[#FFD23F] text-5xl font-extrabold">
            25 + 5 Clock
          </h1>
        </div>
        <div className="flex justify-around items-center gap-6 w-6/12">
          <section
            id="break"
            className="flex flex-col justify-center items-center gap-4 w-3/6 bg-[#1D2B53] text-[#C6DAF1] rounded-lg p-10"
          >
            <div id="break-label">
              <h2 className="font-bold text-2xl">Break Length</h2>
            </div>
            <div id="break-length" className="font-medium text-4xl">
              {breakLength}
            </div>

            <div className="flex justify-around items-center m-2 p-2 border rounded-lg transition duration-100 gap-4">
              <button
                id="break-decrement"
                onClick={() => setBreakLength((prev) => prev - 1)}
                className=" hover:text-slate-500 transition duration-100"
              >
                <FaMinus className="w-6 h-6" />
              </button>
              <button
                id="break-increment"
                onClick={() => setBreakLength((prev) => prev + 1)}
                className=" hover:text-slate-500 transition duration-100"
              >
                <FaPlus className="w-6 h-6" />
              </button>
            </div>
          </section>
          <section
            id="session"
            className="flex flex-col justify-center items-center gap-4 w-3/6 bg-[#1D2B53] text-[#C6DAF1] p-10 rounded-lg"
          >
            <div id="session-label">
              <h2 className="font-bold text-2xl">Session Length</h2>
            </div>
            <div id="session-length" className="font-medium text-4xl">
              {sessionLength}
            </div>
            <div className="flex justify-around items-center m-2 p-2 border rounded-lg transition duration-100 gap-4">
              <button
                id="session-decrement"
                onClick={() => setSessionLength((prev) => prev - 1)}
                className=" hover:text-slate-500 transition duration-100"
              >
                <FaMinus className="w-6 h-6" />
              </button>
              <button
                id="session-increment"
                onClick={() => setSessionLength((prev) => prev + 1)}
                className=" hover:text-slate-500 transition duration-100"
              >
                <FaPlus className="w-6 h-6" />
              </button>
            </div>
          </section>
        </div>
        <section className="flex flex-col justify-center items-center gap-4 w-2/6 bg-[#1D2B53] text-[#C6DAF1] p-10 rounded-lg">
          <div id="timer-label" className="font-bold text-2xl">
            {timerLabel}
          </div>
          <div id="time-left" className="font-medium text-4xl">
            {formatTime(timeLeft)}
          </div>
        </section>
        <section className="flex justify-around items-center w-20 text-[#1D2B53] gap-4">
          <button id="start_stop" onClick={handleStartStop}>
            {timerRunning ? (
              <FaStop className="w-10 h-10" />
            ) : (
              <FaPlay className="w-10 h-10" />
            )}
          </button>
          <button id="reset" onClick={handleReset}>
            <MdLoop className="w-10 h-10" />
          </button>

          <div>
            <audio
              id="beep"
              src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            ></audio>
          </div>
        </section>
      </Layout>
    </>
  );
}

export default App;
