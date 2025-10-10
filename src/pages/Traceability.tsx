import React from 'react';
import Navigation from '@/components/Navigation';
import BlockchainTraceability from '@/components/BlockchainTraceability';

const Traceability = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlockchainTraceability />
        </div>
      </div>
    </div>
  );
};

export default Traceability;
