import React from 'react';
import { FileText, ChevronDown, Paperclip, Camera, X, ArrowRight, MessageSquare, ChevronRight } from 'lucide-react';

const ClaudeUI = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [textareaHeight, setTextareaHeight] = React.useState('3.25rem');
  const [username, setUsername] = React.useState('');
  const [showDialog, setShowDialog] = React.useState(false);
  const [displayedWelcome, setDisplayedWelcome] = React.useState('');
  const [welcomeComplete, setWelcomeComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [textareaContent, setTextareaContent] = React.useState('');
  const textareaRef = React.useRef(null);

  React.useEffect(() => {
    const savedUsername = localStorage.getItem('claudius_username');
    if (savedUsername) {
      setUsername(savedUsername);
      setTimeout(() => {
        animateWelcomeMessage(savedUsername);
        setIsLoading(false);
      }, 500);
    } else {
      setShowDialog(true);
      setIsLoading(false);
    }
  }, []);

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  const handleTextareaInput = (e) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    setTextareaContent(e.target.value);

    if (e.target.value.trim() === '') {
      textarea.style.height = '3.25rem';
      setTextareaHeight('3.25rem');
      return;
    }

    const scrollHeight = textarea.scrollHeight;

    textarea.style.height = 'auto';
    const newHeight = Math.min(scrollHeight, 400);

    textarea.style.height = `${newHeight}px`;
    setTextareaHeight(`${newHeight}px`);
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem('claudius_username', username.trim());
      setShowDialog(false);
      animateWelcomeMessage(username.trim());
    }
  };

  const animateWelcomeMessage = (name) => {
    const welcomeMessage = `Good ${getTimeOfDay()}, ${name || username}`;
    let index = 0;

    const interval = setInterval(() => {
      setDisplayedWelcome(welcomeMessage.substring(0, index));
      index++;

      if (index > welcomeMessage.length) {
        clearInterval(interval);
        setWelcomeComplete(true);
      }
    }, 50);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen text-white p-4 relative" style={{ backgroundColor: '#292927' }}>
      <style>
        {`
          @keyframes pop-in {
            0% {
              opacity: 0;
              transform: scale(0.6);
            }
            70% {
              transform: scale(1.1);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>

      <div className="fixed left-3 top-3 z-50 text-xl transition-colors duration-200" 
        style={{ 
          fontFamily: '__copernicus_669e4a', 
          fontWeight: 600, 
          color: showMenu ? '#F2F1EC' : '#C5C4BF'
        }}>
        Claudius
      </div>

      <div 
        className="fixed left-0 top-0 bottom-0 w-20 z-50"
        onMouseEnter={() => setShowMenu(true)}
      />

      <div 
        className={`fixed left-0 top-1 bottom-1 w-72 backdrop-blur-sm transition-transform duration-160 ease-out z-40 rounded-tr-xl rounded-br-xl`}
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
          {!isLoading && !showDialog && (
            <>
              <span className="text-orange-300 mr-2">✻</span> {displayedWelcome}
              {!welcomeComplete && <span className="animate-pulse">|</span>}
            </>
          )}
        </div>

        {!isLoading && !showDialog && (
          <>
            <div className="flex flex-col gap-1.5 pl-4 pt-2.5 pr-2.5 pb-2.5 items-stretch transition-all duration-200 relative shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/3.5%)] focus-within:shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/7.5%)] hover:border-border-200 focus-within:border-border-200 cursor-text z-10 rounded-2xl w-full max-w-[42rem] ml-5" style={{ 
              backgroundColor: '#3D3D3A',
              border: '0.25px solid rgba(255, 255, 255, 0.15)'
            }}>
              {textareaContent.trim() !== '' && (
                <button 
                  className="absolute top-3 right-3 rounded-xl p-2 transition-all duration-200 z-20 animate-pop-in"
                  style={{ 
                    backgroundColor: '#A3512B',
                    animation: 'pop-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                  }}
                >
                  <ArrowRight className="w-4 h-4 text-white transform -rotate-90" />
                </button>
              )}
              <textarea 
                ref={textareaRef}
                placeholder="How can Claudius help you today?"
                className="w-full bg-transparent resize-none outline-none p-0 m-0 mb-4 overflow-y-auto"
                style={{ 
                  fontFamily: '__styreneA_dcab32', 
                  fontWeight: 300, 
                  color: '#F5F4EF',
                  height: textareaHeight,
                  maxHeight: '400px'
                }}
                rows={1}
                value={textareaContent}
                onChange={handleTextareaInput}
                onInput={handleTextareaInput}
                onKeyDown={handleKeyDown}
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

            <div className="w-full max-w-[41rem] rounded-b-xl p-4 flex -mt-2 ml-5" style={{ 
              backgroundColor: '#242422',
              border: '0.25px solid rgba(255, 255, 255, 0.15)'
            }}>
              <div className="flex items-center">
                <Paperclip className="w-5 h-5 text-gray-400 mr-2" />
                <Camera className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-grow"></div>
            </div>
          </>
        )}
      </div>

      {!isLoading && showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>
          <div className="relative z-10 bg-[#3D3D3A] p-8 rounded-2xl shadow-xl max-w-md w-full border border-[rgba(255,255,255,0.15)]">
            <h2 className="text-3xl mb-6 font-light" style={{ fontFamily: '__styreneA_dcab32' }}>
              <span className="text-orange-300 mr-2">✻</span> Welcome to Claudius
            </h2>
            <form onSubmit={handleUsernameSubmit}>
              <label className="block mb-2 text-gray-300" style={{ fontFamily: '__styreneA_dcab32' }}>
                What's your name?
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-[#2A2A28] border border-[rgba(255,255,255,0.15)] rounded-lg mb-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
                style={{ fontFamily: '__styreneA_dcab32' }}
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center"
                disabled={!username.trim()}
              >
                <span className="mr-2" style={{ fontFamily: '__styreneA_dcab32' }}>Continue</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaudeUI;