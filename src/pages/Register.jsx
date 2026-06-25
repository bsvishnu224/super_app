import { useState } from 'react';
import bgImg from '../assets/reg_bg_img.png'
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';


export default function Register() {
    const setUser=useStore((state)=>state.setUser)
    const [isChecked, setIsChecked] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "",
        mobile: "",
    });

    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const validate = () => {
        let temp = {};
        console.log(3)

        if (!formData.name.trim()) {

            temp.name = "Name is required";
        }

        if (!formData.username.trim()) {
            temp.username = "Username is required";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            temp.email = "Invalid email";
        }

        if (!/^\d{10}$/.test(formData.mobile)) {
            temp.mobile = "Mobile must be 10 digits";
        }
        if(!isChecked) {
            temp.checkbox = "Please accept the terms and conditions";
        }
        console.log(4)

        setErrors(temp);
        console.log(Object.keys(temp).length === 0)
        console.log(temp)
        return Object.keys(temp).length === 0;
    }; const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(1)

        if (validate()) {
            console.log(2)
            setUser(formData)

            navigate("/categories");
        }
    };
    
    return (
        <div className="flex flex-col md:flex-row h-screen bg-black">
            {/* Left Section */}
            <div
                className="w-full md:w-1/2 relative bg-cover bg-center"
                style={{
                    backgroundImage:
                        `url(${bgImg})`,
                }}
            >
                <div className="absolute bottom-16 left-10">
                    <h1 className="text-white text-5xl font-bold leading-tight text-left">
                        Discover new things on
                        <br />
                        Superapp
                    </h1>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-black">
                <div className="w-[400px]">
                    <h1 className="text-center text-[#72DB73] text-400 single-day text-5xl font-bold">
                        Super app
                    </h1>

                    <p className="text-center text-white text-xl">
                        Create your new account
                    </p>

                    <div className="space-y-4 mt-8">
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1 text-left">
                                {errors.name}
                            </p>
                        )}

                        <input
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Name"
                            className="w-full h-10 p-4 bg-zinc-800 text-white rounded outline-none"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1 text-left">
                                {errors.username}
                            </p>
                        )}

                        <input
                            name='username'
                            value={formData.username}
                            onChange={handleChange}

                            type="text"
                            placeholder="UserName"
                            className="w-full h-10 p-4 bg-zinc-800 text-white rounded outline-none"
                        />

                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1 text-left">
                                {errors.email}
                            </p>
                        )}



                        <input
                            name='email'
                            value={formData.email}
                            onChange={handleChange}

                            type="email"
                            placeholder="Email"
                            className="w-full h-10 p-4 bg-zinc-800 text-white rounded outline-none"
                        />
                        {errors.mobile && (
                            <p className="text-red-500 text-sm mt-1 text-left">
                                {errors.mobile}
                            </p>
                        )}

                        <input
                            name='mobile'
                            value={formData.mobile}
                            onChange={handleChange}

                            type="text"
                            placeholder="Mobile"
                            className="w-full h-10 p-4 bg-zinc-800 text-white rounded outline-none"
                        />

                    </div>

                    <div className="flex items-center gap-2 mt-6">
                        <input checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)} type="checkbox" />
                        <span className="text-gray-400 text-sm">
                            Share my registration data with Superapp
                        </span>
                    </div>
                    {errors.checkbox && (
                        <p className="text-red-500 text-sm mt-1 ">
                            {errors.checkbox}
                        </p>
                    )}

                    <button onClick={handleSubmit} className="w-full  flex items-center justify-center h-10 br-28 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-full mt-10 text-xl transition">
                        SIGN UP
                    </button>

                    <p className="text-gray-400 text-xs mt-6 leading-5">
                        By clicking on Sign up, you agree to Superapp{" "}
                        <span className="text-green-400 font-semibold">
                            Terms and Conditions of Use
                        </span>
                    </p>

                    <p className="text-gray-400 text-xs mt-4 leading-5">
                        To learn more about how Superapp collects, uses, shares and
                        protects your personal data please head Superapp{" "}
                        <span className="text-green-400 font-semibold">
                            Privacy Policy
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}