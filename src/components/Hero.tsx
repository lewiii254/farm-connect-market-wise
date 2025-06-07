
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, MapPin, Users, Star, CheckCircle, Smartphone, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const achievements = [
    { icon: Users, label: '2,500+', value: 'Active Farmers', color: 'text-blue-600 bg-blue-100' },
    { icon: TrendingUp, label: '35%', value: 'Avg. Revenue Boost', color: 'text-green-600 bg-green-100' },
    { icon: MapPin, label: '47', value: 'Counties Served', color: 'text-purple-600 bg-purple-100' },
    { icon: Star, label: '4.9/5', value: 'User Rating', color: 'text-yellow-600 bg-yellow-100' }
  ];

  const keyFeatures = [
    { icon: TrendingUp, text: 'Real-time market prices' },
    { icon: Users, text: 'Direct buyer connections' },
    { icon: Smartphone, text: 'M-Pesa integration' },
    { icon: Shield, text: 'Quality certification' }
  ];

  return (
    <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 via-transparent to-blue-600/5"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              {/* Enhanced Trust Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-green-800 text-sm font-medium mb-6 border border-green-200 shadow-sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                Trusted by 2,500+ Kenyan Farmers
                <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              {/* Enhanced Headline */}
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block mb-2">Transform Your</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 mb-2">
                  Farming Business
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl text-gray-600 font-semibold">
                  in Kenya Today
                </span>
              </h1>
              
              {/* Enhanced Description */}
              <p className="mt-6 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 leading-relaxed">
                Connect with verified buyers, access real-time market prices, and join Kenya's fastest-growing 
                agricultural community. <span className="font-semibold text-green-600">Increase your profits by up to 35%</span> 
                with our comprehensive farming platform.
              </p>

              {/* Enhanced Features Grid */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center bg-white/70 backdrop-blur-sm rounded-lg p-3 shadow-sm border border-white/50">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg mr-3">
                      <feature.icon className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 sm:justify-center lg:justify-start">
                <Link to="/buyers">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl font-semibold">
                    Start Selling Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/markets">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg border-2 border-green-600 text-green-600 hover:bg-green-50 transition-all duration-300 rounded-xl font-semibold bg-white/80 backdrop-blur-sm">
                    View Live Prices
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  Free to join
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  No hidden fees
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  M-Pesa ready
                </div>
              </div>

              {/* Enhanced Achievement Stats */}
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/50">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl mx-auto mb-3 ${achievement.color}`}>
                      <achievement.icon className="h-6 w-6" />
                    </div>
                    <div className="text-xl font-bold text-gray-900">{achievement.label}</div>
                    <div className="text-sm text-gray-600">{achievement.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Enhanced Hero Image Section */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <div className="relative h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full">
          <img
            className="h-full w-full object-cover shadow-2xl lg:rounded-l-3xl"
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1350&q=80"
            alt="Kenyan farmers working in lush green fields"
          />
          
          {/* Enhanced Floating Price Card */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm text-gray-600 font-medium">Today's Best Price</div>
                <div className="text-2xl font-bold text-green-600">KSh 52/kg</div>
                <div className="text-sm text-gray-500">Premium Maize • Nakuru</div>
              </div>
              <div className="flex items-center text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                <TrendingUp className="h-5 w-5 mr-1" />
                <span className="text-lg font-bold">+8.3%</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Last updated: 2 mins ago</span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                Live
              </span>
            </div>
          </div>

          {/* Additional Floating Elements */}
          <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg">
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-600 mr-2" />
              <div>
                <div className="text-sm font-medium text-gray-900">2,500+</div>
                <div className="text-xs text-gray-600">Active Users</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
