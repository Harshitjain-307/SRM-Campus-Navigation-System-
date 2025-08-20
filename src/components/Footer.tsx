export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
        <p>© {new Date().getFullYear()} CampusAI Hackathon Prototype</p>
        <div className="flex items-center gap-4">
          <a className="hover:text-white transition-colors" href="#" aria-label="Twitter">Twitter</a>
          <a className="hover:text-white transition-colors" href="#" aria-label="GitHub">GitHub</a>
          <a className="hover:text-white transition-colors" href="#" aria-label="Contact">Contact</a>
        </div>
      </div>
    </footer>
  )
}



