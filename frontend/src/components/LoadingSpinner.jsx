import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 flex items-center
                    justify-center relative overflow-hidden"
    >
        { /* Simple loading spinner */ }
        <motion.div 
            className="w-16 h-16 border-t-8 border-l-4 border-b-2 border-t-purple-400 border-l-purple-300 border-b-purple-200 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
    </div>
  )
}

export default LoadingSpinner