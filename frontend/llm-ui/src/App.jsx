import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MetricsBar from './components/MetricsBar';
import PromptBox from './components/PromptBox';
import ResponseCard from './components/ResponseCard';
import { AlertCircle } from 'lucide-react';
import { callLLM } from './api/llmApi';

function App() {
  const [metrics, setMetrics] = useState({
    totalRequests: 0,
    avgLatency: 0,
    successRate: 100,
    totalCost: 0
  });
  
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSendPrompt = async (prompt) => {
    setLoading(true);
    const newResponse = {
      id: responses.length + 1,
      prompt,
      timestamp: new Date(),
    };

    try {
      const { data, latency } = await callLLM(prompt);
      newResponse.response = data.response;
      newResponse.status = 'success';
      newResponse.latency = latency;
      newResponse.tokens = data.tokens;
      newResponse.cost = data.cost;
      newResponse.model = data.model;

    } catch (error) {
      newResponse.response = error.message;
      newResponse.status = 'error';
      newResponse.latency = error.latency || 0;
      newResponse.tokens = 0;
      newResponse.cost = 0;
      newResponse.model = 'N/A';
    }

    setResponses([newResponse, ...responses]);
    setMetrics(prev => ({
      totalRequests: prev.totalRequests + 1,
      avgLatency: Math.floor((prev.avgLatency * prev.totalRequests + newResponse.latency) / (prev.totalRequests + 1)),
      successRate: newResponse.status === 'success' 
        ? ((prev.successRate * prev.totalRequests) + 100) / (prev.totalRequests + 1)
        : ((prev.successRate * prev.totalRequests)) / (prev.totalRequests + 1),
      totalCost: (parseFloat(prev.totalCost) + parseFloat(newResponse.cost)).toFixed(2)
    }));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Hero />
        <MetricsBar metrics={metrics} />
        <PromptBox onSendPrompt={handleSendPrompt} loading={loading} />
        
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
            Request History
          </h3>
          
          {responses.length > 0 ? (
            responses.map((resp) => (
              <ResponseCard key={resp.id} response={resp} />
            ))
          ) : (
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-12 text-center">
              <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No requests yet. Start by testing your LLM above!</p>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-slate-800/30 border-t border-slate-700 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center">
          <p className="text-slate-400 text-sm">
            AI Partner Catalyst © 2024 | Built for Innovation Hackathon
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;