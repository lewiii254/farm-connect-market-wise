
import React from 'react';
import { TrendingUp, MapPin, Users, Bell, Package, CreditCard, Truck, MessageCircle, Shield, Clock } from 'lucide-react';

const Features = () => {
  const coreFeatures = [
    {
      name: 'Real-time Market Prices',
      description: 'Get up-to-date pricing information for maize, beans, potatoes and other crops across Kenyan markets.',
      icon: TrendingUp,
      category: 'Market Intelligence'
    },
    {
      name: 'Smart Marketplace',
      description: 'Connect directly with verified buyers and sellers. List your crops and find the best deals in your area.',
      icon: Package,
      category: 'Trading'
    },
    {
      name: 'Farmer Community',
      description: 'Join a network of farmers to share knowledge, discuss challenges, and collaborate on market access.',
      icon: Users,
      category: 'Community'
    },
    {
      name: 'Supply Chain Tracking',
      description: 'Monitor your produce from farm to market, ensuring quality and transparency throughout the journey.',
      icon: Truck,
      category: 'Logistics'
    }
  ];

  const additionalFeatures = [
    {
      name: 'M-Pesa Price Alerts',
      description: 'Receive SMS notifications when market prices reach your target selling points.',
      icon: Bell,
    },
    {
      name: 'Location-based Markets',
      description: 'Find the closest markets and buyers in your county with smart mapping.',
      icon: MapPin,
    },
    {
      name: 'Financial Services',
      description: 'Access agricultural loans, insurance, and mobile money integration.',
      icon: CreditCard,
    },
    {
      name: 'Expert Support',
      description: 'Get advice from agricultural experts and successful farmers.',
      icon: MessageCircle,
    },
    {
      name: 'Quality Certification',
      description: 'Get your produce certified for organic and quality standards.',
      icon: Shield,
    },
    {
      name: '24/7 Support',
      description: 'Round-the-clock customer support to help you succeed.',
      icon: Clock,
    }
  ];

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Platform Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed in farming
          </p>
          <p className="mt-4 max-w-3xl text-xl text-gray-500 mx-auto">
            Our comprehensive platform provides all the tools and connections Kenyan farmers need to maximize their profits and grow their businesses.
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Core Features</h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {coreFeatures.map((feature) => (
              <div key={feature.name} className="relative group">
                <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-100 hover:border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 text-white group-hover:scale-110 transition-transform duration-200">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {feature.category}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Additional Benefits</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {additionalFeatures.map((feature) => (
              <div key={feature.name} className="flex items-start space-x-4 bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-100 text-green-600 flex-shrink-0">
                  <feature.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{feature.name}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to transform your farming business?</h3>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Join thousands of Kenyan farmers who are already using FarmConnect to increase their profits and build sustainable farming businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                Start Free Trial
              </button>
              <button className="border border-green-300 text-white font-semibold px-8 py-3 rounded-lg hover:bg-green-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
