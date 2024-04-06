import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const formatTime = (time) => `${Math.floor(time / 60)}:${time % 60 < 10 ? '0' + time % 60 : time % 60}`;

  const countDownTimeOfStatus = (seconds, statusName) => {
    const intervalID = setInterval(
      () => {
        setTime(time => time - 1);
        seconds--;
        if (seconds === 0) {
          clearInterval(intervalID);
          playBell();
          setStatus(statusName);
        }
      }, 1000);
    setTime(seconds);
    setTimer(intervalID);
  }

  useEffect(() => {
    console.log(status);
    if (status === 'work'){
      setStatus('work');
      countDownTimeOfStatus(1200, 'rest');
    } else if (status === 'rest'){
      setStatus('rest');
      countDownTimeOfStatus(20, 'work');
    }
  }, [status]);

  const startTimer = () => {
    setStatus('work');
  };

  const stopTimer = () => {
    clearInterval(timer);
    setTime(0);
    setStatus('off');
  }

  const closeApp = () => {
    window.close();
  }

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };
  

  return (
    <div>
      {
        status === 'off' &&
        <div>
          <h1>Protect your eyes</h1>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      }
      {status === 'work' && <img src="./images/work.png" />}
      {status === 'rest' && <img src="./images/rest.png" />}
      {
        status !== 'off' &&
        <div className="timer">
          {formatTime(time)}
        </div>
      }
      {status === 'off' && <button className="btn" onClick={startTimer}>Start</button>}
      {status !== 'off' && <button className="btn" onClick={stopTimer}>Stop</button>}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  )
};

render(<App />, document.querySelector('#app'));
