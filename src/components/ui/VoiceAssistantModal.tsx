import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, X } from "lucide-react";

const VoiceAssistantModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [listening, setListening] = useState(false);
  const [conversation, setConversation] = useState<string[]>([]);
  const [isSupported, setIsSupported] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      recognitionRef.current = new SpeechRecognition();
      
      // Enhanced configuration
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";
      recognitionRef.current.maxAlternatives = 1;

      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started');
        setListening(true);
        setPermissionGranted(true);
      };

      recognitionRef.current.onresult = (event: any) => {
        console.log('Speech recognition event:', event);
        
        let transcript = '';
        
        // Get the most recent result
        if (event.results && event.results.length > 0) {
          const lastResultIndex = event.results.length - 1;
          transcript = event.results[lastResultIndex][0].transcript.trim();
          console.log('Raw transcript:', transcript);
        }
        
        if (transcript && transcript.length > 0) {
          console.log('Processing transcript:', transcript);
          
          // Add user's spoken text to conversation immediately
          setConversation((prev) => {
            console.log('Adding to conversation:', transcript);
            return [...prev, `You: ${transcript}`];
          });
          
          // Generate AI response after a short delay
          setTimeout(() => {
            handleAIResponse(transcript);
          }, 800);
        } else {
          console.log('No transcript captured');
          setConversation((prev) => [...prev, `AI: I didn't catch that. Please try speaking again.`]);
        }
        
        setListening(false);
      };

      recognitionRef.current.onspeechstart = () => {
        console.log('Speech detected');
      };

      recognitionRef.current.onspeechend = () => {
        console.log('Speech ended');
      };

      recognitionRef.current.onaudiostart = () => {
        console.log('Audio capturing started');
      };

      recognitionRef.current.onaudioend = () => {
        console.log('Audio capturing ended');
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setListening(false);
        
        let errorMessage = 'Voice recognition error. ';
        
        switch (event.error) {
          case 'not-allowed':
            errorMessage += 'Please allow microphone access and try again.';
            setPermissionGranted(false);
            break;
          case 'no-speech':
            errorMessage += 'No speech was detected. Please try speaking louder.';
            break;
          case 'audio-capture':
            errorMessage += 'No microphone was found. Please check your microphone.';
            break;
          case 'network':
            errorMessage += 'Network error occurred. Please check your connection.';
            break;
          case 'aborted':
            errorMessage += 'Speech recognition was stopped.';
            break;
          default:
            errorMessage += 'Please try again.';
        }
        
        setConversation((prev) => [...prev, `AI: ${errorMessage}`]);
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    } else {
      setIsSupported(false);
    }
  }, []);

  const handleAIResponse = (userText: string) => {
    console.log('Generating AI response for:', userText);
    
    // Generate a more intelligent AI response
    const responses = [
      `I heard you say "${userText}". How can I assist you further?`,
      `You said "${userText}". What would you like to know about that?`,
      `Thanks for saying "${userText}". I'm here to help with any questions!`,
      `You mentioned "${userText}". How can I help you with this?`,
      `I understand "${userText}". What else can I do for you?`
    ];
    
    const aiResponse = responses[Math.floor(Math.random() * responses.length)];
    console.log('AI response:', aiResponse);
    
    // Add AI response to conversation immediately
    setConversation((prev) => {
      console.log('Adding AI response to conversation');
      return [...prev, `AI: ${aiResponse}`];
    });
    
    // Speak the AI response
    speakText(aiResponse);
  };

  const toggleListening = async () => {
    if (!isSupported) {
      const message = 'Speech recognition is not supported in this browser. Please use Chrome or Edge.';
      setConversation((prev) => [...prev, `AI: ${message}`]);
      speakText(message);
      return;
    }

    if (listening) {
      // Stop listening
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
          console.log('Manually stopped listening');
        } catch (error) {
          console.error('Error stopping recognition:', error);
          setListening(false);
        }
      }
    } else {
      // Start listening
      try {
        if (recognitionRef.current) {
          console.log('Attempting to start listening...');
          
          // Request microphone permission explicitly
          if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
              await navigator.mediaDevices.getUserMedia({ audio: true });
              console.log('Microphone permission granted');
              setPermissionGranted(true);
            } catch (permError) {
              console.error('Microphone permission denied:', permError);
              const message = 'Microphone access denied. Please allow microphone access and try again.';
              setConversation((prev) => [...prev, `AI: ${message}`]);
              speakText(message);
              return;
            }
          }
          
          recognitionRef.current.start();
          console.log('Speech recognition start called');
        }
      } catch (error) {
        console.error('Error starting recognition:', error);
        setListening(false);
        const message = 'Unable to start voice recognition. Please try again.';
        setConversation((prev) => [...prev, `AI: ${message}`]);
        speakText(message);
      }
    }
  };

  // Helper function to speak text
  const speakText = (text: string) => {
    speechSynthesis.cancel();
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 0.85;
      utterance.pitch = 1.1;
      utterance.volume = 0.9;
      speechSynthesis.speak(utterance);
    }, 200);
  };

  // Auto-greet only once when modal opens
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      const greetText = "Hello! I'm NOVA, your AI assistant. How can I help you today?";
      setConversation([`AI: ${greetText}`]);
      setHasGreeted(true);
      
      // Speak greeting
      speakText(greetText);
    } else if (!isOpen) {
      // Clean up when modal closes
      if (recognitionRef.current && listening) {
        recognitionRef.current.stop();
        setListening(false);
      }
      speechSynthesis.cancel();
      setConversation([]);
      setHasGreeted(false); // Reset greeting flag when modal closes
    }
  }, [isOpen]);

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
              {conversation.length === 0 ? (
                <div className="flex items-center justify-center h-full text-slate-400">
                  <p className="text-center">
                    <span className="text-cyan-400">●</span> Conversation will appear here
                    <br />
                    <span className="text-sm">Click the microphone to start talking</span>
                  </p>
                </div>
              ) : (
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
                        <div className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                          isUser 
                            ? 'bg-gradient-to-r from-cyan-500/90 to-purple-500/90 text-white rounded-br-md border border-cyan-400/40' 
                            : 'bg-gradient-to-r from-slate-700/90 to-slate-600/90 text-cyan-100 rounded-bl-md border border-slate-500/40'
                        } shadow-lg backdrop-blur-sm`}>
                          {!isUser && (
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
                              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">NOVA AI</span>
                            </div>
                          )}
                          <p className="text-sm leading-relaxed font-medium">{message}</p>
                          {isUser && (
                            <div className="text-xs text-cyan-200/70 mt-1 text-right">
                              Voice Input
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
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