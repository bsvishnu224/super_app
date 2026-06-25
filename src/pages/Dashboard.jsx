import React, { useEffect, useState } from "react";

import profile from '../assets/profile.png'
import { useStore } from "../store/useStore";
import { fetchCurrentWeather } from "../services/weatherApi";
import { fetchTopHeadlines } from "../services/newsApi";
import TimerWidget from "../components/TimerWidget";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
    const setNotes = useStore(state => state.setNotes)
    const notes = useStore(state => state.notes)
    const user=useStore(state=>state.user)
    const categories=useStore(state=>state.categories)
    console.log(categories.length<3)
    const [weather, setWeather] = useState(null);
    const [articles, setArticles] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);
const navigator=useNavigate()
    useEffect(()=>{
        if(user.name===""){
            navigator("/")
        }
        else if(categories.length<3 && user.name!==""){
            navigator('/categories')
        }


        
    })
   const news=articles[currentIndex]

    useEffect(() => {
        const getNews = async () => {
            try {
                const data = await fetchTopHeadlines(
                    "general",
                    import.meta.env.VITE_NEWS_API_KEY
                );
                console.log(data)

                setArticles(data);
            } catch (err) {
                console.log(err);
            }
        };

        getNews();
    }, []);
    useEffect(() => {
        const getWeather = async () => {
            try {
                const data = await fetchCurrentWeather(
                    "Hyderabad",
                    import.meta.env.VITE_WEATHER_API_KEY
                );

                setWeather(data);
            } catch (err) {
                console.log(err);
            }
        };

        getWeather();
    }, []);
    useEffect(() => {
  if (articles.length === 0) return;

  const interval = setInterval(() => {
    setCurrentIndex((prev) =>
      (prev + 1) % articles.length
    );
  }, 2000);

  return () => clearInterval(interval);
}, [articles]);
    return (
        <div className="min-h-screen bg-black p-6">
            <div className="max-w-7xl mx-auto">

                <div className="grid grid-cols-12 gap-5">

                    {/* LEFT SIDE */}
                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">

                        {/* TOP BOX */}
                        <div className="bg-[#1d1d1d] p-5 rounded-2xl">

                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 " >

                                {/* Profile + Weather */}
                                <div className="flex flex-col gap-5">

                                    {/* Profile */}
                                    <div className="bg-[#5746EA] rounded-3xl h-[319px] overflow-hidden">
                                        <div className="flex h-full">

                                            <div className="w-[90px] h-[267px] flex-shrink-0 rounded-[42.42px] overflow-hidden ml-4 mt-5">
                                                <img
                                                    src={profile}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                            <div className="flex-1 p-5 text-white rounded-5px text-left">
                                                <p className="lg:text-lg">{user.name}</p>

                                                <p className="text-sm mt-1">
                                                    {user.email}
                                                </p>

                                                <h1 className="text-[26px] lg:text-3xl">
                                                    {user.username}
                                                </h1>

                                                <div className="grid grid-cols-2 gap-3 mt-10">
                                                    {categories.map(
                                                        (item) => (
                                                            <div
                                                                key={item}
                                                                className="bg-[#9F94FF] text-center py-2 rounded-full text-sm"
                                                            >
                                                                {item}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="bg-[#101744] rounded-2xl overflow-hidden h-[197px]">
                                        {!weather ? (
                                            <div className="flex items-center justify-center h-full text-white">
                                                Loading...
                                            </div>
                                        ) : (
                                            <>
                                                <div className="bg-[#101744] rounded-[30px] overflow-hidden">

                                                    {/* Date & Time */}
                                                    <div className="bg-[#FF4ADE] flex justify-center items-center gap-20 py-4 text-white">
                                                        <span className="text-[25px] font-bold">
                                                            {new Date().toLocaleDateString()}
                                                        </span>

                                                        <span className="text-[25px] font-bold">
                                                            {new Date().toLocaleTimeString([], {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            })}
                                                        </span>
                                                    </div>

                                                    {/* Weather Details */}
                                                    <div className="h-[150px] px-4 flex items-center justify-between text-white">

                                                        {/* Weather Icon */}
                                                        <div className="flex flex-col items-center">
                                                            <img
                                                                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                                                alt=""
                                                                className="w-[62px] h-[51px]"
                                                            />

                                                            <p className="text-[17px] capitalize -mt-2">
                                                                {weather.weather[0].description}
                                                            </p>
                                                        </div>

                                                        {/* Divider */}
                                                        <div className="w-[1px] h-20 bg-white/70"></div>

                                                        {/* Temperature + Pressure */}
                                                        <div className="flex flex-col items-center">
                                                            <h2 className="text-[44px] font-light">
                                                                {Math.round(weather.main.temp)}°C
                                                            </h2>

                                                            <div className="flex items-center gap-2">
                                                                <span className="text-2xl">🌡️</span>

                                                                <div>
                                                                    <p className="text-[13px]">
                                                                        {weather.main.pressure} mbar
                                                                    </p>

                                                                    <p className="text-[13px]">
                                                                        Pressure
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Divider */}
                                                        <div className="w-[1px] h-20 bg-white/70"></div>

                                                        {/* Wind & Humidity */}
                                                        <div className="space-y-2">

                                                            <div className="flex items-center">
                                                                <span className="text-3xl">🌬️</span>

                                                                <div>
                                                                    <p className="text-[13px] text-left">
                                                                        {weather.wind.speed} km/h
                                                                    </p>

                                                                    <p className="text-[13px] text-left">
                                                                        Wind
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center">
                                                                <span className="text-3xl">💧</span>

                                                                <div>
                                                                    <p className="text-[13px] text-left">
                                                                        {weather.main.humidity}%
                                                                    </p>

                                                                    <p className="text-[13px] text-left">
                                                                        Humidity
                                                                    </p>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Notes */}
                                <div className="bg-[#F1C75B] rounded-2xl p-8 h-[535px] flex flex-col">
                                    <h2 className="text-[38px] font-bold text-left text-black">
                                        All notes
                                    </h2>

                                    <div className="mt-4 flex-1">
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            className="
        w-full
        h-full
        bg-transparent
        resize-none
        outline-none
        text-black
        text-[15px]
        leading-7
        overflow-y-auto
      "
                                        />
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* TIMER */}
                        <TimerWidget/>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="col-span-12 lg:col-span-4 flex flex-col">

                        {/* NEWS */}
                        <div className="bg-white rounded-2xl overflow-hidden h-[940px] flex flex-col">

                            {!news ? (
                                <div className="flex-1 flex items-center justify-center">
                                    Loading...
                                </div>
                            ) : (
                                <>
                                    {/* News Image */}
                                    <div className="relative">

                                        <img
                                            src={
                                                news.urlToImage ||
                                                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3?w=1200"
                                            }
                                            alt={news.title}
                                            className="w-full h-[350px] object-cover"
                                        />

                                        <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-5">

                                            

                                            <h2 className="text-white text-3xl font-semibold leading-tight text-left">
                                                {news.title}
                                            </h2>

                                        </div>

                                    </div>

                                    {/* News Description */}
                                    <div className="flex-1 p-6 text-gray-700 leading-8 overflow-y-auto text-left">

                                        {(
                                            news.description ||
                                            news.content ||
                                            "No description available."
                                        ).replace(/\[\+\d+\schars\]/, "")}

                                    </div>
                                </>
                            )}

                        </div>

                        {/* Browse Button */}
                        <div className="flex justify-end mt-4">
                            <button className="bg-green-600 px-10 py-3 rounded-full text-white" onClick={()=>navigator("/movies")}>
                                Browse
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
}