import "./App.css";
import Layout from "./Components/Layout";
import { FaMinus, FaPlus, FaStop, FaPlay } from "react-icons/fa6";
import { MdLoop } from "react-icons/md";
import { useState, useEffect } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [timerLabel, setTimerLabel] = useState("Session");
  const [timerRunning, setTimerRunning] = useState(false); // timer is not running
  const [intervalId, setIntervalId] = useState(null);

  const formatTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const startTimer = () => {
    const id = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft > 0) return prevTimeLeft - 1;
        clearInterval(id);
        return 0;
      });
    }, 1000);
    setIntervalId(id);
    setTimerRunning(true); // start timer
  };

  const handleStartStop = () => {
    if (timerRunning) {
      clearInterval(intervalId); // clear interval - stop timer
      setTimerRunning(false);
    } else {
      startTimer();
    }
  };

  const handleReset = () => {
    clearInterval(intervalId); // clear interval - stop timer
    setBreakLength(5); // reset break length to 5
    setSessionLength(25); // reset session length to 25
    // setBreakLength(3 / 60); // testing - delete later
    // setSessionLength(3 / 60); // testing - delete later
    setTimeLeft(25 * 60); // reset time left to its default value
    setTimerLabel("Session");
    setTimerRunning(false);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      document.getElementById("beep").play(); // play audio
      clearInterval(intervalId); // clear interval - stop timer
      if (timerLabel === "Session") {
        // if session is over
        setTimerLabel("Break"); // set timer label to break
        setTimeLeft(breakLength * 60); // set time left to break length
        // startTimer(); // start the break
        setTimeout(startTimer, 1000); // wait 1 second before starting
      } else if (timerLabel === "Break") {
        // if break is over
        setTimerLabel("Session"); // set timer label to session
        setTimeLeft(sessionLength * 60); // set time left to session length
        // startTimer(); // start the session
        setTimeout(startTimer, 1000); // wait 1 second before starting
      }
    }
  }, [timeLeft, timerLabel, breakLength, sessionLength, intervalId]);

  useEffect(() => {
    if (timerLabel === "Session") {
      // if session is running
      setTimeLeft(sessionLength * 60); // set time left to value of session length
    } else {
      setTimeLeft(breakLength * 60); // set time left to value of break length
    }
  }, [sessionLength, breakLength, timerLabel]);

  // useEffect(() => {
  //   if (!timerRunning) {
  //     // if timer is not running
  //     if (timerLabel === "Session") {
  //       // if session is running
  //       setTimeLeft(sessionLength * 60); // set time left to value of session length
  //     } else {
  //       setTimeLeft(breakLength * 60); // set time left to value of break length
  //     }
  //   }
  // }, [sessionLength, breakLength, timerRunning, timerLabel]);

  return (
    <>
      <Layout>
        <div className="p-4 rounded-lg bg-black">
          <h1 className="text-[#FFD23F] text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
            25 + 5 Clock
          </h1>
        </div>
        <div className="flex justify-around items-center gap-6 w-6/12">
          <section
            id="break"
            className="flex flex-col justify-center items-center gap-4 w-3/6 h-4/5 bg-[#1D2B53] text-[#C6DAF1] rounded-lg p-10"
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
                onClick={() =>
                  setBreakLength((prev) => (prev > 1 ? prev - 1 : prev))
                }
                className=" hover:text-slate-500 transition duration-100"
              >
                <FaMinus className="w-6 h-6" />
              </button>
              <button
                id="break-increment"
                onClick={() =>
                  setBreakLength((prev) => (prev < 60 ? prev + 1 : prev))
                }
                className=" hover:text-slate-500 transition duration-100"
              >
                <FaPlus className="w-6 h-6" />
              </button>
            </div>
          </section>
          <section
            id="session"
            className="flex flex-col justify-center items-center gap-4 w-3/6 h-4/5 bg-[#1D2B53] text-[#C6DAF1] p-10 rounded-lg"
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
                onClick={() =>
                  setSessionLength((prev) => (prev > 1 ? prev - 1 : prev))
                }
                className=" hover:text-slate-500 transition duration-100"
              >
                <FaMinus className="w-6 h-6" />
              </button>
              <button
                id="session-increment"
                onClick={() =>
                  setSessionLength((prev) => (prev < 60 ? prev + 1 : prev))
                }
                className=" hover:text-slate-500 transition duration-100"
              >
                <FaPlus className="w-6 h-6" />
              </button>
            </div>
          </section>
        </div>
        <section className="flex flex-col justify-center items-center gap-4 w-2/6 min-w-min bg-[#1D2B53] text-[#C6DAF1] p-10 rounded-lg">
          <h2 id="timer-label" className="font-bold text-2xl md:text-4xl">
            {timerLabel}
          </h2>
          <h3
            id="time-left"
            className={`font-medium text-5xl sm:text-6xl md:text-7xl lg:text-8xl transition-colors duration-500 ${
              timerRunning
                ? timerLabel === "Session"
                  ? "text-[#9FEFBC]"
                  : "text-[#98C1D9]"
                : ""
            }`}
          >
            {formatTime(timeLeft)}
          </h3>
        </section>
        <section className="flex justify-around items-center w-20 text-[#1D2B53] gap-4">
          <button id="start_stop" onClick={handleStartStop}>
            {timerRunning ? (
              <FaStop className="w-10 h-10" />
            ) : (
              <FaPlay className="w-10 h-10 hover:text-slate-500 transition duration-100" />
            )}
          </button>
          <button
            id="reset"
            onClick={handleReset}
            className="hover:text-slate-500 transition duration-100"
          >
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
