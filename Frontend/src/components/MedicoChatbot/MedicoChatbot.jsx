import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './MedicoChatbot.css';

const MedicoChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: 'Hello! I\'m your Medico-Pharma Assistant. How can I help you today?',
      options: [
        'Verify Medicine',
        'File Complaint',
        'Find Testing Lab',
        'Check Medicine Info',
        'Customer Support'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample data - replace with API calls in production
  const localLabs = [
    { name: 'City Diagnostic Center', address: '123 Health St, 3km away', contact: '080-12345678' },
    { name: 'MediTest Labs', address: '456 Pharma Rd, 5km away', contact: '080-87654321' },
    { name: 'SafeLife Laboratories', address: '789 Care Ave, 7km away', contact: '080-11223344' }
  ];

  const supportContacts = {
    complaints: { phone: '1800-123-COMPLAINT', email: 'complaints@medicopharma.com' },
    general: { phone: '1800-123-SUPPORT', email: 'support@medicopharma.com' },
    emergency: { phone: '1800-123-EMERGENCY', email: 'emergency@medicopharma.com' }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // In production, replace with actual API call
      // const response = await axios.post('/api/medico-chat', { message: input });
      // const botResponse = processResponse(response.data);
      
      // Mock processing for demonstration
      setTimeout(() => {
        const botResponse = generateBotResponse(input);
        setMessages(prev => [...prev, botResponse]);
        setLoading(false);
      }, 800);
    } catch (error) {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Sorry, I encountered an error. Please try again later.' 
      }]);
      setLoading(false);
    }
  };

  const handleQuickOption = (option) => {
    setInput(option);
    // Auto-send when clicking quick options
    const userMessage = { sender: 'user', text: option };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    setTimeout(() => {
      const botResponse = generateBotResponse(option);
      setMessages(prev => [...prev, botResponse]);
      setLoading(false);
    }, 500);
  };

  const generateBotResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Medicine Verification
    if (input.includes('verify') || input.includes('check') || input.includes('authentic')) {
      const medicineId = extractMedicineId(userInput);
      if (medicineId) {
        return {
          sender: 'bot',
          text: `✅ Medicine with ID ${medicineId} is verified and authentic.\n\nManufacturer: SafePharma Inc.\nBatch: B2023-05-001\nExpiry: 2025-05-14`,
          options: ['Verify another medicine', 'Find testing lab', 'File complaint']
        };
      }
      return {
        sender: 'bot',
        text: 'Please provide the Medicine ID or scan the QR code for verification. You can find the ID on the medicine packaging.',
        options: ['How to find Medicine ID?', 'I want to scan QR code']
      };
    }
    
    // Complaint Handling
    else if (input.includes('complaint') || input.includes('issue') || input.includes('problem')) {
      return {
        sender: 'bot',
        text: `For complaints, please contact:\n📞 ${supportContacts.complaints.phone}\n✉️ ${supportContacts.complaints.email}\n\nOr provide details of your complaint and we'll assist you.`,
        options: ['Call now', 'Email now', 'Describe my complaint']
      };
    }
    
    // Lab Finding
    else if (input.includes('lab') || input.includes('test') || input.includes('check')) {
      const labsList = localLabs.map(lab => 
        `🏥 ${lab.name}\n📍 ${lab.address}\n📞 ${lab.contact}\n`
      ).join('\n');
      
      return {
        sender: 'bot',
        text: `Here are nearby testing labs:\n\n${labsList}\n\nWould you like directions to any of these?`,
        options: ['Directions to City Diagnostic', 'Directions to MediTest', 'Directions to SafeLife']
      };
    }
    
    // Medicine Information
    else if (input.includes('info') || input.includes('detail') || input.includes('about')) {
      const medName = extractMedicineName(userInput);
      if (medName) {
        return {
          sender: 'bot',
          text: `ℹ️ ${medName} Information:\n\nType: Prescription Medicine\nUses: For bacterial infections\nDosage: As prescribed by doctor\nSide Effects: Nausea, headache\nStorage: Below 30°C`,
          options: ['Verify this medicine', 'Find alternatives', 'Report side effect']
        };
      }
      return {
        sender: 'bot',
        text: 'Please specify which medicine you need information about.',
        options: ['Medoxin info', 'HealAll info', 'PainRelief info']
      };
    }
    
    // Support Contact
    else if (input.includes('support') || input.includes('help') || input.includes('contact')) {
      return {
        sender: 'bot',
        text: `🛎️ Customer Support Options:\n\nGeneral Support: ${supportContacts.general.phone}\nComplaints: ${supportContacts.complaints.phone}\nEmergency: ${supportContacts.emergency.phone}\n\nEmail: ${supportContacts.general.email}`,
        options: ['Call general support', 'File complaint', 'Find testing lab']
      };
    }
    
    // Default response
    return {
      sender: 'bot',
      text: 'I can help with:\n- Medicine verification\n- Finding testing labs\n- Filing complaints\n- Medicine information\n- Customer support\n\nWhat do you need help with?',
      options: [
        'Verify Medicine',
        'File Complaint',
        'Find Testing Lab',
        'Check Medicine Info',
        'Customer Support'
      ]
    };
  };

  const extractMedicineId = (text) => {
    const match = text.match(/([A-Z]{2}\d{5})|(ID\s*:\s*(\w+))|(#\s*(\w+))/i);
    return match ? (match[1] || match[3] || match[5]) : null;
  };

  const extractMedicineName = (text) => {
    const medNames = ['Medoxin', 'HealAll', 'PainRelief', 'QuickCure'];
    for (const name of medNames) {
      if (text.toLowerCase().includes(name.toLowerCase())) {
        return name;
      }
    }
    return null;
  };

  return (
    <div className={`medico-chatbot-container ${isOpen ? 'open' : ''}`}>
      <div className="medico-chatbot-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>Medico-Pharma Assistant</h3>
        <span>{isOpen ? '▼' : '▲'}</span>
      </div>
      
      {isOpen && (
        <div className="medico-chatbot-body">
          <div className="medico-messages-container">
            {messages.map((msg, index) => (
              <div key={index} className={`medico-message ${msg.sender}`}>
                <div className="medico-message-content">
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
                
                {msg.options && (
                  <div className="medico-quick-options">
                    {msg.options.map((option, i) => (
                      <button 
                        key={i} 
                        onClick={() => handleQuickOption(option)}
                        className="medico-quick-option"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {loading && (
              <div className="medico-message bot">
                <div className="medico-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="medico-input-container">
            <input
              type="text"
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
            />
            <button onClick={handleSend} disabled={loading}>
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicoChatbot;