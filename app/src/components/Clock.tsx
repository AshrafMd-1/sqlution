import {useEffect, useState} from 'react';
import '../styles/navbarPage/Clock.css';

const Clock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const amPm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12;

      const formattedTime = `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} ${amPm}`;
      setTime(formattedTime);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
      <div className="clock-container">
        <div className="clock">
          {time}
        </div>
      </div>
  );
};

export default Clock;