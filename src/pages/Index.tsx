
import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Stats from '@/components/Stats';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Stats />
      
      {/* CTA Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Ready to boost your farming profits in Kenya?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Join hundreds of farmers across Kenya who trust FarmConnect to maximize their revenue
          </p>
          <div className="mt-8">
            <Link to="/dashboard">
              <Button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 text-lg">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4">FarmConnect Kenya</h3>
              <p className="text-gray-300">
                Connecting Kenyan farmers with profitable markets and buyers nationwide.
                Empowering agricultural communities through technology.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/markets" className="hover:text-white">Market Prices</Link></li>
                <li><Link to="/buyers" className="hover:text-white">Find Buyers</Link></li>
                <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link to="/" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/" className="hover:text-white">Contact Us</Link></li>
                <li><Link to="/" className="hover:text-white">Terms & Privacy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 FarmConnect Kenya. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
