import { useContext } from "react";
import { assets } from "../assets/assets"
import { motion } from "motion/react"
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setShowLogin, credits} = useContext(AppContext);
  const navigate = useNavigate()
    
  const loginFirstForImageGeneration = () => {
    if (user) {
        navigate('/result');
    } else {
        setShowLogin(true);
    }
  };

  return (
    <motion.div
        className="flex flex-col justify-center items-center text-center my-20"
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
    
    >
        <motion.div 
            className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500"
            initial={{ opacity: 0.2, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
        >
            <p>Best text to image generator</p>
            <img src={assets.star_icon} alt= "" />
        </motion.div>

        <motion.h1 
            className="text-4xl max-w-[300px] sm:text-6xl sm:max-w-[520px] mx-auto mt-10 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 2, ease: "easeInOut"}}
        >Turn text to <span className="text-blue-500">images</span>, in seconds.</motion.h1>

        <motion.p 
            className="text-center max-w-xl mx-auto mt-5 text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
        >
            Unleash your creativity with our AI-powered image generator. Turn your ideas into stunning visuals in seconds. Whether you're a designer, marketer, or just looking to have fun, our tool makes it easy to create unique images from text prompts. Try it now and see the magic unfold!
        </motion.p>

        <motion.button
            onClick={loginFirstForImageGeneration}
            className="sm:text-lg text-white bg-black w-auto mt-11 px-12 py-2 flex items-center gap-3 rounded-full cursor-pointer shadow-lg shadow-zinc-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
        >
            Generate Images
            <img src={assets.star_group} alt="" className="w-10"/>
        </motion.button>

        <motion.div
            className="flex flex-wrap justify-center mt-14 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
        >
            { Array(6).fill('').map((item, index) => (
                <motion.img
                    className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
                    src={ index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1 }
                    alt=""
                    key={index}
                    width={70}
                    whileHover={{ scale: 1.05, duration: 0.1 }}
                />
            ))}
        </motion.div>
        <p
            className="mt-2 text-neutral-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
        >Generate images from Imagify</p>
    </motion.div>

  )
}
export default Header