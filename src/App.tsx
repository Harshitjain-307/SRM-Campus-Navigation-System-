import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import MapPage from './pages/MapPage'
import AssistantPage from './pages/AssistantPage'

export default function App() {
  return (
    <div className="min-h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <Navbar />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}



