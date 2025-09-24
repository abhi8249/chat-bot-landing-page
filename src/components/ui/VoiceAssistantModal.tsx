import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, X } from "lucide-react";

const VoiceAssistantModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [listening, setListening] = useState(false);
  const [conversation, setConversation] = useState<string[]>([]);
  const [isSupported, setIsSupported] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      // Enhanced configuration
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onstart = () => {
        setListening(true);
        setPermissionGranted(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }

        if (finalTranscript.trim()) {
          setConversation((prev) => [...prev, `You: ${finalTranscript.trim()}`]);
          setListening(false);
          handleAIResponse(finalTranscript.trim());
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setListening(false);
        
        if (event.error === 'not-allowed') {
          setPermissionGranted(false);
          setConversation((prev) => [...prev, `AI: Please allow microphone access to use voice features.`]);
        } else if (event.error === 'no-speech') {
          setConversation((prev) => [...prev, `AI: I didn't hear anything. Please try again.`]);
        }
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    } else {
      setIsSupported(false);
    }
  }, []);

  const handleAIResponse = (userText: string) => {
    const aiResponse = `Hi! You said: ${userText}. How can I help further?`;
    setConversation((prev) => [...prev, `AI: ${aiResponse}`]);
    
    // Stop any ongoing speech before speaking
    speechSynthesis.cancel();
    
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(aiResponse);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }, 100);
  };

  const toggleListening = async () => {
    if (!isSupported) {
      setConversation((prev) => [...prev, `AI: Speech recognition is not supported in this browser.`]);
      return;
    }

    if (listening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        setListening(false);
      }
    } else {
      // Start listening
      try {
        if (recognitionRef.current) {
          setListening(true);
          recognitionRef.current.start();
        }
      } catch (error) {
        console.error('Error starting recognition:', error);
        setListening(false);
      }
    }
  };

  // Auto-greet on modal open
  useEffect(() => {
    if (isOpen) {
      const greetText = "Hi, how can I help you?";
      setConversation([`AI: ${greetText}`]);
      
      // Clear any previous speech and wait before speaking
      speechSynthesis.cancel();
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(greetText);
        utterance.lang = "en-US";
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
      }, 500);
    } else {
      // Clean up when modal closes
      if (recognitionRef.current && listening) {
        recognitionRef.current.stop();
        setListening(false);
      }
      speechSynthesis.cancel();
    }
  }, [isOpen, listening]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="relative w-full max-w-md mx-auto">
        {/* Main Modal Container */}
        <div className="relative bg-gradient-to-br from-slate-900/95 via-purple-900/20 to-cyan-900/20 backdrop-blur-xl rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 p-8">
          
          {/* Animated Border Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl animate-pulse"></div>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-red-500/20 hover:bg-red-500/40 border border-red-500/30 text-red-400 hover:text-red-300 transition-all duration-300 group"
          >
            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="relative z-10 flex flex-col items-center space-y-6">
            
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                NOVA AI Assistant
              </h2>
              <div className="h-0.5 w-24 mx-auto mt-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
            </div>

            {/* Central Microphone Button with Radar Effect */}
            <div className="relative flex items-center justify-center">
              {/* Radar Rings */}
              {listening && (
                <>
                  <div className="absolute w-48 h-48 rounded-full border-2 border-cyan-400/30 animate-ping"></div>
                  <div className="absolute w-36 h-36 rounded-full border-2 border-purple-400/40 animate-ping" style={{ animationDelay: "0.3s" }}></div>
                  <div className="absolute w-24 h-24 rounded-full border-2 border-pink-400/50 animate-ping" style={{ animationDelay: "0.6s" }}></div>
                </>
              )}
              
              {/* Main Microphone Button */}
              <button
                onClick={toggleListening}
                disabled={!isSupported}
                className={`relative w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 p-1 cursor-pointer group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  listening ? 'scale-110 shadow-2xl shadow-cyan-500/50' : 'hover:scale-105 shadow-xl shadow-purple-500/30'
                }`}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                  {/* Animated Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 ${listening ? 'animate-pulse' : ''}`}></div>
                  
                  {/* Icon */}
                  {listening ? (
                    <MicOff size={40} className="text-red-400 z-10 animate-pulse" />
                  ) : (
                    <Mic size={40} className="text-purple-400 z-10 group-hover:text-cyan-400 transition-colors duration-300" />
                  )}
                </div>
              </button>
            </div>

            {/* Status Display */}
            <div className="text-center space-y-2">
              {!isSupported ? (
                <p className="text-red-400 text-lg font-semibold">
                  Speech recognition not supported
                </p>
              ) : !permissionGranted && !listening ? (
                <p className="text-yellow-400 text-lg font-semibold">
                  Click to enable microphone
                </p>
              ) : (
                <p className={`text-xl font-semibold transition-all duration-300 ${
                  listening 
                    ? 'text-red-400 animate-pulse' 
                    : 'text-purple-300'
                }`}>
                  {listening ? "Click to stop listening" : "Tap to speak"}
                </p>
              )}
              <p className="text-sm text-slate-400">
                {isSupported 
                  ? "Works best in Chrome and Edge browsers" 
                  : "Please use Chrome or Edge for voice features"
                }
              </p>
            </div>

            {/* Audio Visualizer Bars */}
            <div className={`flex justify-center items-end space-x-1 h-12 transition-opacity duration-300 ${
              listening ? 'opacity-100' : 'opacity-40'
            }`}>
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full transition-all duration-200 ${
                    listening ? 'animate-wave' : 'h-2'
                  }`}
                  style={{ 
                    animationDelay: `${i * 0.1}s`,
                    height: listening ? `${Math.random() * 32 + 8}px` : '8px'
                  }}
                ></div>
              ))}
            </div>

            {/* Conversation Display */}
            <div className="w-full bg-black/40 backdrop-blur-md rounded-2xl border border-cyan-500/20 p-4 h-56 overflow-y-auto shadow-inner">
              <div className="space-y-3">
                {conversation.map((line, idx) => {
                  const isUser = line.startsWith("You:");
                  const message = line.replace(/^(You:|AI:)\s*/, '');
                  
                  return (
                    <div
                      key={idx}
                      className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                        isUser 
                          ? 'bg-gradient-to-r from-cyan-500/80 to-purple-500/80 text-white rounded-br-md' 
                          : 'bg-gradient-to-r from-slate-700/80 to-slate-600/80 text-cyan-100 rounded-bl-md'
                      } shadow-lg backdrop-blur-sm border ${
                        isUser ? 'border-cyan-400/30' : 'border-slate-500/30'
                      }`}>
                        {!isUser && (
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
                            <span className="text-xs font-semibold text-cyan-400">NOVA</span>
                          </div>
                        )}
                        <p className="text-sm leading-relaxed">{message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/60 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes wave {
          0%, 100% { height: 8px; }
          25% { height: 24px; }
          50% { height: 40px; }
          75% { height: 16px; }
        }
        .animate-wave { animation: wave 1.2s infinite ease-in-out; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.3; }
          33% { transform: translateY(-20px) translateX(10px) scale(1.2); opacity: 0.8; }
          66% { transform: translateY(-10px) translateX(-5px) scale(0.8); opacity: 0.5; }
        }
        .animate-float { animation: float linear infinite; }
        
        /* Scrollbar Styling */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 2px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #8b5cf6);
          border-radius: 2px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #7c3aed);
        }
      `}</style>
    </div>
  );
};

export default VoiceAssistantModal;