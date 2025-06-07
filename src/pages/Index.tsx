
import React from 'react';
import Navigation from '@/components/Navigation';
import EnhancedHero from '@/components/EnhancedHero';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import FloatingChat from '@/components/FloatingChat';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      {/* Add padding-top to account for fixed navigation */}
      <div className="pt-16">
        <EnhancedHero />
        <Features />
        <Stats />
        <FloatingChat />
      </div>
    </div>
  );
};

export default Index;
