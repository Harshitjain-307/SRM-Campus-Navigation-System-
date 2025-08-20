import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Message = {
  id: string
  role: 'user' | 'assistant'
  text: string
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      role: 'assistant',
      text: 'Hi! Tell me where you want to go, e.g., "Library" or "Cafeteria".',
    },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  const send = () => {
    if (!input.trim()) return
    const userMsg: Message = { id: crypto.randomUUID(), role: 'user', text: input.trim() }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      const reply: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        text: 'Go straight and turn left at Admin block. The destination will be on your right.',
      }
      setMessages((prev) => [...prev, reply])
      setTyping(false)
    }, 900)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') send()
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10">
      <div className="glass flex h-[560px] flex-col rounded-xl">
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
        </div>
        <div className="border-t border-white/10 p-3">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Ask for directions..."
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
    <span className="flex items-center gap-0.5 pr-1">
      <motion.span className="h-1.5 w-1.5 rounded-full bg-slate-300" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }} />
      <motion.span className="h-1.5 w-1.5 rounded-full bg-slate-300" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut', delay: 0.15 }} />
      <motion.span className="h-1.5 w-1.5 rounded-full bg-slate-300" animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut', delay: 0.3 }} />
    </span>
  )
}



