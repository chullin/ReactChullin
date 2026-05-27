
import AboutBackground from '@/components/about/AboutBackground';
import AboutHero from '@/components/about/AboutHero';
import AboutStats from '@/components/about/AboutStats';
import AboutCapabilities from '@/components/about/AboutCapabilities';
import AboutSkills from '@/components/about/AboutSkills';
import AboutTimeline from '@/components/about/AboutTimeline';
import AboutEducation from '@/components/about/AboutEducation';
import AboutCTA from '@/components/about/AboutCTA';

export default function AboutContent() {
  return (
    <div className="relative min-h-screen selection:bg-orange-500/25 overflow-x-hidden">
      {/* Background Layer */}
      <AboutBackground />

      {/* Content Layers */}
      <div className="relative z-10">
        <AboutHero />
        
        <AboutStats />

        <AboutCapabilities />

        <AboutSkills />

        <AboutTimeline />

        <AboutEducation />

        <AboutCTA />
      </div>
    </div>
  );
}
