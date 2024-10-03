/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: Date;
};

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeRemaining = () => {
    const now = new Date();
    const totalSeconds = Math.floor((targetDate.getTime() - now.getTime()) / 1000);

    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetDate]);

  const timeKeys = Object.entries(timeRemaining);

  return (
    <div className="flex flex-col items-center justify-center bg-[#7E8F85] text-white p-8 rounded-lg shadow-lg">
      <h1 className="text-center text-lg md:text-3xl font-bold mb-6">A contagem para o nosso <i className='font-light'>"Sim"</i> começou!</h1>
      <div className="flex items-center">
        {timeKeys.map(([key, value], index) => (
          <div key={key} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className="text-2xl md:text-5xl font-bold">
                {value < 10 ? `0${value}` : value}
              </div>
              <span className="text-xs md:text-sm font-light">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            </div>

            {index < timeKeys.length - 1 && (
              <span className="font-bold text-2xl mx-2">
                {index === 0 ? '-' : ':'}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
