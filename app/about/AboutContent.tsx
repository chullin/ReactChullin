
import AboutBackground from '@/components/about/AboutBackground';
import AboutHero from '@/components/about/AboutHero';
import AboutStats from '@/components/about/AboutStats';
import AboutCapabilities from '@/components/about/AboutCapabilities';
import AboutSkills from '@/components/about/AboutSkills';
import AboutTimeline from '@/components/about/AboutTimeline';
import AboutEducation from '@/components/about/AboutEducation';
import AboutCTA from '@/components/about/AboutCTA';
import { Divider } from '@heroui/react';

export default function AboutContent() {
  return (
    <div className="relative min-h-screen selection:bg-cyan-500/30 overflow-x-hidden">
      {/* Background Layer */}
      <AboutBackground />

      {/* Content Layers */}
      <div className="relative z-10">
        <AboutHero />
        
        <AboutStats />

        <div className="max-w-4xl mx-auto px-6">
            <Divider className="my-8 opacity-40 border-slate-200" />
        </div>

        <AboutCapabilities />

        <AboutSkills />

        <AboutTimeline />

        <AboutEducation />

        <AboutCTA />
      </div>
    </div>
  );
}
