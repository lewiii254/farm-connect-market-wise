
import React from 'react';
import { TrendingUp, MapPin, Users, Bell, Package, CreditCard, Truck, MessageCircle, Shield, Clock, Smartphone, BarChart3, Sparkles, Cloud, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Features = () => {
  const primaryFeatures = [
    {
      name: 'Smart Marketplace',
      description: 'Connect directly with verified buyers and sellers. Advanced matching algorithms ensure you find the best deals.',
      icon: Package,
      category: 'Trading',
      color: 'from-blue-500 to-blue-600',
      link: '/buyers'
    },
    {
      name: 'Real-time Market Intelligence',
      description: 'Live pricing data across 47+ counties. Make informed decisions with comprehensive market analytics.',
      icon: TrendingUp,
      category: 'Analytics',
      color: 'from-green-500 to-green-600',
      link: '/markets'
    },
    {
      name: 'Farmer Community Network',
      description: 'Join 2,500+ farmers sharing knowledge, forming cooperatives, and accessing larger markets together.',
      icon: Users,
      category: 'Community',
      color: 'from-purple-500 to-purple-600',
      link: '/community'
    },
    {
      name: 'Supply Chain Transparency',
      description: 'Track your produce from farm to market with complete visibility and quality assurance.',
      icon: Truck,
      category: 'Logistics',
      color: 'from-orange-500 to-orange-600',
      link: '/supply-chain'
    }
  ];

  const supportingFeatures = [
    {
      name: 'M-Pesa Integration',
      description: 'Seamless mobile money transactions and instant payment processing.',
      icon: Smartphone,
    },
    {
      name: 'Price Alerts',
      description: 'SMS notifications when crops reach your target selling prices.',
      icon: Bell,
    },
    {
      name: 'Location Intelligence',
      description: 'Find the closest profitable markets using smart mapping technology.',
      icon: MapPin,
    },
    {
      name: 'Financial Services',
      description: 'Access agricultural loans, insurance, and financial planning tools.',
      icon: CreditCard,
    },
    {
      name: 'Quality Certification',
      description: 'Get your produce certified for organic and premium market standards.',
      icon: Shield,
    },
    {
      name: 'Analytics Dashboard',
      description: 'Track your performance with detailed sales and profit analytics.',
      icon: BarChart3,
    }
  ];

  const competitiveFeatures = [
    {
      name: 'AI Crop Health Diagnostics',
      description: 'Upload crop photos for instant disease detection and treatment recommendations using advanced AI.',
      icon: Sparkles,
      badge: 'NEW',
      impact: '30-40% reduction in crop loss',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Smart Weather Advisor',
      description: '7-day forecast with AI-powered farming recommendations for optimal planting and harvesting.',
      icon: Cloud,
      badge: 'NEW',
      impact: '20-25% yield increase',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Blockchain Traceability',
      description: 'Immutable supply chain records with QR codes for premium market access and export certification.',
      icon: QrCode,
      badge: 'NEW',
      impact: '40-50% price premium',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const benefits = [
    '35% average revenue increase',
    '50% faster market access',
    'Zero hidden transaction fees',
    '24/7 expert support available'
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium mb-6">
            <Package className="h-4 w-4 mr-2" />
            Complete Agricultural Platform
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-6">
            Everything You Need to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
              Succeed in Farming
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive platform provides all the tools, connections, and insights Kenyan farmers need 
            to maximize profits and build sustainable agricultural businesses.
          </p>
          
          {/* Benefits Bar */}
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                {benefit}
              </div>
            ))}
          </div>
        </div>

        {/* Competitive Advantage Features - Highlighted Section */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-800 text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4 mr-2" />
              Competitive Advantages
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Next-Generation Features That Set Us Apart
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Revolutionary AI and blockchain technologies that give FarmConnect Kenya a decisive edge in the market
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {competitiveFeatures.map((feature) => (
              <div key={feature.name} className="group relative">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 h-full border-2 border-transparent hover:border-purple-300 transform hover:-translate-y-2">
                  {/* NEW Badge */}
                  <div className="absolute -top-3 -right-3">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                      {feature.badge}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-r ${feature.color} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg mb-4`}>
                      <feature.icon className="h-8 w-8" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                    {feature.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center text-green-700 text-sm font-semibold">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      {feature.impact}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Features - Enhanced Cards */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Core Platform Features</h3>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {primaryFeatures.map((feature, index) => (
              <Link key={feature.name} to={feature.link} className="group">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 p-8 h-full border border-gray-100 hover:border-green-200 transform hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-r ${feature.color} text-white group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <feature.icon className="h-7 w-7" />
                    </div>
                    <div className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                      {feature.category}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center text-green-600 text-sm font-medium group-hover:text-green-700">
                    Explore feature
                    <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Supporting Features */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Additional Tools & Services</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supportingFeatures.map((feature, index) => (
              <div key={feature.name} className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-green-200 group">
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 text-green-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                    {feature.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Call to Action */}
        <div className="relative">
          <div className="bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
            <div className="relative z-10">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Farming Business?</h3>
                <p className="text-green-100 mb-8 max-w-2xl mx-auto text-lg">
                  Join thousands of Kenyan farmers who are already using FarmConnect to increase their profits 
                  and build sustainable farming businesses.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/buyers">
                    <Button size="lg" className="bg-white text-green-600 hover:bg-gray-50 font-bold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl">
                      Start Selling Today
                    </Button>
                  </Link>
                  <Link to="/markets">
                    <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold px-8 py-4 text-lg rounded-xl bg-transparent">
                      View Live Prices
                    </Button>
                  </Link>
                </div>
                
                {/* Trust Indicators */}
                <div className="mt-8 flex flex-wrap justify-center gap-8 text-green-100">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <span>2,500+ Active Farmers</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    <span>35% Avg. Revenue Increase</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    <span>100% Secure Platform</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
