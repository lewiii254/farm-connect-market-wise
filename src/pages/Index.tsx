import React from 'react';
import Navigation from '@/components/Navigation';
import EnhancedHero from '@/components/EnhancedHero';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import FloatingChat from '@/components/FloatingChat';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Users, TruckIcon, ArrowRight, CheckCircle, Star, Quote } from 'lucide-react';

const Index = () => {
  const testimonials = [
    {
      name: "Jane Wanjiku",
      location: "Nakuru County",
      quote: "FarmConnect helped me increase my maize sales by 40%. The direct buyer connections are amazing!",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "David Kiprotich",
      location: "Uasin Gishu",
      quote: "Real-time market prices helped me choose the best time to sell. Increased profits every season.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Mary Nyong'o",
      location: "Kisumu County",
      quote: "The community feature connected me with other farmers. We now buy seeds together for better prices.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <EnhancedHero />
      <Features />
      <Stats />
      
      {/* Keep existing enhanced features section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
              Powerful Tools for Modern Farming
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We've built specialized tools to address the unique challenges facing Kenyan farmers today
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Community Feature */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100 hover:shadow-lg transition-all duration-300 hover-scale">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Farmer Community Network</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Connect with over 1,200 farmers across Kenya. Share knowledge, discuss market trends, 
                form cooperatives for bulk purchasing, and access larger markets together. Our community 
                features include expert Q&A, seasonal farming tips, and peer-to-peer learning.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Expert agricultural advice
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Cooperative formation tools
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Knowledge sharing platform
                </li>
              </ul>
              <Link to="/community">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white group">
                  Join Community
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            {/* Supply Chain Feature */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 hover:shadow-lg transition-all duration-300 hover-scale">
              <div className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-6">
                <TruckIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Supply Chain Transparency</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Track your produce from farm to market with our advanced traceability system. 
                Ensure quality standards, maintain certifications, and provide buyers with complete 
                transparency about your farming practices and product journey.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Real-time shipment tracking
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Quality certification management
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Buyer transparency reports
                </li>
              </ul>
              <Link to="/supply-chain">
                <Button className="bg-green-600 hover:bg-green-700 text-white group">
                  Track Your Produce
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Testimonials Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
              What Farmers Are Saying
            </h2>
            <p className="text-xl text-gray-600">
              Real stories from farmers who've transformed their businesses with FarmConnect
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover-scale">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-green-600 mb-4" />
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Enhanced CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-extrabold text-white mb-6">
            Ready to Transform Your Farming Business?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
            Join over 1,200 Kenyan farmers who have increased their profits by an average of 28% 
            using FarmConnect's comprehensive agricultural platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-50 font-bold py-4 px-8 text-lg shadow-lg group">
                Start Selling Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/markets">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-600 font-bold py-4 px-8 text-lg">
                View Market Prices
              </Button>
            </Link>
          </div>
          <div className="mt-8 text-green-100">
            <p>✓ Free to join  ✓ No hidden fees  ✓ M-Pesa integration</p>
          </div>
        </div>
      </div>

      {/* Keep existing enhanced footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-green-600 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">FarmConnect Kenya</h3>
                  <div className="text-green-400 text-sm">Empowering Agriculture</div>
                </div>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Connecting Kenyan farmers with profitable markets and buyers nationwide. 
                Building sustainable agricultural communities through technology and innovation.
              </p>
              <div className="flex space-x-4">
                <div className="text-sm text-gray-400">
                  🌾 1,200+ Active Farmers
                </div>
                <div className="text-sm text-gray-400">
                  📈 28% Average Revenue Increase
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">Platform</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/markets" className="hover:text-white transition-colors">Market Prices</Link></li>
                <li><Link to="/buyers" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link to="/community" className="hover:text-white transition-colors">Community</Link></li>
                <li><Link to="/supply-chain" className="hover:text-white transition-colors">Supply Chain</Link></li>
                <li><Link to="/financial-services" className="hover:text-white transition-colors">Financial Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-green-400">Support</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms & Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; 2024 FarmConnect Kenya. All rights reserved. Built for Kenyan farmers.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Add Floating Chat Component */}
      <FloatingChat />
    </div>
  );
};

export default Index;
