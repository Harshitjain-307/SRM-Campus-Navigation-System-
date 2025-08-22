import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  id: string
  role: 'user' | 'assistant'
  text: string
}

type PredefinedQuestion = {
  id: string
  text: string
  category: 'directions' | 'facilities' | 'general'
}

const PREDEFINED_QUESTIONS: PredefinedQuestion[] = [
  // Directions
  { id: 'lib', text: 'How do I get to the Library?', category: 'directions' },
  { id: 'admin', text: 'Where is the Admin Block?', category: 'directions' },
  { id: 'canteen', text: 'How do I reach the Red Canteen?', category: 'directions' },
  { id: 'hostel', text: 'Where is the H Block Hostel?', category: 'directions' },
  { id: 'gblock', text: 'How do I get to G Block?', category: 'directions' },
  { id: 'stationary', text: 'Where is the Stationary Store?', category: 'directions' },
  
  // Facilities
  { id: 'parking', text: 'Where can I park my vehicle?', category: 'facilities' },
  { id: 'atm', text: 'Is there an ATM on campus?', category: 'facilities' },
  { id: 'medical', text: 'Where is the medical center?', category: 'facilities' },
  { id: 'gym', text: 'Is there a gym facility?', category: 'facilities' },
  
  // General
  { id: 'hours', text: 'What are the campus operating hours?', category: 'general' },
  { id: 'security', text: 'How do I contact campus security?', category: 'general' },
  { id: 'wifi', text: 'How do I connect to campus WiFi?', category: 'general' },
  { id: 'events', text: 'Where can I find information about campus events?', category: 'general' },
]

const RESPONSES: Record<string, string> = {
  // Directions
  'lib': 'The Library is located in the Academic Block, 2nd floor. From the main entrance, go straight past the Admin Block, turn right at the fountain, and it\'s the large building on your left.',
  'admin': 'The Admin Block is the first major building you\'ll see when entering campus. It\'s located straight ahead from the main gate, about 200 meters down the main path.',
  'canteen': 'The Red Canteen is located near the student center. From the Admin Block, walk towards the G Block, then turn left at the intersection. The canteen will be on your right.',
  'hostel': 'H Block Hostel is located in the residential area. From the main gate, take the left path after the Admin Block, continue for about 300 meters, and you\'ll see the hostel buildings on your right.',
  'gblock': 'G Block is the main academic building. From the Admin Block, walk straight down the central path for about 150 meters. It\'s the large building with the clock tower.',
  'stationary': 'The Stationary Store is located near the student center, next to the Red Canteen. From the Admin Block, follow the path towards G Block and turn left at the first intersection.',
  
  // Facilities
  'parking': 'There are two main parking areas: one near the main gate (visitor parking) and one behind the Admin Block (student parking). Both are clearly marked with signs.',
  'atm': 'Yes, there are two ATMs on campus: one in the Admin Block lobby and another near the Red Canteen. Both accept major bank cards.',
  'medical': 'The medical center is located in the Admin Block, ground floor, room 101. It\'s open from 8 AM to 6 PM on weekdays.',
  'gym': 'The campus gym is located in the sports complex behind G Block. It\'s open from 6 AM to 10 PM daily. You\'ll need your student ID to access it.',
  
  // General
  'hours': 'Campus is open 24/7 for students with valid IDs. Admin offices are open Monday to Friday, 8 AM to 6 PM. Academic buildings are open from 7 AM to 9 PM.',
  'security': 'Campus security can be reached at extension 100 from any campus phone, or call the main security office at +91-XXX-XXXXXXX. Emergency response is available 24/7.',
  'wifi': 'Connect to "SRM_Student" network using your student ID and password. If you have issues, visit the IT help desk in the Admin Block, room 205.',
  'events': 'Check the notice boards in the Admin Block lobby, visit the student affairs office, or check the campus app for upcoming events and activities.',
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      role: 'assistant',
      text: 'Hi! I\'m your Campus AI Assistant. I can help you with directions, facilities, and general campus information. Ask me anything or choose from the suggested questions below!',
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)

  const getResponse = (userInput: string): { text: string; showSuggestions: boolean } => {
    const inputLower = userInput.toLowerCase().trim()

    // Handle greetings and open suggestions dropdown
    const isGreeting = /(\bhi\b|\bhello\b|\bhey\b|\bgood\s*(morning|afternoon|evening)\b|\bnamaste\b|\bhola\b)/i.test(inputLower)
    if (isGreeting) {
      return {
        text: "Hello! What can I help you with? Here are some common questions:",
        showSuggestions: true,
      }
    }
    
    // Check if input matches any predefined question or keywords
    for (const [key, response] of Object.entries(RESPONSES)) {
      const question = PREDEFINED_QUESTIONS.find(q => q.id === key)
      if (question) {
        const questionWords = question.text.toLowerCase().split(' ')
        const inputWords = inputLower.split(' ')
        
        // Check if any key words match
        const hasMatch = questionWords.some(word => 
          word.length > 3 && inputWords.some(inputWord => 
            inputWord.includes(word) || word.includes(inputWord)
          )
        )
        
        if (hasMatch) {
          return { text: response, showSuggestions: false }
        }
      }
    }
    
    // Check for common variations and misspellings
    if (inputLower.includes('library') || inputLower.includes('libraray') || inputLower.includes('lib')) {
      return { text: RESPONSES.lib, showSuggestions: false }
    }
    if (inputLower.includes('cafeteria') || inputLower.includes('canteen') || inputLower.includes('food')) {
      return { text: RESPONSES.canteen, showSuggestions: false }
    }
    if (inputLower.includes('class') || inputLower.includes('lecture') || inputLower.includes('room')) {
      return { text: RESPONSES.gblock, showSuggestions: false }
    }
    if (inputLower.includes('admin') || inputLower.includes('administration')) {
      return { text: RESPONSES.admin, showSuggestions: false }
    }
    if (inputLower.includes('hostel') || inputLower.includes('dormitory')) {
      return { text: RESPONSES.hostel, showSuggestions: false }
    }
    
    // If no match found, return the default response
    return {
      text: `I'm sorry, I don't have specific information about "${userInput}". I can help you with campus directions, facilities, and general information. Please ask about specific campus locations or choose from the suggested questions below.`,
      showSuggestions: true,
    }
  }

  const send = () => {
    if (!input.trim()) return
    
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', text: input.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setShowSuggestions(false)
    
    setTimeout(() => {
      const { text: responseText, showSuggestions: suggest } = getResponse(input.trim())
      const reply: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: responseText,
      }
      setMessages((prev) => [...prev, reply])
      setTyping(false)
      
      // Show suggestions if requested by the response logic (greetings or fallback)
      setShowSuggestions(suggest)
    }, 900)
  }

  const handleQuestionSelect = (question: PredefinedQuestion) => {
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', text: question.text }
    setMessages((prev) => [...prev, userMsg])
    setTyping(true)
    setShowSuggestions(false)
    
    setTimeout(() => {
      const reply: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: RESPONSES[question.id] || 'I apologize, but I don\'t have information about that question.',
      }
      setMessages((prev) => [...prev, reply])
      setTyping(false)
    }, 900)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send()
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <div className="glass flex h-[600px] flex-col rounded-xl">
        <div className="border-b border-white/10 px-4 py-3 text-sm text-slate-300">Campus AI Assistant</div>
        
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                  m.role === 'user'
                    ? 'ml-auto bg-brand-500 text-white'
                    : 'bg-white/5 text-slate-200'
                }`}
              >
                {m.text}
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {typing && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-1 rounded-2xl bg-white/5 px-3 py-2 text-xs text-slate-300"
              >
                <TypingDots />
                AI is typing
              </motion.div>
            )}
          </AnimatePresence>

          {/* Suggested Questions Dropdown */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-slate-800/60 backdrop-blur-sm rounded-xl border border-white/10 p-4"
              >
                <h3 className="text-sm font-medium text-white mb-3">Suggested Questions:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {PREDEFINED_QUESTIONS.map((question) => (
                    <button
                      key={question.id}
                      onClick={() => handleQuestionSelect(question)}
                      className="text-left p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700/80 border border-white/10 hover:border-brand-500/30 transition-all text-xs text-slate-200 hover:text-white"
                    >
                      {question.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="border-t border-white/10 p-3">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask for directions, facilities, or campus info..."
              className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm outline-none ring-brand-500/40 focus:ring-2"
            />
            <button onClick={send} className="rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium hover:bg-brand-400">
              Send
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function TypingDots() {
  return (
    <div className="flex gap-1">
      <motion.div
        className="h-1.5 w-1.5 rounded-full bg-slate-400"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
      />
      <motion.div
        className="h-1.5 w-1.5 rounded-full bg-slate-400"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
      />
      <motion.div
        className="h-1.5 w-1.5 rounded-full bg-slate-400"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
      />
    </div>
  )
}



