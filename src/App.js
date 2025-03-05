import React from 'react';
import { FileText, ChevronDown, Paperclip, Camera, X, ArrowRight, MessageSquare, ChevronRight } from 'lucide-react';

const ClaudeUI = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-white p-4 relative" style={{ backgroundColor: '#292927' }}>
      <div 
        className="fixed left-0 top-0 bottom-0 w-20 z-50"
        onMouseEnter={() => setShowMenu(true)}
      />

      <div 
        className={`fixed left-0 top-1 bottom-1 w-72 backdrop-blur-sm transition-transform duration-300 ease-out z-40 rounded-tr-xl rounded-br-xl`}
        style={{ 
          backgroundColor: 'rgba(33, 32, 32, 0.9)',
          transform: showMenu ? 'translateX(0)' : 'translateX(-100%)',
          borderRight: '0.25px solid rgba(255, 255, 255, 0.15)',
          borderTop: '0.25px solid rgba(255, 255, 255, 0.15)',
          borderBottom: '0.25px solid rgba(255, 255, 255, 0.15)'
        }}
        onMouseLeave={() => setShowMenu(false)}
      >
      </div>

      <div className="fixed left-0 top-0 bottom-0 w-[30rem] z-0">
        <div className="w-full h-full relative">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 opacity-0 transition-opacity duration-200"
              style={{
                left: `${i * 3}%`,
                width: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
                transform: `scaleX(0.1)`,
                transformOrigin: 'left',
              }}
              onMouseEnter={(e) => {
                const stripes = e.currentTarget.parentElement.children;
                for (let j = 0; j <= i; j++) {
                  stripes[j].style.opacity = '1';
                }
              }}
              onMouseLeave={(e) => {
                const stripes = e.currentTarget.parentElement.children;
                for (let stripe of stripes) {
                  stripe.style.opacity = '0';
                }
              }}
            />
          ))}
        </div>
      </div>

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

      <div className="relative z-10 flex flex-col items-center w-full pl-8">
        <div className="mb-12 mt-12"></div>

        <div className="text-5xl font-light mb-12 text-center relative z-10" style={{ fontFamily: '__styreneA_dcab32', fontWeight: 300 }}>
          <span className="text-orange-300 mr-2">✻</span> Good {getTimeOfDay()}, Alpin
        </div>

        <div className="w-full max-w-[41rem] rounded-[14px] relative z-10" style={{ 
          backgroundColor: '#3D3D3A',
          border: '0.25px solid rgba(255, 255, 255, 0.15)'
        }}>
          <div className="pl-4 pr-2.5 pt-3 pb-4">
            <textarea 
              placeholder="How can Claudius help you today?"
              className="w-full bg-transparent resize-none outline-none p-0 m-0 mb-4 h-[3.25rem] placeholder-[#9D9A92]"
              style={{ fontFamily: '__styreneA_dcab32', fontWeight: 300, color: '#F5F4EF' }}
              rows={2}
            />

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="mr-2" style={{ fontFamily: '__copernicus_669e4a', fontWeight: 500, color: '#F2F1EC' }}>Meta-Llama-3.1-8B-Instruct</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
              <div className="flex items-center text-gray-400">
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[40rem] rounded-b-xl p-4 flex -mt-2" style={{ 
          backgroundColor: '#242422',
          border: '0.25px solid rgba(255, 255, 255, 0.15)'
        }}>
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