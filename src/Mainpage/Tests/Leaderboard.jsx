import React, { useState, useEffect, useRef } from 'react';
import { Trophy, Star, Sparkles, Award } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid,Cell, Tooltip, ResponsiveContainer } from 'recharts';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
const StudentLeaderboard = () => {
 const [students, setStudents] = useState([
  { name: 'Radhya', stars: 4, avatar: 'https://i.pinimg.com/736x/4c/d7/6c/4cd76cff568c57f863245c0d3f09869b.jpg' },
  { name: 'Aaishini', stars: 4.5, avatar: 'https://i.pinimg.com/1200x/3c/57/71/3c5771117cc616a6474395e24bcff7b7.jpg' },
  { name: 'Vidushi', stars: 5, avatar: 'https://i.pinimg.com/736x/67/61/f8/6761f8b3728ee3709ab28533c196e821.jpg' }
]);

  const starsRef = useRef([]);
  const chartRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const sortedStudents = [...students].sort((a, b) => b.stars - a.stars);
    setStudents(sortedStudents);

    // Gentle card entrance animation
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.15,
            ease: 'power2.out'
          }
        );
      }
    });

    // Animate stars gently
    starsRef.current.forEach((starContainer, index) => {
      if (starContainer) {
        const stars = starContainer.querySelectorAll('.star-icon');
        stars.forEach((star, starIndex) => {
          gsap.fromTo(star,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              delay: index * 0.2 + starIndex * 0.1,
              ease: 'back.out(1.5)'
            }
          );
        });
      }
    });

    // Chart gentle entrance
    if (chartRef.current) {
      gsap.fromTo(chartRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out'
        }
      );
    }
  }, []);

  const renderStarIcon = (stars) => {
    const fullStars = Math.floor(stars);
    const hasHalf = stars % 1 !== 0;
    const starsToShow = Math.min(fullStars + (hasHalf ? 1 : 0), 5);
    
    return (
      <div className="flex gap-1.5 flex-wrap justify-center">
        {[...Array(starsToShow)].map((_, i) => (
          <div key={i} className="relative star-icon">
            {i < fullStars ? (
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ) : hasHalf ? (
              <div className="relative">
                <Star className="w-6 h-6 text-gray-300" />
                <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                  <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                </div>
              </div>
            ) : (
              <Star className="w-6 h-6 text-gray-300" />
            )}
          </div>
        ))}
      </div>
    );
  };

  const getBarColor = (index) => {
    const colors = ['#fbbf24', '#a78bfa', '#fb7185'];
    return colors[index] || '#a78bfa';
  };

  const chartData = students.map((student, index) => ({
    name: student.name,
    stars: student.stars,
    fill: getBarColor(index)
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border-2 border-purple-300">
          <p className="font-bold text-gray-800">{payload[0].payload.name}</p>
          <p className="text-purple-600">⭐ {payload[0].value} stars</p>
        </div>
      );
    }
    return null;
  };

  const getRankStyle = (index) => {
    if (index === 0) return {
      bg: 'bg-gradient-to-br from-yellow-100 to-yellow-200',
      border: 'border-yellow-400',
      text: 'text-yellow-700'
    };
    if (index === 1) return {
      bg: 'bg-gradient-to-br from-purple-100 to-purple-200',
      border: 'border-purple-400',
      text: 'text-purple-700'
    };
    return {
      bg: 'bg-gradient-to-br from-pink-100 to-pink-200',
      border: 'border-pink-400',
      text: 'text-pink-700'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 p-8 relative overflow-hidden">
      {/* Soft Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-300 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-pink-300 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Friendly Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-10 h-10 text-yellow-500" />
            <h1 className="text-6xl font-cursive text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-red-500 to-yellow-400">
              Leader Board
            </h1>
            <Sparkles className="w-10 h-10 text-pink-500" />
          </div>
          <p className="text-xl  font-bold">Lets see Who's shining the brightest? ✨</p>
        </div>

        {/* Scoring Rules with Subtle Clip Path */}
        <div className="relative mb-8">
          <div 
            className="bg-white rounded-xl p-6 shadow-lg border-3 border-purple-300"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)' }}
          >
            <h2 className="text-2xl font-bold mb-5 text-center text-purple-700">⭐ How to Earn Stars ⭐</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-yellow-50 rounded-lg p-3 text-center border-2 border-yellow-300">
                <div className="font-bold text-gray-800">Perfect! 🎉</div>
                <div className="text-gray-600">100% = ⭐⭐⭐⭐⭐</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center border-2 border-green-300">
                <div className="font-bold text-gray-800">Amazing! 🌟</div>
                <div className="text-gray-600">90-99% = ⭐⭐⭐⭐½</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center border-2 border-blue-300">
                <div className="font-bold text-gray-800">Great! 👏</div>
                <div className="text-gray-600">85-89% = ⭐⭐⭐⭐</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3 text-center border-2 border-purple-300">
                <div className="font-bold text-gray-800">Good! 💪</div>
                <div className="text-gray-600">75-84% = ⭐⭐⭐</div>
              </div>
              <div className="bg-pink-50 rounded-lg p-3 text-center border-2 border-pink-300">
                <div className="font-bold text-gray-800">Nice! 🌈</div>
                <div className="text-gray-600">60-74% = ⭐⭐</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3 text-center border-2 border-orange-300">
                <div className="font-bold text-gray-800">Keep Going! 💫</div>
                <div className="text-gray-600">45-59% = ⭐</div>
              </div>
            </div>
          </div>
          {/* Small corner accent */}
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-purple-400 rounded-tl"></div>
        </div>

        {/* Bar Chart with Gentle Clip Path */}
        <div 
          ref={chartRef} 
          className="relative mb-6"
        >
          <div 
            className="bg-white rounded-xl p-6 shadow-lg border-3 border-pink-300"
            style={{ clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 0 100%, 0 15px)' }}
          >
            <ResponsiveContainer width="70%" height={350}>
              <BarChart data={chartData} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  angle={-10}
                  textAnchor="end"
                  height={70}
                  tick={{ fill: '#6b7280', fontSize: 14, fontWeight: 'bold' }}
                />
                <YAxis 
                  label={{ value: '⭐ Stars', angle: -90, position: 'insideLeft', style: { fontSize: 14, fontWeight: 'bold', fill: '#6b7280' } }}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(192, 132, 252, 0.1)' }} />
                <Bar 
                  dataKey="stars" 
                  radius={[8, 8, 0, 0]}
                  animationDuration={1200}
                  animationEasing="ease-out"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* Small corner accent */}
          <div className="absolute top-0 left-0 w-5 h-5 bg-pink-400 rounded-br"></div>
        </div>

        {/* Student Cards with Gentle Clip Paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {students.map((student, index) => {
            const style = getRankStyle(index);
            return (
              <div 
                key={student.name} 
                ref={el => cardsRef.current[index] = el}
                className="relative"
              >
                {/* Card with subtle clip path */}
                <div 
                  className={`${style.bg} rounded-xl p-6 border-3 ${style.border} shadow-lg text-center relative overflow-hidden transition-transform duration-300 hover:scale-105`}
                  style={{ 
                    clipPath: index === 0 
                      ? 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
                      : index === 1
                      ? 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
                      : 'polygon(12px 0, 100% 0, 100% 100%, calc(100% - 12px) 100%, 0 calc(100% - 12px), 0 0)'
                  }}
                >
                  {/* Rank Badge */}
                  {/* Avatar */}
<div className="flex justify-center mb-3">
  <img
    src={student.avatar}
    alt={student.name}
    className={`w-24 h-24 rounded-full object-cover border-4 shadow-lg ${
      index === 0
        ? 'border-yellow-400'
        : index === 1
        ? 'border-purple-400'
        : 'border-pink-400'
    }`}
  />
</div>


                  {/* Icons for top performers */}
                  {index === 0 && (
                    <div className="flex justify-center mb-3">
                      <Trophy className="w-10 h-10 text-yellow-600 animate-bounce" />
                    </div>
                  )}
                  {index === 1 && (
                    <div className="flex justify-center mb-3">
                      <Award className="w-9 h-9 text-purple-600" />
                    </div>
                  )}
                  {index === 2 && (
                    <div className="flex justify-center mb-3">
                      <Sparkles className="w-9 h-9 text-pink-600" />
                    </div>
                  )}

                  {/* Student Name */}
                  <h3 className={`text-3xl font-bold mb-3 ${style.text}`}>
                    {student.name}
                  </h3>

                  {/* Star Count */}
                  <div className={`text-4xl font-bold mb-4 ${style.text} flex items-center justify-center gap-2`}>
                    {student.stars} ⭐
                  </div>

                  {/* Stars Display */}
                  <div ref={el => starsRef.current[index] = el} className="mb-4">
                    {renderStarIcon(student.stars)}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="h-2.5 bg-white/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          index === 0 ? 'bg-yellow-500' :
                          index === 1 ? 'bg-purple-500' :
                          'bg-pink-500'
                        } transition-all duration-1000`}
                        style={{ width: `${(student.stars / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Small corner accents */}
                {index === 0 && (
                  <>
                    <div className="absolute top-0 left-0 w-4 h-4 bg-yellow-400 rounded-br"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-400 rounded-tl"></div>
                  </>
                )}
                {index === 1 && (
                  <>
                    <div className="absolute top-0 right-0 w-4 h-4 bg-purple-400 rounded-bl"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 bg-purple-400 rounded-tr"></div>
                  </>
                )}
                {index === 2 && (
                  <>
                    <div className="absolute top-0 left-0 w-4 h-4 bg-pink-400 rounded-br"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-pink-400 rounded-tl"></div>
                  </>
                )}
              </div>
            );
          })}
        </div>
<Link to="/" className="fixed bottom-6 left-6">
      <button className='border-2 rounded-md border-amber-200 p-2 border-solid bg-amber-200 hover:bg-amber-300 cursor-pointer font-black'>GO BACK</button>
       </Link>
      </div>
    </div>
  );
};

export default StudentLeaderboard;