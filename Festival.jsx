import React from "react";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
export default function Festival({ isVisible, onClose }) {
  return (
     <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl overflow-hidden w-full max-w-md relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-50 bg-white rounded-full p-2 shadow hover:scale-110 transition-transform"
            >
              <X className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer" />
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 px-6 py-4 text-center relative z-10">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-white" />
                <h2 className="text-2xl font-bold text-white">
                  Happy Diwali, Champs!
                </h2>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="p-6 text-center space-y-4 relative z-10">
              <div className="flex justify-center">
                <div className="w-32 h-32  bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center shadow-lg text-6xl">
                  <img src="/diwali.gif" alt="" className="rounded-sm" />
                </div>
              </div>

              <p className="text-gray-800 font-semibold">
                "May your light shine as bright as the diyas,
              </p>
              <p className="text-gray-800 font-semibold">
                and your success sparkle like the fireworks!"
              </p>

              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-full shadow"
              >
                Let's Start Learning! 🚀
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
