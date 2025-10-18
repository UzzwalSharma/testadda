import React from "react";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Award, BookOpen, Clock, TrendingUp, Calendar, Sparkles, Target, Zap, Trophy } from "lucide-react";

// ---------- Dashboard ----------
export default function StudentDashboard({ student, onLogout }) {
  const { name } = student;
  const data = useQuery(api.getStudentDetails.getStudentDetails, { name });

  if (!data) return <Loader />;
  if (!data.success) return <ErrorScreen message={data.message} onLogout={onLogout} />;

  const details = data.student;

  // Metrics
  const totalTests = details.tests?.length || 0;
  const totalWorksheets = details.worksheets?.length || 0;
  const totalSubmissions = totalTests + totalWorksheets;
  const onTimeSubmissions = [...(details.tests || []), ...(details.worksheets || [])].filter(i => i.timelySubmission).length;
  const onTimeRate = totalSubmissions ? Math.round((onTimeSubmissions / totalSubmissions) * 100) : 0;
  const avgScore = details.tests?.length ? Math.round(details.tests.reduce((a,b)=>a+b.marks,0)/details.tests.length) : 0;

  // Performance Trend
  const trendData = details.tests?.length ? [...details.tests].reverse().map(t => ({
    name: t.testName.split(' ').slice(0,2).join(' '),
    score: t.marks,
    avg: avgScore
  })) : [];

  // Subject Radar
  const subjects = {};
  details.tests?.forEach(t => {
    const s = t.testName.split(' ')[0];
    if(!subjects[s]) subjects[s] = { total:0, count:0 };
    subjects[s].total += t.marks; subjects[s].count +=1;
  });
  const subjectData = Object.entries(subjects).map(([subject, d])=>({subject, score: Math.round(d.total/d.count), fullMark:100}));

  // Achievement level
  const getAchievementLevel = (score) => {
    if (score >= 90) return { text: "Outstanding!", color: "from-yellow-400 to-orange-500", emoji: "🌟" };
    if (score >= 75) return { text: "Excellent!", color: "from-green-400 to-emerald-500", emoji: "🎉" };
    if (score >= 60) return { text: "Good Job!", color: "from-blue-400 to-cyan-500", emoji: "👍" };
    return { text: "Keep Going!", color: "from-purple-400 to-pink-500", emoji: "💪" };
  };

  const achievement = getAchievementLevel(avgScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100">
      <Header name={details.name} onLogout={onLogout} achievement={achievement} avgScore={avgScore} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={<Trophy className="w-7 h-7"/>} 
            label="Average Score" 
            value={`${avgScore}%`} 
            gradient="from-amber-400 via-orange-500 to-red-500"
            iconBg="bg-amber-100"
            iconColor="text-amber-600"
          />
          <StatCard 
            icon={<Target className="w-7 h-7"/>} 
            label="Tests Completed" 
            value={totalTests} 
            gradient="from-emerald-400 via-teal-500 to-cyan-500"
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
          />
          <StatCard 
            icon={<BookOpen className="w-7 h-7"/>} 
            label="Worksheets Done" 
            value={totalWorksheets} 
            gradient="from-violet-400 via-purple-500 to-fuchsia-500"
            iconBg="bg-violet-100"
            iconColor="text-violet-600"
          />
          <StatCard 
            icon={<Zap className="w-7 h-7"/>} 
            label="On-Time Rate" 
            value={`${onTimeRate}%`} 
            gradient="from-pink-400 via-rose-500 to-red-500"
            iconBg="bg-pink-100"
            iconColor="text-pink-600"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {trendData.length > 0 && (
            <ChartCard 
              title="Performance Journey" 
              icon={<TrendingUp className="w-6 h-6"/>}
              subtitle="Your progress over time"
            >
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e9d5ff" strokeOpacity={0.3}/>
                  <XAxis dataKey="name" stroke="#9333ea" fontSize={12} fontWeight={600}/>
                  <YAxis stroke="#9333ea" fontSize={12} fontWeight={600}/>
                  <Tooltip 
                    contentStyle={{
                      background: 'rgba(255,255,255,0.98)', 
                      border: 'none', 
                      borderRadius: '16px', 
                      boxShadow: '0 10px 40px rgba(139, 92, 246, 0.2)',
                      padding: '12px 16px'
                    }}
                    labelStyle={{fontWeight: 'bold', color: '#7c3aed'}}
                  />
                  <Area type="monotone" dataKey="score" stroke="#8b5cf6" fill="url(#scoreGradient)" strokeWidth={3}/>
                  <Area type="monotone" dataKey="avg" stroke="#d8b4fe" strokeDasharray="5 5" fillOpacity={0} strokeWidth={2}/>
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          )}

          {subjectData.length > 0 && (
            <ChartCard 
              title="Subject Mastery" 
              icon={<Sparkles className="w-6 h-6"/>}
              subtitle="Your strengths across subjects"
            >
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={subjectData}>
                  <PolarGrid stroke="#e9d5ff" strokeOpacity={0.5}/>
                  <PolarAngleAxis dataKey="subject" stroke="#9333ea" fontSize={12} fontWeight={600}/>
                  <PolarRadiusAxis stroke="#d8b4fe" fontSize={10}/>
                  <Radar 
                    dataKey="score" 
                    stroke="#8b5cf6" 
                    fill="#a78bfa" 
                    fillOpacity={0.6}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}
        </div>

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityCard 
            title="Recent Tests" 
            icon={<Calendar className="w-6 h-6"/>} 
            items={details.tests || []} 
            type="test"
            color="purple"
          />
          <ActivityCard 
            title="Recent Worksheets" 
            icon={<BookOpen className="w-6 h-6"/>} 
            items={details.worksheets || []} 
            type="worksheet"
            color="pink"
          />
        </div>
      </div>
    </div>
  );
}

// ---------- Components ----------
const Header = ({name, onLogout, achievement, avgScore}) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
    <div className="relative overflow-visible">
      <div className="border-2 border-purple-200 rounded-3xl bg-gradient-to-r from-purple-100 to-blue-100 px-6 sm:px-8 py-4 shadow-lg relative overflow-hidden">
        {/* Decorative dots */}
        <div className="absolute top-4 right-32 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-8 right-24 w-1.5 h-1.5 bg-purple-300 rounded-full"></div>
        <div className="absolute bottom-12 left-20 w-2 h-2 bg-purple-300 rounded-full opacity-50"></div>
        <div className="absolute top-16 right-48 w-2.5 h-2.5 bg-blue-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-6 left-32 w-2 h-2 bg-blue-300 rounded-full opacity-60"></div>
        
        <div className="flex items-center justify-between min-h-[180px] sm:min-h-[200px] z-10 relative">
          <div className="flex-1 pr-2 sm:pr-4">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3">
              Hi, <span className="text-gray-800">{name}</span> 👋🏻
            </h1>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <div className={`inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r ${achievement.color} text-white font-bold text-xs sm:text-sm shadow-lg`}>
                {achievement.text}
              </div>
              <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/80 text-purple-700 font-bold text-xs sm:text-sm shadow">
                {avgScore}% Average
              </div>
            </div>
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg hidden sm:block">
              Ready to continue your amazing learning journey?
            </p>
          </div>
          
          <div className="flex flex-shrink-0 relative">
            <img 
              src="/teacher.png" 
              alt="Student" 
              className="h-32 sm:h-48 md:h-56 lg:h-64 relative z-10 top-2"
              style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))' }}
            />
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-32 sm:w-48 h-3 bg-purple-300 rounded-full blur-sm opacity-40"></div>
          </div>
          
          <button 
            onClick={onLogout} 
            className="absolute top-4 right-4 px-3 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-white text-purple-700 font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-xs sm:text-base cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  </div>
);

const StatCard = ({icon, label, value, gradient, iconBg, iconColor}) => (
  <div className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-200">
    <div className="flex items-center justify-between mb-4">
      <div className={`${iconBg} ${iconColor} p-3 rounded-2xl`}>
        {icon}
      </div>
      <div className={`text-4xl font-black bg-gradient-to-br ${gradient} bg-clip-text text-transparent`}>
        {value}
      </div>
    </div>
    <p className="text-gray-600 font-semibold text-sm">{label}</p>
  </div>
);

const ChartCard = ({title, icon, subtitle, children}) => (
  <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-purple-100 hover:border-purple-200 transition-all duration-300">
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-1">
        <div className="text-purple-600">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      {subtitle && <p className="text-sm text-gray-500 ml-8">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const ActivityCard = ({title, icon, items, type, color}) => {
  const colorScheme = {
    purple: { border: "border-purple-200", hover: "hover:border-purple-400", badge: "from-purple-500 to-violet-600", text: "text-purple-600" },
    pink: { border: "border-pink-200", hover: "hover:border-pink-400", badge: "from-pink-500 to-rose-600", text: "text-pink-600" }
  }[color];

  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-purple-100 hover:border-purple-200 transition-all duration-300">
      <div className="flex items-center gap-2 mb-5">
        <div className={colorScheme.text}>{icon}</div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {items.length ? items.slice(0, 5).map((i, k) => (
          <div 
            key={k} 
            className={`bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl p-4 border-2 ${colorScheme.border} ${colorScheme.hover} transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-1">{i[`${type}Name`]}</h4>
                {i.submittedAt && <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3"/> {i.submittedAt}
                </p>}
              </div>
              <div className="text-right ml-4">
                <div className={`text-3xl font-black bg-gradient-to-br ${colorScheme.badge} bg-clip-text text-transparent`}>
                  {i.marks}
                </div>
                <div className="text-xs text-gray-500 font-medium">points</div>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-3">📚</div>
            <p className="text-gray-500 font-medium">No submissions done by Ujjwal yet!</p>
            <p className="text-sm text-gray-400 mt-1">keep learning!</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Loader = () => (
  <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100">
    <div className="text-center">
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <p className="text-gray-700 font-bold text-lg">Loading your dashboard...</p>
      <p className="text-gray-500 text-sm mt-2">Hang tight! ✨</p>
    </div>
  </div>
);

const ErrorScreen = ({message, onLogout}) => (
  <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-violet-100 via-purple-50 to-pink-100 p-4">
    <div className="bg-white rounded-3xl shadow-2xl p-10 border-2 border-purple-200 text-center max-w-md">
      <div className="text-6xl mb-4">😕</div>
      <h2 className="text-2xl font-bold text-gray-800 mb-3">Oops!</h2>
      <p className="text-gray-600 mb-6">{message || "Student not found"}</p>
      <button 
        onClick={onLogout} 
        className="px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
      >
        Go Back
      </button>
    </div>
  </div>
);