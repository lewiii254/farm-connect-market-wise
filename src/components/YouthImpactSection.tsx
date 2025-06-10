
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  GraduationCap, 
  TrendingUp, 
  Smartphone,
  Target,
  Globe,
  ArrowRight,
  CheckCircle,
  Star,
  Lightbulb
} from 'lucide-react';
import { Link } from 'react-router-dom';

const YouthImpactSection = () => {
  const youthStats = [
    { icon: Users, value: '1,500+', label: 'Young Farmers Trained', color: 'text-blue-600 bg-blue-100' },
    { icon: TrendingUp, value: '250+', label: 'Youth-Led Agribusinesses', color: 'text-green-600 bg-green-100' },
    { icon: GraduationCap, value: '15', label: 'Certification Programs', color: 'text-purple-600 bg-purple-100' },
    { icon: Globe, value: '25+', label: 'Counties Reached', color: 'text-orange-600 bg-orange-100' }
  ];

  const youthOpportunities = [
    {
      title: "Digital Farm Management",
      description: "Learn modern farming techniques using technology, from soil analysis apps to drone monitoring systems.",
      icon: Smartphone,
      benefits: ["Smart irrigation systems", "Crop monitoring apps", "Market price tracking", "Digital record keeping"]
    },
    {
      title: "Agribusiness Entrepreneurship",
      description: "Start your own agricultural venture with mentorship, funding guidance, and market connections.",
      icon: Target,
      benefits: ["Business plan development", "Access to microfinance", "Mentor matching", "Market linkage support"]
    },
    {
      title: "Modern Agricultural Techniques",
      description: "Master sustainable farming practices that increase yields while protecting the environment.",
      icon: Lightbulb,
      benefits: ["Precision farming methods", "Organic certification", "Climate-smart agriculture", "Post-harvest technology"]
    }
  ];

  const successStories = [
    {
      name: "Mary Wanjiku",
      age: 24,
      location: "Nakuru County",
      story: "Increased tomato yields by 40% using precision farming techniques learned through FarmConnect",
      achievement: "Now mentors 50+ young farmers in her region"
    },
    {
      name: "James Kiprotich",
      age: 26,
      location: "Uasin Gishu County",
      story: "Started agribusiness cooperative connecting 200+ smallholder farmers to premium buyers",
      achievement: "Generated KSh 2.3M revenue in first year"
    },
    {
      name: "Grace Achieng",
      age: 23,
      location: "Kisumu County",
      story: "Pioneered sustainable fish farming using modern aquaculture techniques",
      achievement: "Employs 15 youth in her aquaculture enterprise"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-full text-blue-800 text-sm font-medium mb-6">
            <Users className="h-4 w-4 mr-2" />
            Empowering Kenya's Young Farmers
            <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Transforming Agriculture Through 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Youth Innovation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            FarmConnect Kenya is revolutionizing agriculture by empowering young farmers with digital tools, 
            modern techniques, and direct market access. Join the agricultural transformation and build a 
            sustainable future for Kenya's food security.
          </p>
        </div>

        {/* Youth Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {youthStats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className={`flex items-center justify-center w-12 h-12 rounded-xl mx-auto mb-4 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Youth Opportunities */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Opportunities for Young Farmers
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {youthOpportunities.map((opportunity, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-4">
                    <opportunity.icon className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{opportunity.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {opportunity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {opportunity.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                  <Link to="/youth-mentorship">
                    <Button className="w-full mt-6 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Young Farmer Success Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-lg text-gray-900">{story.name}</CardTitle>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">Age {story.age}</span>
                    </div>
                  </div>
                  <CardDescription className="text-green-600 font-medium">
                    {story.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4 leading-relaxed">{story.story}</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <p className="text-sm font-medium text-green-800">{story.achievement}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-12 text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Transform Agriculture?</h3>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of young farmers who are already building successful agricultural enterprises
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/youth-mentorship">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                Join Youth Program
                <Users className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/agri-education">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold">
                Explore Courses
                <GraduationCap className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouthImpactSection;
