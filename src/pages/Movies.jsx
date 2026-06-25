import React, { useEffect, useState } from "react";
import profile from "../assets/profile.png";
import { useStore } from "../store/useStore";
import { fetchMovieDetails, searchMovieByGenre } from "../services/movieApi";
import { useNavigate } from "react-router-dom";



const MoviePage = () => {
    const categories = useStore((state) => state.categories);
    const user = useStore(state => state.user)


    const [loading, setLoading] = useState(true);
    const [moviesByCategory, setMoviesByCategory] = useState({});
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [movieLoading, setMovieLoading] = useState(false);
    const navigator=useNavigate()
    useEffect(()=>{
            if(user.name===""){
                navigator("/")
            }
            else if (categories.length<=0 && user.name!==""){
                navigator('/categories')
            }
        })

    const handleMovieClick = async (imdbID) => {
        try {
            setMovieLoading(true);
            setShowModal(true);

            const movie = await fetchMovieDetails(
                imdbID,
                import.meta.env.VITE_MOVIES_API_KEY
            );

            setSelectedMovie(movie);
        } catch (error) {
            console.log(error);
        } finally {
            setMovieLoading(false);
        }
    };

    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoading(true);

                const data = {};

                for (const category of categories) {
                    const movies = await searchMovieByGenre(
                        category,
                        import.meta.env.VITE_MOVIES_API_KEY
                    );

                    data[category] = movies;
                }

                setMoviesByCategory(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (categories.length) {
            loadMovies();
        }
    }, [categories]);
    return loading ? (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-5">
            <div className="w-16 h-16 border-4 border-gray-600 border-t-green-500 rounded-full animate-spin"></div>

            <p className="text-white text-2xl">
                Loading movies...
            </p>
        </div>
    ) : (
        <>

        <div className="min-h-screen bg-black text-white px-8 py-6">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-[#72DB73] text-4xl font-bold single-day">
                    Super app
                </h1>

                <img
                    src={profile}
                    alt=""
                    className="w-16 h-16 rounded-full object-cover"
                />
            </div>

            <div className="m-10">
                {/* Title */}
                <h2 className="text-4xl font-bold mt-10 mb-10 text-left">
                    Entertainment according to your choice
                </h2>

                {/* Categories */}
                {categories.map((category) => (
                    <div key={category} className="mb-10">

                        <h3 className="text-3xl font-semibold text-gray-400 mb-5 text-left">
                            {category}
                        </h3>

                        <div className="grid grid-cols-4 gap-8">
                            {moviesByCategory[category]?.map((movie) => (
                                <div
                                    key={movie.imdbID}
                                    onClick={() => handleMovieClick(movie.imdbID)}
                                    className="
        h-[160px]
        rounded-xl
        overflow-hidden
        cursor-pointer
        hover:scale-105
        transition
      "
                                >
                                    <img
                                        src={
                                            movie.Poster !== "N/A"
                                                ? movie.Poster
                                                : "https://placehold.co/300x450?text=No+Image"
                                        }
                                        alt={movie.Title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>


                    </div>
                ))}
            </div>
            

        </div>
        {showModal && (
                <div
                    className="fixed inset-0 bg-black/70 flex items-center justify-center z-50  overflow-y-auto text-left"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="bg-[#1B1B1B] w-[850px] rounded-3xl p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {movieLoading ? (
                            <div className="flex justify-center py-20">
                                <div className="w-14 h-14 border-4 border-gray-500 border-t-green-500 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            selectedMovie && (
                                <div className="flex gap-8">
                                    <img
                                        src={selectedMovie.Poster}
                                        alt=""
                                        className="w-[250px] h-[350px] rounded-2xl object-cover"
                                    />

                                    <div className="flex-1 text-white">
                                        <div className="flex justify-between">
                                            <h1 className="text-4xl font-bold">
                                                {selectedMovie.Title}
                                            </h1>

                                            <button
                                                onClick={() => {
                                                    setShowModal(false);
                                                    setSelectedMovie(null);
                                                }}
                                                className="text-3xl"
                                            >
                                                ✕
                                            </button>
                                        </div>

                                        <p className="text-gray-400 mt-4">
                                            {selectedMovie.Genre}
                                        </p>

                                        <p className="mt-6">
                                            ⭐ {selectedMovie.imdbRating}
                                        </p>

                                        <p className="mt-3">
                                            ⏱ {selectedMovie.Runtime}
                                        </p>

                                        <h2 className="text-2xl font-semibold mt-8">
                                            Plot
                                        </h2>

                                        <p className="text-gray-300 mt-2 leading-7">
                                            {selectedMovie.Plot}
                                        </p>

                                        <h2 className="text-2xl font-semibold mt-8">
                                            Cast
                                        </h2>

                                        <p className="text-gray-300 mt-2">
                                            {selectedMovie.Actors}
                                        </p>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
            </>


    );


};

export default MoviePage;