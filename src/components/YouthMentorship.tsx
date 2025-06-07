
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  GraduationCap, 
  Star, 
  MapPin, 
  Clock, 
  MessageCircle,
  CheckCircle,
  UserPlus,
  Award,
  Sprout
} from 'lucide-react';

const YouthMentorship = () => {
  const [selectedMentor, setSelectedMentor] = useState(null);

  const mentors = [
    {
      id: 1,
      name: "Samuel Kiprotich",
      age: 45,
      location: "Nakuru County",
      experience: "15 years",
      specialization: ["Maize", "Beans", "Dairy Farming"],
      rating: 4.9,
      mentees: 12,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      bio: "Transformed 2-acre farm into profitable agribusiness. Expert in modern farming techniques and market access.",
      achievements: ["Best Farmer Award 2023", "Cooperative Leader", "Organic Certification"],
      availability: "Weekends"
    },
    {
      id: 2,
      name: "Grace Wanjiku",
      age: 38,
      location: "Kiambu County",
      experience: "12 years",
      specialization: ["Horticulture", "Greenhouse Farming", "Export Markets"],
      rating: 4.8,
      mentees: 8,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      bio: "Pioneered greenhouse tomato farming in the region. Helps youth access international markets.",
      achievements: ["Export Excellence Award", "Women in Agriculture Leader", "Innovation Pioneer"],
      availability: "Evenings"
    },
    {
      id: 3,
      name: "Joseph Mwangi",
      age: 42,
      location: "Meru County",
      experience: "18 years",
      specialization: ["Coffee Farming", "Value Addition", "Digital Marketing"],
      rating: 4.9,
      mentees: 15,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      bio: "Built successful coffee brand from small farm. Expert in digital marketing for agricultural products.",
      achievements: ["Coffee Excellence Award", "Digital Innovation Leader", "Youth Empowerment Champion"],
      availability: "Flexible"
    }
  ];

  const youthPrograms = [
    {
      title: "Young Farmer Starter Program",
      description: "6-month intensive mentorship for ages 18-25",
      duration: "6 months",
      participants: 45,
      nextStart: "March 2024",
      benefits: ["1-on-1 mentoring", "Seed capital access", "Market connections", "Technical training"]
    },
    {
      title: "Agri-Tech Youth Initiative",
      description: "Technology adoption training for young farmers",
      duration: "3 months",
      participants: 60,
      nextStart: "February 2024",
      benefits: ["Digital tools training", "Drone farming", "IoT for agriculture", "E-commerce setup"]
    },
    {
      title: "Youth Cooperative Development",
      description: "Building youth-led agricultural cooperatives",
      duration: "4 months",
      participants: 30,
      nextStart: "April 2024",
      benefits: ["Leadership skills", "Cooperative management", "Bulk purchasing", "Collective marketing"]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-800 text-sm font-medium mb-6">
          <GraduationCap className="h-4 w-4 mr-2" />
          Youth Empowerment Program
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Young Farmer <span className="text-green-600">Mentorship</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connecting ambitious young farmers with experienced mentors to build sustainable agricultural businesses
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { icon: Users, label: "Active Mentors", value: "150+", color: "text-blue-600 bg-blue-100" },
          { icon: Sprout, label: "Youth Mentees", value: "800+", color: "text-green-600 bg-green-100" },
          { icon: Award, label: "Success Rate", value: "92%", color: "text-purple-600 bg-purple-100" },
          { icon: CheckCircle, label: "Businesses Started", value: "240+", color: "text-orange-600 bg-orange-100" }
        ].map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="pt-6">
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl mx-auto mb-3 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Mentors */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Meet Our Expert Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-all duration-300 hover-scale">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={mentor.image} 
                    alt={mentor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {mentor.location}
                    </div>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-medium">{mentor.rating}</span>
                      <span className="text-sm text-gray-500 ml-2">({mentor.mentees} mentees)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{mentor.bio}</p>
                
                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Specializations:</div>
                  <div className="flex flex-wrap gap-1">
                    {mentor.specialization.map((spec, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Achievements:</div>
                  <ul className="space-y-1">
                    {mentor.achievements.slice(0, 2).map((achievement, idx) => (
                      <li key={idx} className="flex items-center text-xs text-gray-600">
                        <Award className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {mentor.availability}
                  </div>
                  <Button 
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setSelectedMentor(mentor)}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    Connect
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Youth Programs */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Youth Development Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {youthPrograms.map((program, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-green-600">{program.title}</CardTitle>
                <p className="text-gray-600">{program.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="text-sm font-medium">{program.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Participants:</span>
                    <span className="text-sm font-medium">{program.participants} enrolled</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Next Start:</span>
                    <span className="text-sm font-medium text-green-600">{program.nextStart}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-700 mb-2">Program Benefits:</div>
                  <ul className="space-y-1">
                    {program.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Apply Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Start Your Agricultural Journey?</h3>
        <p className="text-green-100 mb-6 max-w-2xl mx-auto">
          Join our youth mentorship program and connect with experienced farmers who will guide you to success. 
          Applications are open for the next cohort starting in March 2024.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-50">
            <GraduationCap className="h-5 w-5 mr-2" />
            Apply for Mentorship
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
            <MessageCircle className="h-5 w-5 mr-2" />
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default YouthMentorship;
