import React from 'react';
import Navigation from '@/components/Navigation';
import WeatherAdvisor from '@/components/WeatherAdvisor';

const WeatherInsights = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <WeatherAdvisor />
        </div>
      </div>
    </div>
  );
};

export default WeatherInsights;
