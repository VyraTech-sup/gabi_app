import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import OnboardingPage from './pages/OnboardingPage'
import MentalRecordingChoicePage from './pages/MentalRecordingChoicePage'
import PreparationPage from './pages/PreparationPage'
import AudioPlayerPage from './pages/AudioPlayerPage'
import StoryCompletedPage from './pages/StoryCompletedPage'
import SocialAuthPage from './pages/SocialAuthPage'
import SubscriptionPage from './pages/SubscriptionPage'
import AccessGrantedPage from './pages/AccessGrantedPage'
import HomePage from './pages/HomePage'
import ProgramDetailPage from './pages/ProgramDetailPage'
import MusicPage from './pages/MusicPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 01 - Onboarding */}
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        
        {/* 02 - Inicie sua reprogramação mental */}
        <Route path="/mental-recording-choice" element={<MentalRecordingChoicePage />} />
        
        {/* 03 - Para uma melhor experiência use fone de ouvidos */}
        <Route path="/preparation" element={<PreparationPage />} />
        
        {/* 04 - Player do áudio selecionado */}
        <Route path="/audio-player" element={<AudioPlayerPage />} />
        
        {/* 05 - Parabéns por terminar */}
        <Route path="/story-completed" element={<StoryCompletedPage />} />
        
        {/* 06 - Vinculação com conta Google/Apple */}
        <Route path="/social-auth" element={<SocialAuthPage />} />
        
        {/* 07 - Cobrança e 7 dias gratuitos */}
        <Route path="/subscription" element={<SubscriptionPage />} />
        
        {/* 08 - Acesso liberado */}
        <Route path="/access-granted" element={<AccessGrantedPage />} />
        
        {/* 09 - Home com áudios */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/program/:programId" element={<ProgramDetailPage />} />
        
        {/* 10 - Aba de Músicas */}
        <Route path="/music" element={<MusicPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
