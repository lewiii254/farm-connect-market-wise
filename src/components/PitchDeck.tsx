
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, TrendingUp, Users, MapPin, DollarSign, Smartphone, Target, Award, BarChart3 } from 'lucide-react';

const PitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 'problem',
      title: 'The Problem',
      icon: <Target className="h-8 w-8 text-red-500" />,
      content: `Kenya's 6 million smallholder farmers face critical challenges: limited market access, price volatility, and information gaps. Farmers often sell at 40-60% below market value due to middlemen exploitation and lack of real-time pricing data. Agricultural productivity remains low at 1.2 tons per hectare compared to global averages of 5.9 tons.`
    },
    {
      id: 'solution',
      title: 'Our Solution: FarmConnect Kenya',
      icon: <Award className="h-8 w-8 text-green-500" />,
      content: `FarmConnect Kenya is a comprehensive digital platform connecting farmers directly to markets, buyers, and essential services. We provide real-time market prices, verified buyer networks, community features, supply chain tracking, and integrated financial services—all accessible via mobile technology that farmers already use.`
    },
    {
      id: 'features',
      title: 'Platform Features',
      icon: <Smartphone className="h-8 w-8 text-blue-500" />,
      content: `• Real-time market prices from Nairobi, Mombasa, Nakuru, and 45+ markets
• Direct buyer-farmer connections with verification system
• Community platform with knowledge sharing and mentorship
• Supply chain tracking for quality assurance
• M-Pesa integrated financial services and microloans
• SMS price alerts and mobile-first design for accessibility`
    },
    {
      id: 'market',
      title: 'Market Opportunity',
      icon: <BarChart3 className="h-8 w-8 text-purple-500" />,
      content: `Kenya's agricultural sector contributes 24% to GDP ($24.5B annually). With 80% of the population engaged in agriculture and mobile penetration at 96%, the digital agriculture market presents a $2.8B opportunity. Our target: 500,000 farmers generating $50M ARR through transaction fees and premium services.`
    },
    {
      id: 'traction',
      title: 'Early Traction',
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      content: `• 1,200+ active farmers across 15 counties
• 320+ verified buyers and cooperatives
• 45+ connected markets with live pricing
• 28% average revenue increase for participating farmers
• 85% user retention rate
• Strategic partnerships with agricultural cooperatives and financial institutions`
    },
    {
      id: 'business',
      title: 'Business Model',
      icon: <DollarSign className="h-8 w-8 text-yellow-500" />,
      content: `Revenue streams: 2% transaction fee on direct sales, premium subscriptions ($5/month) for advanced features, financial services commissions (3-5%), and data insights for agribusiness partners. Projected break-even at 50,000 active users with 40% gross margins by Year 2.`
    },
    {
      id: 'impact',
      title: 'Social Impact & Vision',
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      content: `Our vision: Transform Kenya's agricultural value chain by 2030. Expected impact: 500,000 farmers earning 35% more income, 2M tons increased productivity, 100,000 jobs created in rural areas. We're building sustainable food security while empowering farming communities through technology and fair market access.`
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">FarmConnect Kenya</h1>
        <p className="text-xl text-green-600">Empowering Kenyan Farmers Through Digital Innovation</p>
      </div>

      <Card className="min-h-[500px]">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center mb-4">
            {currentSlideData.icon}
          </div>
          <CardTitle className="text-2xl font-bold">{currentSlideData.title}</CardTitle>
          <CardDescription>Slide {currentSlide + 1} of {slides.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-lg leading-relaxed whitespace-pre-line mb-8">
            {currentSlideData.content}
          </div>
          
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
            
            <Button 
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="bg-green-600 hover:bg-green-700"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">Current Users</h3>
            <p className="text-2xl font-bold text-green-600">1,200+</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">Connected Markets</h3>
            <p className="text-2xl font-bold text-blue-600">45+</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800">Revenue Growth</h3>
            <p className="text-2xl font-bold text-purple-600">28%</p>
          </div>
        </div>
        
        <p className="text-gray-600 italic">
          "Connecting Kenya's farmers to prosperity, one harvest at a time."
        </p>
      </div>
    </div>
  );
};

export default PitchDeck;
