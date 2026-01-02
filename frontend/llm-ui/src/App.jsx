import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MetricsBar from './components/MetricsBar';
import PromptBox from './components/PromptBox';
import ResponseCard from './components/ResponseCard';
import { AlertCircle } from 'lucide-react';
import { generateResponse } from './api/llmApi';

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
      // result matches the dictionary returned by main.py
      const result = await generateResponse(prompt);
      
      newResponse.response = result.data.response; // This is the 'text' from main.py
      newResponse.status = 'success';
      newResponse.latency = result.latency; 
      newResponse.tokens = result.tokens;
      newResponse.cost = result.cost;
      newResponse.model = result.model;

    } catch (error) {
      newResponse.response = "Backend Error: " + error.message;
      newResponse.status = 'error';
      newResponse.latency = 0;
      newResponse.tokens = 0;
      newResponse.cost = 0;
      newResponse.model = 'N/A';
    }

    setResponses([newResponse, ...responses]);
    
    // Update dashboard metrics
    setMetrics(prev => ({
      totalRequests: prev.totalRequests + 1,
      avgLatency: Math.floor((prev.avgLatency * prev.totalRequests + newResponse.latency) / (prev.totalRequests + 1)),
      successRate: newResponse.status === 'success' 
        ? ((prev.successRate * prev.totalRequests) + 100) / (prev.totalRequests + 1)
        : ((prev.successRate * prev.totalRequests)) / (prev.totalRequests + 1),
      // Use 4 decimals for cost since Gemini is very cheap
      totalCost: (parseFloat(prev.totalCost) + parseFloat(newResponse.cost)).toFixed(4)
    }));
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900">
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
            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-12 text-center">
              <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No requests yet. Start by testing your LLM!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;