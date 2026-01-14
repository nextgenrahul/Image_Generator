import { assets, testimonialsData } from "../assets/assets"
import { motion } from "framer-motion"

const Testimonial = () => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center my-20 py-8"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ delay: 0.2, duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl sm:text-4xl font-semibold mb-2">What Our Users Say</h2>
      <p className="text-gray-800 mb-8">
        Turn your ideas into stunning visuals with our AI-powered image generator. 
      </p>

      <div className="flex flex-wrap gap-6">
        { testimonialsData.map((testimonial, index) => (
            <div 
                key={index}
                className="bg-white/20 p-12 rounded-lg shadow-lg border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all"
            >
                <div className="flex flex-col items-center">
                    <img 
                        src={testimonial.image} 
                        alt="" 
                        className="rounded-full w-14"
                    />
                    
                    <h2>{testimonial.name}</h2>
                    <p>{testimonial.role}</p>
                    
                    <div className="flex mb-4">
                        {
                            Array(testimonial.stars).fill().map((item, index) => (
                                <img 
                                    key={index} 
                                    src={assets.rating_star}
                                    alt="star" 
                                 />
                            ))
                        }
                    </div>

                    <p className="text-center text-sm text-gray-600">{testimonial.text}</p>
                </div>
            </div>
        )) }
      </div>
    </motion.div>
  )
}
export default Testimonial