// import React, { useEffect, useRef } from 'react'
// import { useState } from 'react';

// export default function Timer() {
//     const [count, setCount] = useState(0);
//     const [isRunning, setIsRunning] = useState(false);
//     const [initialTime, setInitialTime] = useState(0);
//     const intervalId = useRef(null)

//     const start =() =>{
//        if(!isRunning){
//         setIsRunning(true)
//         intervalId.current = setInterval(() => {
//             setCount((prev)=>prev+1)
            
//         }, 1000);
//        }
//     }
//     const stop = ()=>{
//         setIsRunning(false)
//         clearInterval(intervalId.current)

//     }
//     const reset = ()=>{
//         setIsRunning(false)
        
//         setCount(0)
//         stop()
//     }
//     const settingTime = (e) => {
//         const value = parseInt(e.target.value, 10);
//         if (!isNaN(value) && value > 0) {
//           setInitialTime(value);
//           setCount(value);  // Set both initial time and remaining time
//         }
//       };
    
//     useEffect(()=>{
//          return()=>{
//             clearInterval(intervalId.current)
//          }
//     },
//     [])
//   return (
//     <>
//     <div>Timer</div>
//      <div>{count > 0 ? `${count} seconds remaining` : "Time's up!"}</div> {/* Display remaining time */}
     
//      <input type="number" onChange={settingTime}  />
     
//      <button onClick={start} >Start</button>
//      <button onClick={stop} >Pause</button>
//      <button onClick={reset}>Reset</button>
    
     

//     </>
//   )
// }
import React, { useState, useRef, useEffect } from "react";

const CountdownTimer = () => {
  const [duration, setDuration] = useState(60); // Initial duration in seconds (default 1 minute)
  const [remainingTime, setRemainingTime] = useState(duration);
  const [isActive, setIsActive] = useState(false); // Timer state (running or paused)
  const intervalRef = useRef(null); // To store the timer interval ID
  const inputRef = useRef(null); // Ref for the input field to set a new duration

  // Start the countdown
  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            return 0; // Stop the timer at 0
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  // Pause the countdown
  const pauseTimer = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
  };

  // Reset the countdown to the original duration
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setRemainingTime(duration);
  };

  // Handle new duration input
  const handleSetDuration = () => {
    const newDuration = parseInt(inputRef.current.value);
    if (!isNaN(newDuration) && newDuration > 0) {
      setDuration(newDuration);
      setRemainingTime(newDuration);
      resetTimer();
    }
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  // Calculate progress for the progress bar
  const getProgress = () => (remainingTime / duration) * 100;

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Countdown Timer</h2>

      <div>
        {/* Dynamic background color based on remaining time */}
        <div
          style={{
            width: "100%",
            height: "200px",
            backgroundColor: remainingTime < 5 ? "red" : "white", // Red if less than 5 seconds
            transition: "background-color 0.5s",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          {/* Display remaining time in minutes and seconds */}
          {`${Math.floor(remainingTime / 60)}:${(remainingTime % 60)
            .toString()
            .padStart(2, "0")}`}
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        {/* Progress bar */}
        <div
          style={{
            width: "100%",
            backgroundColor: "#ddd",
            height: "20px",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              width: `${getProgress()}%`,
              backgroundColor: "green",
              height: "100%",
            }}
          />
        </div>
      </div>

      <div>
        {/* Input field to set a new duration */}
        <input type="number" ref={inputRef} placeholder="Set duration (seconds)" />
        <button onClick={handleSetDuration}>Set Duration</button>
      </div>

      <div>
        {/* Timer Controls */}
        <button onClick={startTimer} disabled={isActive}>Start</button>
        <button onClick={pauseTimer} disabled={!isActive}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>

      <div>
        {/* Notification when the timer reaches 0 */}
        {remainingTime === 0 && <p style={{ color: "red" }}>Time's up!</p>}
      </div>
    </div>
  );
};

export default CountdownTimer;
