
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left animate-fade-in">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Connect Kenyan farmers with</span>{' '}
                <span className="block text-green-600 xl:inline">better markets</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Get real-time market prices from Nairobi, Mombasa, and other major markets. 
                FarmConnect Kenya bridges the gap between smallholder farmers and profitable markets.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link to="/markets">
                    <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 px-8 py-3">
                      View Market Prices
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link to="/buyers">
                    <Button variant="outline" size="lg" className="w-full px-8 py-3 border-green-600 text-green-600 hover:bg-green-50">
                      Find Buyers
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1469041797191-50ace28483c3?auto=format&fit=crop&w=1350&q=80"
          alt="Kenyan farmer working in field"
        />
      </div>
    </div>
  );
};

export default Hero;
