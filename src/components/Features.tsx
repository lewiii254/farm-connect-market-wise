
import React from 'react';
import { TrendingUp, MapPin, Users, Bell } from 'lucide-react';

const Features = () => {
  const features = [
    {
      name: 'Real-time Market Prices',
      description: 'Get up-to-date pricing information for all your crops across different markets.',
      icon: TrendingUp,
    },
    {
      name: 'Find Nearby Markets',
      description: 'Locate the closest markets and buyers in your area with our smart mapping system.',
      icon: MapPin,
    },
    {
      name: 'Connect with Buyers',
      description: 'Build relationships with verified buyers who are actively seeking your produce.',
      icon: Users,
    },
    {
      name: 'Price Alerts',
      description: 'Receive notifications when market prices reach your target selling points.',
      icon: Bell,
    },
  ];

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything farmers need to succeed
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform provides comprehensive tools to help farmers make informed decisions and maximize their profits.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative hover-scale">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;
