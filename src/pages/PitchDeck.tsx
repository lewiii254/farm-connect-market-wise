
import React from 'react';
import Navigation from '@/components/Navigation';
import PitchDeck from '@/components/PitchDeck';

const PitchDeckPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="py-12">
        <PitchDeck />
      </div>
    </div>
  );
};

export default PitchDeckPage;
