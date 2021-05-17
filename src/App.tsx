import { useState, useRef, useEffect, useMemo } from 'react';

function getSplitedTime(milliseconds: number): number[] {
    /*
    let seconds = Math.floor(milliseconds / 1000);
    let minutes = Math.floor(milliseconds / (1000 * 60));
    let hours = Math.floor(milliseconds / (1000 * 60 * 60));
    let days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    */

    let seconds = Math.floor((milliseconds / 1000) % 60);
    let minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    let hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    let days = Math.floor((milliseconds / (1000 * 60 * 60 * 24)) % 7);

    return [days, hours, minutes, seconds];
}

function formatTime(milliseconds: number): any {
    const [days, hours, minutes, seconds] = getSplitedTime(milliseconds);

    let formattedDays = '000';
    let formattedHours = '00';
    let formattedMinutes = '00';
    let formattedSeconds = '00';

    // ``;
    if (days < 10) {
        formattedDays = `00${days}`;
    } else if (days < 100) {
        formattedDays = `0${days}`;
    } else {
        formattedDays = `${days}`;
    }

    if (hours < 10) {
        formattedHours = `0${hours}`;
    } else {
        formattedHours = `${hours}`;
    }

    if (minutes < 10) {
        formattedMinutes = `0${minutes}`;
    } else {
        formattedMinutes = `${minutes}`;
    }

    if (seconds < 10) {
        formattedSeconds = `0${seconds}`;
    } else {
        formattedSeconds = `${seconds}`;
    }

    return {
        formattedDays,
        formattedHours,
        formattedMinutes,
        formattedSeconds,
    };
}

function StartingMessage() {
    return (
        <div id="starting-message">
            <strong>we are</strong>
            <h3>Under Construction</h3>
        </div>
    );
}

function LeftTime() {
    let intervalId = useRef<number|null>(null);
    const dueDate = useMemo(() => new Date("2021-5-20").getTime(), []);
    const [currentTime, setCurrentTime] = useState<number>(new Date().getTime());
    const timeLeft = useMemo(() => dueDate - currentTime, [dueDate, currentTime]);
    const {
        formattedDays,
        formattedHours,
        formattedMinutes,
        formattedSeconds,
    } = useMemo(() => formatTime(timeLeft), [timeLeft]);

    useEffect(() => {
        intervalId.current = window.setInterval(() => {
            setCurrentTime(new Date().getTime());
        }, 1000);

        return () => {
            if (typeof intervalId === "number") {
                clearInterval(intervalId);
            }
            intervalId.current = null;
        }
    }, [setCurrentTime]);

    return (
        <div id="left-time">
            <div>
                <h1>{formattedDays}</h1>
                <p>days</p>
            </div>

            <div>
                <h1>{formattedHours}</h1>
                <p>hours</p>
            </div>

            <div>
                <h1>{formattedMinutes}</h1>
                <p>minutes</p>
            </div>

            <div>
                <h1>{formattedSeconds}</h1>
                <p>seconds</p>
            </div>
        </div>
    );
}

function EmailSubscription() {
    return (
        <div id="email-subscription">
            <form>
                <input
                    type="email"
                    placeholder="Your email address"
                    required
                />

                <button type="submit">Subscribe</button>
            </form>

            <div id="floating-message">
                We'll notify you
                <br />
                as soon as we open
            </div>
        </div>
    );
}

function App() {
  return (
    <div id="under-construction-page">
        <StartingMessage />

        <LeftTime />

        <EmailSubscription />
    </div>
  );
}

export default App;
