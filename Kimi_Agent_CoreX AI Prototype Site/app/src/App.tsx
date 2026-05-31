import { ReducedMotionProvider } from './hooks/useReducedMotion';
import { LenisProvider } from './hooks/useLenis';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import PhilosophySection from './sections/PhilosophySection';
import EngineCloudSection from './sections/EngineCloudSection';
import StorageSection from './sections/StorageSection';
import CapabilitiesSection from './sections/CapabilitiesSection';
import PreLaunchSection from './sections/PreLaunchSection';

export default function App() {
  return (
    <ReducedMotionProvider>
      <LenisProvider>
        <div
          className="min-h-[100dvh]"
          style={{ background: 'var(--color-bg-primary)' }}
        >
          <Navigation />
          <main>
            <HeroSection />
            <MarqueeSection />
            <PhilosophySection />
            <EngineCloudSection />
            <StorageSection />
            <CapabilitiesSection />
            <PreLaunchSection />
          </main>
          <Footer />
        </div>
      </LenisProvider>
    </ReducedMotionProvider>
  );
}
