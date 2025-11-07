import { useState } from 'react';
import GpaForm from './components/GpaForm';
import ResultDisplay from './components/ResultDisplay';
import { solveGpa } from './api';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await solveGpa(data);
      setResult(response);
    } catch (err) {
      alert('Failed to solve GPA');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      {/* Animated Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 rounded-3xl mb-6 shadow-2xl transform hover:rotate-12 transition-transform duration-300">
            <span className="text-5xl">🎯</span>
          </div>
          <h1 className="text-6xl font-black mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Study Time Optimizer
            </span>
          </h1>
          <p className="text-gray-700 text-xl font-semibold max-w-2xl mx-auto">
            Achieve your target GPA with study planning and smart time allocation system developed by using Simplex Method in Optimization
          </p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto mb-12">
          <GpaForm onSubmit={handleSubmit} loading={loading} />
        </div>

        {/* Results */}
        {result && <ResultDisplay result={result} />}
      </div>
    </div>
  );
}

export default App;