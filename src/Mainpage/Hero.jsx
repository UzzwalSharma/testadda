import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


function Hero() {
  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden ">
      {/* Background image */}
      <img
        src="/herobg.png"
        alt="Tuition Adda Background"
        className="absolute  w-[100vw] h-[100vh] object-cover"
      />

     

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-6 mt-6 flex flex-col items-center justify-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-6xl outfit-new mb-2 sm:mb-4 text-yellow-400">
          Welcome To 
        </h1>
        <h1 className="text-5xl sm:text-6xl md:text-8xl outfit font-bold mb-3 sm:mb-4 text-white/90 leading-tight">
 Tuition अड्डा 
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-2 sm:mb-4">By Ujjwal Sharma</p>
        <p className="text-sm sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
         Your one stop hub for all the worksheets and test! 
        </p>
 <div className="bg-yellow-300 w-[80%] sm:w-[60%] h-1 mb-4 sm:mb-2"></div>
        <div className="flex flex-wrap justify-center gap-4 text-center">
          <Link to="/start">
          <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 font-semibold px-6 sm:px-8 py-3 sm:py-2 rounded-md shadow-lg transition-all min-w-[140px] sm:w-[120px] text-center justify-center text-xl sm:text-2xl cursor-pointer">
      START
          </button>
</Link> 
         
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;