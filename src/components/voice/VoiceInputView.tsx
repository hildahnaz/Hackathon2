import React, { useState } from 'react';
import { Mic, StopCircle, X } from 'lucide-react';

const VoiceInputView: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [feedback, setFeedback] = useState('');
  
  const startRecording = () => {
    setIsRecording(true);
    setFeedback('Listening...');
    
    // Simulate speech recognition
    setTimeout(() => {
      setTranscript('Paid $45 for office supplies');
      setFeedback('Processing...');
      
      setTimeout(() => {
        setFeedback('Transaction detected! Added $45 expense for office supplies.');
        setIsRecording(false);
      }, 1500);
    }, 2000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    if (!transcript) {
      setFeedback('Recording stopped. No speech detected.');
    }
  };
  
  const resetRecording = () => {
    setTranscript('');
    setFeedback('');
  };

  return (
    <div className="p-4 pb-20">
      <h2 className="text-lg font-semibold mb-4">Voice Assistant</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-6 text-center">
        <p className="text-gray-600 mb-6">
          Speak clearly to add transactions by voice. Try saying:<br />
          "Paid $45 for office supplies" or<br />
          "Received $200 from today's sales"
        </p>
        
        <div className="flex justify-center mb-8">
          {isRecording ? (
            <button
              onClick={stopRecording}
              className="bg-red-500 text-white rounded-full p-6 animate-pulse"
            >
              <StopCircle className="h-10 w-10" />
            </button>
          ) : (
            <button
              onClick={startRecording}
              className="bg-teal-600 text-white rounded-full p-6 hover:bg-teal-700 transition-colors"
            >
              <Mic className="h-10 w-10" />
            </button>
          )}
        </div>
        
        {isRecording && (
          <div className="flex justify-center space-x-1 mb-4">
            <span className="w-1 h-8 bg-teal-500 rounded-full animate-[sound_0.5s_ease-in-out_infinite]"></span>
            <span className="w-1 h-12 bg-teal-500 rounded-full animate-[sound_0.5s_ease-in-out_0.1s_infinite]"></span>
            <span className="w-1 h-8 bg-teal-500 rounded-full animate-[sound_0.5s_ease-in-out_0.2s_infinite]"></span>
            <span className="w-1 h-16 bg-teal-500 rounded-full animate-[sound_0.5s_ease-in-out_0.3s_infinite]"></span>
            <span className="w-1 h-10 bg-teal-500 rounded-full animate-[sound_0.5s_ease-in-out_0.4s_infinite]"></span>
          </div>
        )}
        
        {transcript && (
          <div className="relative bg-gray-100 p-4 rounded-lg text-left mb-4">
            <button
              onClick={resetRecording}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="font-medium">{transcript}</p>
          </div>
        )}
        
        {feedback && (
          <p className={`text-sm ${feedback.includes('detected') ? 'text-green-600' : 'text-gray-600'}`}>
            {feedback}
          </p>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-sm p-4 mt-6">
        <h3 className="font-medium mb-3">Voice Command Tips</h3>
        <ul className="text-sm text-gray-600 space-y-2">
          <li>• Specify the amount clearly: "forty-five dollars" or "$45"</li>
          <li>• Mention if it's income: "received $100 from client"</li>
          <li>• Add a category: "spent $25 on groceries"</li>
          <li>• Be specific with dates: "paid $50 for internet yesterday"</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceInputView;