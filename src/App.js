import React from 'react';
import { FileText, ChevronDown, Paperclip, Camera, X, ArrowRight, MessageSquare, ChevronRight } from 'lucide-react';

const ClaudeUI = () => {
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-white p-4 relative" style={{ backgroundColor: '#292927' }}>
      <div className="absolute inset-0 w-full h-full z-0">
        <div style={{ height: '10vh', backgroundColor: '#262624', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
        <div style={{ height: '10vh', backgroundColor: '#272725', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
        <div style={{ height: '10vh', backgroundColor: '#292927', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
        <div style={{ height: '10vh', backgroundColor: '#2A2A28', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
        <div style={{ height: '10vh', backgroundColor: '#2B2B29', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
        <div style={{ height: '10vh', backgroundColor: '#2C2C2A', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
        <div style={{ height: '10vh', backgroundColor: '#2D2D2B', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
        <div style={{ height: '10vh', backgroundColor: '#2E2E2C', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
        <div style={{ height: '10vh', backgroundColor: '#2F2F2D', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
        <div style={{ height: '10vh', backgroundColor: '#30302E', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="mb-8 mt-8"></div>

        <div className="text-4xl font-light mb-12 text-center relative z-10">
          <span className="text-orange-300 mr-2">✻</span> Good {getTimeOfDay()}, Alpin
        </div>

        <div className="w-full max-w-2xl rounded-xl relative z-10" style={{ backgroundColor: '#3D3D3A' }}>
          <div className="p-4">
            <textarea 
              placeholder="How can Claudius help you today?"
              className="w-full bg-transparent text-gray-400 resize-none outline-none p-0 m-0 mb-4"
              rows={2}
            />

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Meta-Llama-3.1-8B-Instruct</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center text-gray-400">
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-2xl rounded-b-xl p-4 flex -mt-2" style={{ backgroundColor: '#242422' }}>
          <div className="flex items-center">
            <Paperclip className="w-5 h-5 text-gray-400 mr-2" />
            <Camera className="w-5 h-5 text-gray-400" />
          </div>
          <div className="flex-grow"></div>
        </div>
      </div>
    </div>
  );
};

export default ClaudeUI;