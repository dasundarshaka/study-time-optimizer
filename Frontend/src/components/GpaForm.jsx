import { useState } from 'react';

const GpaForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    totalCredit: '',
    targetGpa: '',
    currentGpa: '',
    currentTotalCredit: '',
    semesterCredit: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  const fields = [
    { 
      key: 'totalCredit', 
      label: 'Total Credit Hours', 
      icon: '📚',
      color: 'from-purple-500 to-purple-600',
      placeholder: 'Enter total credit hours'
    },
    { 
      key: 'targetGpa', 
      label: 'Target GPA', 
      icon: '🎯',
      color: 'from-pink-500 to-pink-600',
      placeholder: 'Enter target GPA (e.g., 3.5)'
    },
    { 
      key: 'currentGpa', 
      label: 'Current GPA', 
      icon: '📊',
      color: 'from-blue-500 to-blue-600',
      placeholder: 'Enter current GPA'
    },
    { 
      key: 'currentTotalCredit', 
      label: 'Current Total Credits', 
      icon: '✅',
      color: 'from-green-500 to-green-600',
      placeholder: 'Enter current total credits'
    },
    { 
      key: 'semesterCredit', 
      label: 'Semester Credits', 
      icon: '📅',
      color: 'from-orange-500 to-orange-600',
      placeholder: 'Enter semester credits'
    }
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      <form onSubmit={handleSubmit} className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
            <span className="text-4xl">🎓</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Academic Information
          </h2>
          <p className="text-gray-600">Enter your details to optimize your study plan</p>
        </div>

        <div className="space-y-6">
          {fields.map(({ key, label, icon, color, placeholder }) => (
            <div key={key} className="group">
              <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center shadow-md transition-transform group-hover:scale-110 duration-200`}>
                  <span className="text-lg">{icon}</span>
                </div>
                {label}
              </label>
              <div className="relative">
                <input
                  name={key}
                  type="number"
                  step="any"
                  value={form[key]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 focus:bg-white transition-all outline-none text-gray-800 font-semibold placeholder-gray-400 hover:border-purple-300"
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          type="submit"
          disabled={loading}
          className="w-full mt-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-300 flex items-center justify-center gap-3 text-lg"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Calculating...</span>
            </>
          ) : (
            <>
              <span className="text-2xl">🚀</span>
              Calculate Optimal Study Plan
              <span className="text-2xl">✨</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default GpaForm;