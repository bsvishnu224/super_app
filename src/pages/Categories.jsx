import { useNavigate } from "react-router-dom"
import { useStore } from "../store/useStore"
import { useEffect, useState } from "react"
import actionImg from '../assets/action.png'
import dramaImg from '../assets/drama.png'
import romanceImg from '../assets/romance.png'
import fantasyImg from '../assets/fantasy.png'
import fictionImg from '../assets/fiction.png'
import horrorImg from '../assets/horror.png'
import musicImg from '../assets/music.png'
import thrillerImg from '../assets/thriller.png'
import westernImg from '../assets/western.png'


export default function Categories() {
    const navigate = useNavigate()
    const user = useStore((state) => state.user)
    console.log(user)

    useEffect(() => {
        if (user.name==="") {
            navigate('/')
        }

    }, [user, navigate])
    const categoriesData = [
        {
            id: 1,
            name: "Action",
            color: "bg-orange-500",
            img: actionImg
        },
        {
            id: 2,
            name: "Drama",
            color: "bg-purple-300",
            img: dramaImg
        },
        {
            id: 3,
            name: "Romance",
            color: "bg-green-600",
            img: romanceImg
        },
        {
            id: 4,
            name: "Thriller",
            color: "bg-blue-400",
            img: thrillerImg
        },
        {
            id: 5,
            name: "Western",
            color: "bg-amber-800",
            img: westernImg
        },
        {
            id: 6,
            name: "Horror",
            color: "bg-violet-500",
            img: horrorImg
        },
        {
            id: 7,
            name: "Fantasy",
            color: "bg-pink-500",
            img: fantasyImg
        },
        {
            id: 8,
            name: "Music",
            color: "bg-red-500",
            img: musicImg
        },
        {
            id: 9,
            name: "Fiction",
            color: "bg-green-400",
            img: fictionImg
        },
    ];




    const setCategories = useStore(
        (state) => state.setCategories
    );

    const [selected, setSelected] = useState([]);

    const handleCategory = (name) => {
        if (selected.includes(name)) {
            setSelected(
                selected.filter((item) => item !== name)
            );
        } else {
            setSelected([...selected, name]);
        }
    };

    const handleNext = () => {
        if (selected.length < 3) return;

        setCategories(selected);
        console.log("nav")

        navigate("/dashboard");
    };


    return (
        <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">

            {/* Left Side */}
            <div className="w-full lg:w-[40%] px-6 md:px-10 lg:px-16 py-10 lg:py-20 flex flex-col">

                <h1 className="text-[#72DB73] text-2xl md:text-4xl lg:text-5xl text-left single-day">
                    Super app
                </h1>

                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mt-8 lg:mt-12 leading-tight text-left">
                    Choose your
                    <br />
                    entertainment
                    <br />
                    category
                </h1>

                <div className="flex flex-wrap gap-4 mt-10 lg:mt-14">
                    {selected.map((item) => (
                        <div
                            key={item}
                            className="bg-green-600 px-4 py-2 rounded-full flex items-center gap-3"
                        >
                            {item}

                            <button onClick={() => handleCategory(item)}>
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                {selected.length < 3 && (
                    <p className="text-red-500 mt-6 lg:mt-10 text-base md:text-lg">
                        ⚠ Minimum 3 category required
                    </p>
                )}
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-[60%] p-6 md:p-10 lg:p-20">

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">

                    {categoriesData.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => handleCategory(item.name)}
                            className={`
            ${item.color}
            h-32 md:h-40 lg:h-44
            rounded-2xl
            cursor-pointer
            p-3 md:p-4
            transition
            ${selected.includes(item.name)
                                    ? "border-4 border-green-500 scale-105"
                                    : ""
                                }
          `}
                        >
                            <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold">
                                {item.name}
                            </h3>

                            <div className="bg-white/20 h-16 md:h-20 lg:h-24 mt-3 rounded-lg overflow-hidden">
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center lg:justify-end mt-8 lg:mt-12">
                    <button
                        onClick={handleNext}
                        disabled={selected.length < 3}
                        className={`
          px-8 py-3
          rounded-full
          text-lg md:text-xl
          ${selected.length >= 3
                                ? "bg-green-600"
                                : "bg-gray-600"
                            }
        `}
                    >
                        Next Page
                    </button>
                </div>

            </div>
        </div>


    )
}