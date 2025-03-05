import React from 'react';
import { FileText, ChevronDown, Paperclip, Camera, X, ArrowRight, MessageSquare, ChevronRight, Settings } from 'lucide-react';

const ClaudeUI = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [textareaHeight, setTextareaHeight] = React.useState('3.25rem');
  const [username, setUsername] = React.useState('');
  const [showDialog, setShowDialog] = React.useState(false);
  const [displayedWelcome, setDisplayedWelcome] = React.useState('');
  const [welcomeComplete, setWelcomeComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [textareaContent, setTextareaContent] = React.useState('');
  const [showSettings, setShowSettings] = React.useState(false);
  const [modelEndpoint, setModelEndpoint] = React.useState('');
  const [apiKey, setApiKey] = React.useState('');
  const [modelName, setModelName] = React.useState('No Model Available');
  const [isModelLoading, setIsModelLoading] = React.useState(false);
  const [availableModels, setAvailableModels] = React.useState([]);
  const [showModelMenu, setShowModelMenu] = React.useState(false);
  const [showMoreModels, setShowMoreModels] = React.useState(false);
  const modelMenuRef = React.useRef(null);
  const textareaRef = React.useRef(null);

  React.useEffect(() => {
    const savedUsername = localStorage.getItem('claudius_username');
    const savedModelEndpoint = localStorage.getItem('claudius_model_endpoint');
    const savedApiKey = localStorage.getItem('claudius_api_key');

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

    if (savedModelEndpoint) setModelEndpoint(savedModelEndpoint);
    if (savedApiKey) setApiKey(savedApiKey);
    
    if (savedModelEndpoint && savedApiKey) {
      fetchModelInfo(savedModelEndpoint, savedApiKey);
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
      
      // Save API information if provided
      if (modelEndpoint.trim()) {
        localStorage.setItem('claudius_model_endpoint', modelEndpoint.trim());
      }
      if (apiKey.trim()) {
        localStorage.setItem('claudius_api_key', apiKey.trim());
      }
      
      // Fetch model info if both endpoint and API key are provided
      if (modelEndpoint.trim() && apiKey.trim()) {
        fetchModelInfo(modelEndpoint.trim(), apiKey.trim());
      }
      
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

  const fetchModelInfo = async (endpoint, key) => {
    if (!endpoint || !key) return;
    
    setIsModelLoading(true);
    try {
      const modelsUrl = `${endpoint}/models`;
      const response = await fetch(modelsUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${key}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (data.data && data.data.length > 0) {
        setAvailableModels(data.data.map(model => model.id));
        setModelName(data.data[0].id);
      } else {
        setModelName('No Model Available');
        setAvailableModels([]);
      }
    } catch (error) {
      console.error('Error fetching model info:', error);
      setModelName('No Model Available');
      setAvailableModels([]);
    } finally {
      setIsModelLoading(false);
    }
  };

  const handleModelSelect = (model) => {
    setModelName(model);
    setShowModelMenu(false);
    setShowMoreModels(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (modelMenuRef.current && !modelMenuRef.current.contains(event.target)) {
        setShowModelMenu(false);
        setShowMoreModels(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSettingsSave = (e) => {
    e.preventDefault();

    const previousUsername = localStorage.getItem('claudius_username');
    const nameChanged = username.trim() !== previousUsername;

    if (username.trim()) {
      localStorage.setItem('claudius_username', username.trim());

      if (nameChanged) {
        setDisplayedWelcome('');
        setWelcomeComplete(false);
        setTimeout(() => {
          animateWelcomeMessage(username.trim());
        }, 100);
      }
    }

    localStorage.setItem('claudius_model_endpoint', modelEndpoint.trim());
    localStorage.setItem('claudius_api_key', apiKey.trim());

    if (modelEndpoint.trim() && apiKey.trim()) {
      fetchModelInfo(modelEndpoint.trim(), apiKey.trim());
    }

    setShowSettings(false);
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

          @keyframes fade-in {
            0% {
              opacity: 0;
              transform: scale(0.95);
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
        className={`fixed left-0 top-1 bottom-1 w-72 backdrop-blur-sm transition-transform duration-160 ease-out z-40 rounded-tr-xl rounded-br-xl flex flex-col`}
        style={{ 
          backgroundColor: 'rgba(33, 32, 32, 0.9)',
          transform: showMenu ? 'translateX(0)' : 'translateX(-100%)',
          borderRight: '0.25px solid rgba(255, 255, 255, 0.15)',
          borderTop: '0.25px solid rgba(255, 255, 255, 0.15)',
          borderBottom: '0.25px solid rgba(255, 255, 255, 0.15)'
        }}
        onMouseLeave={() => setShowMenu(false)}
      >
        <div className="flex-grow"></div>
        
        <div className="p-4 border-t border-gray-700">
          <div 
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors cursor-pointer px-2 py-1.5 rounded-md hover:bg-white/5"
            onClick={() => setShowSettings(true)}
          >
            <Settings className="w-5 h-5" />
            <span style={{ fontFamily: '__styreneA_dcab32' }}>Settings</span>
          </div>
        </div>
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
                <div className="flex items-center relative" ref={modelMenuRef}>
                  <div 
                    className="flex items-center cursor-pointer px-2 py-1 rounded-md hover:bg-[#4D4D4A] transition-all duration-200"
                    onClick={() => setShowModelMenu(!showModelMenu)}
                  >
                    <span className="mr-2" style={{ fontFamily: '__copernicus_669e4a', fontWeight: 500, color: '#F2F1EC' }}>
                      {isModelLoading ? 'Loading model...' : modelName}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>

                  {showModelMenu && availableModels.length > 0 && (
                    <div 
                      className="absolute top-full left-0 mt-1 border border-[rgba(255,255,255,0.15)] rounded-lg shadow-lg overflow-visible z-30 w-72 animate-fade-in"
                      style={{ 
                        backgroundColor: '#30302E',
                        animation: 'fade-in 0.15s ease-out forwards',
                        transformOrigin: 'top left'
                      }}
                    >
                      {availableModels.slice(0, 4).map((model, index) => (
                        <div 
                          key={index}
                          className="px-4 py-2 hover:bg-[#3D3D3A] cursor-pointer"
                          onClick={() => handleModelSelect(model)}
                        >
                          <div className="flex items-center justify-between">
                            <span 
                              className="truncate pr-2" 
                              style={{ fontFamily: '__styreneA_dcab32' }}
                              title={model}
                            >
                              {model}
                            </span>
                            <div className="w-5 flex-shrink-0 flex justify-center">
                              {model === modelName && (
                                <span className="text-orange-400">✓</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {availableModels.length > 4 && (
                        <div 
                          className="px-4 py-2 bg-[#3D3D3A] hover:bg-[#4D4D4A] cursor-pointer border-t border-[rgba(255,255,255,0.1)] flex items-center justify-between relative"
                          onClick={() => {
                            console.log("More models clicked, current state:", showMoreModels);
                            setShowMoreModels(!showMoreModels);
                          }}
                        >
                          <span style={{ fontFamily: '__styreneA_dcab32' }}>More models</span>
                          <ChevronRight className="w-4 h-4" />

                          {showMoreModels && availableModels.length > 4 && (
                            <div 
                              className="absolute left-[100%] top-[-1px] border border-[rgba(255,255,255,0.15)] rounded-lg shadow-lg z-40 w-72"
                              style={{ 
                                backgroundColor: '#30302E',
                                animation: 'fade-in 0.15s ease-out forwards',
                                maxHeight: '50vh',
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                position: 'absolute',
                                maxHeight: 'calc(100vh - 100px)',
                              }}
                            >
                              <div className="max-h-[50vh] overflow-y-auto">
                                {availableModels.slice(4).map((model, index) => (
                                  <div 
                                    key={index}
                                    className="px-4 py-2 hover:bg-[#3D3D3A] cursor-pointer"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleModelSelect(model);
                                    }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span 
                                        className="truncate pr-2"
                                        style={{ fontFamily: '__styreneA_dcab32' }}
                                        title={model}
                                      >
                                        {model}
                                      </span>
                                      <div className="w-5 flex-shrink-0 flex justify-center">
                                        {model === modelName && (
                                          <span className="text-orange-400">✓</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
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
              <div className="mb-4">
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
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-gray-300" style={{ fontFamily: '__styreneA_dcab32' }}>
                  Model Endpoint
                </label>
                <input
                  type="text"
                  value={modelEndpoint}
                  onChange={(e) => setModelEndpoint(e.target.value)}
                  className="w-full p-3 bg-[#2A2A28] border border-[rgba(255,255,255,0.15)] rounded-lg mb-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
                  style={{ fontFamily: '__styreneA_dcab32' }}
                  placeholder="https://api.example.com/v1"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-gray-300" style={{ fontFamily: '__styreneA_dcab32' }}>
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full p-3 bg-[#2A2A28] border border-[rgba(255,255,255,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
                  style={{ fontFamily: '__styreneA_dcab32' }}
                  placeholder="sk-..."
                />
              </div>

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

      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowSettings(false)}></div>
          <div className="relative z-10 bg-[#3D3D3A] p-8 rounded-2xl shadow-xl max-w-md w-full border border-[rgba(255,255,255,0.15)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-light" style={{ fontFamily: '__styreneA_dcab32' }}>
                <span className="text-orange-300 mr-2">✻</span> Settings
              </h2>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSettingsSave}>
              <div className="mb-4">
                <label className="block mb-2 text-gray-300" style={{ fontFamily: '__styreneA_dcab32' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 bg-[#2A2A28] border border-[rgba(255,255,255,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
                  style={{ fontFamily: '__styreneA_dcab32' }}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-gray-300" style={{ fontFamily: '__styreneA_dcab32' }}>
                  Model Endpoint
                </label>
                <input
                  type="text"
                  value={modelEndpoint}
                  onChange={(e) => setModelEndpoint(e.target.value)}
                  className="w-full p-3 bg-[#2A2A28] border border-[rgba(255,255,255,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
                  style={{ fontFamily: '__styreneA_dcab32' }}
                  placeholder="https://api.example.com/v1"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 text-gray-300" style={{ fontFamily: '__styreneA_dcab32' }}>
                  API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full p-3 bg-[#2A2A28] border border-[rgba(255,255,255,0.15)] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-300"
                  style={{ fontFamily: '__styreneA_dcab32' }}
                  placeholder="sk-..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                  style={{ fontFamily: '__styreneA_dcab32' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors flex items-center justify-center"
                  style={{ fontFamily: '__styreneA_dcab32' }}
                >
                  <span className="mr-2">Save</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaudeUI;