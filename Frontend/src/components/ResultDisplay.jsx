import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const COLORS = ['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6'];

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  let data = Array.isArray(result.solution)
    ? result.solution.map((item) => ({
        name: item.subject,
        value: item.value
      }))
    : [];

  data.sort((a, b) => b.value - a.value);
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 backdrop-blur-sm border-2 border-gray-200 rounded-xl p-4 shadow-xl">
          <p className="font-bold text-gray-800 mb-1">{payload[0].name}</p>
          <p className="text-purple-600 font-semibold">
            {payload[0].value.toFixed(4)} hours
          </p>
          {total > 0 && (
            <p className="text-gray-500 text-sm">
              {((payload[0].value / total) * 100).toFixed(1)}% of total
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Animated Header Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-3xl shadow-2xl p-10 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mb-48"></div>
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-5xl">📈</span>
              <h2 className="text-4xl font-bold">Your Study Plan</h2>
            </div>
            <p className="text-purple-100 text-lg">Optimized time allocation for maximum efficiency</p>
          </div>
          {total > 0 && (
            <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl p-6 min-w-[180px]">
              <div className="text-6xl font-bold mb-2">{total.toFixed(1)}</div>
              <div className="text-purple-100 font-semibold text-lg">Total Hours</div>
            </div>
          )}
        </div>
      </div>

      {data.length > 0 ? (
        <>
          {/* Charts Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Pie Chart Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🥧</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Time Distribution</h3>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    innerRadius={60}
                    paddingAngle={5}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(1)}%`
                    }
                    labelLine={true}
                  >
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        className="hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Bar Chart Card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Hours Breakdown</h3>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#6b7280"
                    tick={{ fill: '#374151', fontWeight: 600 }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    tick={{ fill: '#374151', fontWeight: 600 }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Subject Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item, idx) => (
              <div 
                key={idx}
                className="relative group bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-7 border-2 border-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-20 group-hover:opacity-30 transition-opacity"
                  style={{ background: COLORS[idx % COLORS.length] }}
                ></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">📖</span>
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg transform group-hover:rotate-12 transition-transform"
                      style={{ background: COLORS[idx % COLORS.length] }}
                    >
                      {((item.value / total) * 100).toFixed(0)}%
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-800 text-xl mb-3 group-hover:text-purple-600 transition-colors">{item.name}</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold" style={{ color: COLORS[idx % COLORS.length] }}>
                      {item.value.toFixed(4)}
                    </span>
                    <span className="text-gray-500 font-semibold">hours</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 group-hover:animate-pulse"
                      style={{ 
                        width: `${(item.value / total) * 100}%`,
                        background: COLORS[idx % COLORS.length]
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-3xl p-12 text-center shadow-xl">
          <div className="text-8xl mb-6 animate-bounce">⚠️</div>
          <h3 className="text-3xl font-bold text-red-800 mb-3">Target Not Achievable</h3>
          <p className="text-red-600 text-lg">Unable to achieve this target GPA with the given constraints. Please adjust your parameters and try again.</p>
        </div>
      )}

      {/* GPA Summary Card */}
      {typeof result.totalWeightedGpa === 'number' && (
        <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl shadow-xl p-10 border-2 border-green-200 hover:shadow-2xl transition-shadow duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full -mr-32 -mt-32 opacity-30"></div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-3xl">🎓</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">GPA Summary</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100 hover:scale-105 transition-transform duration-300">
                <p className="text-gray-600 font-semibold mb-3 flex items-center gap-2">
                  <span>📊</span> Total Weighted GPA
                </p>
                <p className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {result.totalWeightedGpa.toFixed(4)}
                </p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-blue-100 hover:scale-105 transition-transform duration-300">
                <p className="text-gray-600 font-semibold mb-3 flex items-center gap-2">
                  <span>🎯</span> Calculated GPA
                </p>
                <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {result.calculatedGpa.toFixed(4)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {result.error && (
        <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-3xl p-8 shadow-xl animate-shake">
          <p className="text-red-700 font-semibold text-lg flex items-center gap-3">
            <span className="text-3xl">⚠️</span>
            {result.error}
          </p>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;