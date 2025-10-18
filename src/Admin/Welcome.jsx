export default function TeacherWelcomeCard() {
  return (
    <div className="mb-4 relative overflow-visible">
      <div className="border-2 border-purple-200 rounded-3xl bg-gradient-to-r from-purple-100 to-blue-100 px-8 py-2 shadow-lg relative overflow-hidden">
        {/* Decorative dots */}
        <div className="absolute top-4 right-32 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-8 right-24 w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
        <div className="absolute bottom-12 left-20 w-2 h-2 bg-purple-300 rounded-full opacity-50"></div>
        <div className="absolute top-16 right-48 w-2.5 h-2.5 bg-blue-300 rounded-full opacity-40"></div>
        
        <div className="flex items-center justify-between h-[20vh] z-10">
          <div className="flex-1">
            <h1 className="text-5xl  outfit text-gray-900 mb-3">
              Hi, <span className="text-gray-800">Drashti Mam</span>
            </h1>
            <p className="text-gray-700 text-xl">
              Ready to start your day with teaching resources?
            </p>
          </div>
          
          <div className="flex-shrink-0 ml-8 relative">
            <img 
              src="/teacher.png" 
              alt="Teacher" 
              className="h-64 relative z-10"
              style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}
            />
            {/* Laptop base shadow */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-48 h-3 bg-purple-300 rounded-full blur-sm opacity-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}