
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, MapPin, Users, Star, CheckCircle, Smartphone, Shield, Play, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const EnhancedHero = () => {
  const achievements = [
    { icon: Users, label: '2,500+', value: 'Active Farmers', color: 'text-blue-600 bg-blue-100' },
    { icon: GraduationCap, label: '1,500+', value: 'Youth Trained', color: 'text-purple-600 bg-purple-100' },
    { icon: TrendingUp, label: '35%', value: 'Avg. Revenue Boost', color: 'text-green-600 bg-green-100' },
    { icon: Star, label: '4.9/5', value: 'User Rating', color: 'text-yellow-600 bg-yellow-100' }
  ];

  const keyFeatures = [
    { icon: TrendingUp, text: 'Real-time market prices' },
    { icon: Users, text: 'Direct buyer connections' },
    { icon: Smartphone, text: 'M-Pesa integration' },
    { icon: GraduationCap, text: 'Youth mentorship programs' }
  ];

  return (
    <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 overflow-hidden min-h-screen">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 via-transparent to-blue-600/5"></div>
      
      {/* Floating Geometric Shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-lg rotate-45 opacity-40 animate-bounce"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-yellow-200 rounded-full opacity-50 animate-pulse"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center min-h-screen">
          {/* Left Content */}
          <div className="lg:col-span-6 pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              {/* Enhanced Trust Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full text-green-800 text-sm font-medium mb-8 border border-green-200 shadow-sm animate-fade-in">
                <CheckCircle className="h-4 w-4 mr-2" />
                Empowering 2,500+ Kenyan Farmers & 1,500+ Youth
                <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>

              {/* Enhanced Headline with Animation */}
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl animate-fade-in">
                <span className="block mb-2">Empower Young Farmers</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 mb-2 animate-[fade-in_0.5s_ease-out_0.2s_both]">
                  Transform Agriculture
                </span>
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-4xl text-gray-600 font-semibold animate-[fade-in_0.5s_ease-out_0.4s_both]">
                  Build Kenya's Future
                </span>
              </h1>
              
              {/* Enhanced Description */}
              <p className="mt-6 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl md:mt-5 md:text-xl leading-relaxed animate-[fade-in_0.5s_ease-out_0.6s_both]">
                Join Kenya's largest digital agriculture platform connecting young farmers with verified buyers, 
                modern farming techniques, and mentorship opportunities. <span className="font-semibold text-green-600">Start your agricultural journey today</span> 
                and be part of the digital farming revolution.
              </p>

              {/* Enhanced Features Grid */}
              <div className="mt-8 grid grid-cols-2 gap-4 animate-[fade-in_0.5s_ease-out_0.8s_both]">
                {keyFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/50 hover:shadow-md transition-all duration-300 hover-scale">
                    <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-xl mr-3">
                      <feature.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Enhanced CTA Buttons */}
              <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-[fade-in_0.5s_ease-out_1s_both]">
                <Link to="/youth-mentorship">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl font-semibold group">
                    Join Youth Program
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/agri-education">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg border-2 border-green-600 text-green-600 hover:bg-green-50 transition-all duration-300 rounded-xl font-semibold bg-white/80 backdrop-blur-sm group">
                    <GraduationCap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    Explore Courses
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex items-center justify-center sm:justify-start space-x-6 text-sm text-gray-500 animate-[fade-in_0.5s_ease-out_1.2s_both]">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  Free youth programs
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  Expert mentorship
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  M-Pesa ready
                </div>
              </div>
            </main>
          </div>

          {/* Right Content - Enhanced Hero Image */}
          <div className="lg:col-span-6">
            <div className="relative h-64 w-full sm:h-72 md:h-96 lg:h-full lg:min-h-[600px] animate-[fade-in_0.5s_ease-out_1.4s_both]">
              <img
                className="h-full w-full object-cover shadow-2xl rounded-3xl"
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1350&q=80"
                alt="Young Kenyan farmers working with modern technology in lush green fields"
              />
              
              {/* Enhanced Floating Price Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 animate-[slide-in-right_0.5s_ease-out_1.6s_both]">
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
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg animate-[slide-in-right_0.5s_ease-out_1.8s_both]">
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 text-purple-600 mr-2" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">1,500+</div>
                    <div className="text-xs text-gray-600">Youth Trained</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Achievement Stats */}
        <div className="pb-16 lg:pb-20">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 animate-[fade-in_0.5s_ease-out_2s_both]">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/50 hover:shadow-md transition-all duration-300 hover-scale">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl mx-auto mb-3 ${achievement.color}`}>
                  <achievement.icon className="h-6 w-6" />
                </div>
                <div className="text-xl font-bold text-gray-900">{achievement.label}</div>
                <div className="text-sm text-gray-600">{achievement.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedHero;
