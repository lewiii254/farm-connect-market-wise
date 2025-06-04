
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, MapPin, Users, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const achievements = [
    { icon: Users, label: '1,200+ Farmers', value: 'Active Users' },
    { icon: TrendingUp, label: '28% Increase', value: 'Average Revenue' },
    { icon: MapPin, label: '45+ Markets', value: 'Connected' },
    { icon: Star, label: '4.8/5 Rating', value: 'User Reviews' }
  ];

  const benefits = [
    'Real-time market prices',
    'Direct buyer connections',
    'M-Pesa integration',
    'Quality certification'
  ];

  return (
    <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium mb-6">
                <CheckCircle className="h-4 w-4 mr-2" />
                Trusted by 1,200+ Kenyan Farmers
              </div>

              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block">Empowering Kenyan</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                  Farmers to Thrive
                </span>
              </h1>
              
              <p className="mt-6 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Connect directly with buyers, get real-time market prices, and increase your profits by up to 28%. 
                Join Kenya's fastest-growing agricultural marketplace.
              </p>

              {/* Benefits List */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                <Link to="/buyers">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-200">
                    Start Selling Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/markets">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto mt-3 sm:mt-0 px-8 py-4 text-lg border-2 border-green-600 text-green-600 hover:bg-green-50 transition-all duration-200">
                    View Market Prices
                  </Button>
                </Link>
              </div>

              {/* Achievement Stats */}
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
                      <achievement.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="text-lg font-bold text-gray-900">{achievement.label}</div>
                    <div className="text-sm text-gray-500">{achievement.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Hero Image */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full">
          <img
            className="h-full w-full object-cover shadow-2xl lg:rounded-l-2xl"
            src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=1350&q=80"
            alt="Kenyan farmer working in field"
          />
          {/* Overlay with floating card */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600">Today's Price</div>
                <div className="text-lg font-bold text-green-600">KSh 45/kg Maize</div>
              </div>
              <div className="flex items-center text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">+5.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
