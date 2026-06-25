import React, { useEffect, useState } from "react";

const TimerWidget = () => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [totalSeconds, setTotalSeconds] = useState(0);

    const handleStart = () => {
        const total =
            hours * 3600 +
            minutes * 60 +
            seconds;

        setTotalSeconds(total);
        setIsRunning(true);
    };
    const remainingSeconds =
        hours * 3600 +
        minutes * 60 +
        seconds;
    const radius = 80;
    const circumference = 2 * Math.PI * radius;

    const progress =
        totalSeconds > 0
            ? Math.max(remainingSeconds / totalSeconds, 0)
            : 0;
    const strokeDashoffset =
        remainingSeconds === 0
            ? circumference
            : circumference * (1 - progress);

    useEffect(() => {
        let interval;

        if (
            isRunning &&
            (hours > 0 || minutes > 0 || seconds > 0)
        ) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds((prev) => prev - 1);
                } else if (minutes > 0) {
                    setMinutes((prev) => prev - 1);
                    setSeconds(59);
                } else if (hours > 0) {
                    setHours((prev) => prev - 1);
                    setMinutes(59);
                    setSeconds(59);
                } else {
                    setIsRunning(false);
                }
            }, 1000);
        }

        if (
            hours === 0 &&
            minutes === 0 &&
            seconds === 0
        ) {
            setIsRunning(false);
            setTotalSeconds(0);
        }

        return () => clearInterval(interval);
    }, [hours, minutes, seconds, isRunning]);

    const increment = (type) => {
        if (isRunning) return;

        switch (type) {
            case "hours":
                setHours((prev) => prev + 1);
                break;

            case "minutes":
                setMinutes((prev) => (prev + 1) % 60);
                break;

            case "seconds":
                setSeconds((prev) => (prev + 1) % 60);
                break;

            default:
                break;
        }
    };

    const decrement = (type) => {
        if (isRunning) return;

        switch (type) {
            case "hours":
                setHours((prev) => Math.max(prev - 1, 0));
                break;

            case "minutes":
                setMinutes((prev) => (prev - 1 + 60) % 60);
                break;

            case "seconds":
                setSeconds((prev) => (prev - 1 + 60) % 60);
                break;

            default:
                break;
        }
    };

    return (
        <div className="bg-[#1E2343]  h-[503px] lg:h-[333px] p-8 flex flex-col justify-between">

            {/* Top Section */}
            <div className="flex flex-col lg:flex-row  items-center justify-around">

                {/* Circle Timer */}
                <div className="relative w-[180px] h-[180px]">

                    <svg
                        className="absolute inset-0 -rotate-90"
                        width="180"
                        height="180"
                    >
                        {/* Background Circle */}
                        <circle
                            cx="90"
                            cy="90"
                            r="80"
                            stroke="#2C3252"
                            strokeWidth="6"
                            fill="none"
                        />

                        {/* Progress Circle */}
                        <circle
                            cx="90"
                            cy="90"
                            r="80"
                            stroke="#FF6A6A"
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            style={{
                                transition:
                                    "stroke-dashoffset 1s linear",
                            }}
                        />
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-white text-4xl font-bold">
                            {String(hours).padStart(2, "0")}:
                            {String(minutes).padStart(2, "0")}:
                            {String(seconds).padStart(2, "0")}
                        </h1>
                    </div>

                </div>



                {/* Controls */}
                <div className="grid grid-cols-3 gap-6 sm:gap-8 mt-6 lg:mt-0">
                    {[
                        { label: "Hours", value: hours, type: "hours" },
                        { label: "Minutes", value: minutes, type: "minutes" },
                        { label: "Seconds", value: seconds, type: "seconds" },
                    ].map((item) => (
                        <div
                            key={item.type}
                            className="flex flex-col items-center"
                        >
                            <p className="text-gray-400 text-xl mb-3">
                                {item.label}
                            </p>

                            <button
                                onClick={() => increment(item.type)}
                                className="text-gray-400 text-2xl"
                            >
                                ▲
                            </button>

                            <h1 className="text-white text-5xl my-2">
                                {String(item.value).padStart(2, "0")}
                            </h1>

                            <button
                                onClick={() => decrement(item.type)}
                                className="text-gray-400 text-2xl"
                            >
                                ▼
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Start Button */}
            <div className="flex justify-center">
                <button
                    onClick={() => {
                        if (isRunning) {
                            setIsRunning(false);
                        } else {
                            handleStart();
                        }
                    }}
                    className="bg-[#FF6A6A] w-[400px] py-3 rounded-full text-white text-2xl"
                >
                    {isRunning ? "Pause" : "Start"}
                </button>
            </div>

        </div>
    );
};

export default TimerWidget;