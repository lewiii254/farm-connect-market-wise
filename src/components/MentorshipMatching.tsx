
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, MapPin, Clock, Award, MessageCircle } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const MentorshipMatching = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = ['All', 'Crop Production', 'Livestock', 'Organic Farming', 'Irrigation', 'Marketing', 'Financial Management'];

  const mentors = [
    {
      id: 1,
      name: 'Dr. John Mwangi',
      specialties: ['Crop Production', 'Irrigation'],
      experience: '25 years',
      location: 'Nakuru County',
      rating: 4.9,
      mentees: 45,
      description: 'Experienced agronomist specializing in drought-resistant crops and efficient irrigation systems.',
      languages: ['English', 'Swahili', 'Kikuyu'],
      availability: 'Weekends'
    },
    {
      id: 2,
      name: 'Mary Wanjiku',
      specialties: ['Livestock', 'Organic Farming'],
      experience: '18 years',
      location: 'Kiambu County',
      rating: 4.8,
      mentees: 32,
      description: 'Dairy farming expert with focus on organic practices and sustainable livestock management.',
      languages: ['English', 'Swahili'],
      availability: 'Evenings'
    },
    {
      id: 3,
      name: 'Peter Ochieng',
      specialties: ['Marketing', 'Financial Management'],
      experience: '15 years',
      location: 'Kisumu County',
      rating: 4.7,
      mentees: 28,
      description: 'Former agricultural cooperative manager helping farmers with market access and financial planning.',
      languages: ['English', 'Swahili', 'Luo'],
      availability: 'Weekdays'
    },
    {
      id: 4,
      name: 'Grace Mutua',
      specialties: ['Organic Farming', 'Crop Production'],
      experience: '12 years',
      location: 'Machakos County',
      rating: 4.6,
      mentees: 21,
      description: 'Organic farming advocate specializing in vegetable production and soil health management.',
      languages: ['English', 'Swahili', 'Kamba'],
      availability: 'Flexible'
    }
  ];

  const mentees = [
    {
      id: 1,
      name: 'Samuel Kiprotich',
      lookingFor: ['Crop Production', 'Irrigation'],
      experience: 'New Farmer',
      location: 'Uasin Gishu County',
      description: 'Starting my first maize farm and looking for guidance on best practices and irrigation setup.',
      goals: 'Learn sustainable farming practices'
    },
    {
      id: 2,
      name: 'Alice Nyambura',
      lookingFor: ['Livestock', 'Financial Management'],
      experience: '2 years',
      location: 'Nyeri County',
      description: 'Small-scale dairy farmer seeking advice on improving milk production and farm financial management.',
      goals: 'Increase farm profitability'
    }
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All' || mentor.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  const handleConnectMentor = (mentorName: string) => {
    toast({
      title: "Connection Request Sent",
      description: `Your request to connect with ${mentorName} has been sent. They will contact you soon.`,
    });
  };

  const handleApplyMentor = () => {
    toast({
      title: "Mentor Application",
      description: "Mentor application form coming soon! We'll review your qualifications.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Mentorship Program</CardTitle>
              <CardDescription>
                Connect experienced farmers with newcomers for knowledge sharing and guidance
              </CardDescription>
            </div>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleApplyMentor}
            >
              Become a Mentor
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search mentors by name or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <Button
                  key={specialty}
                  variant={selectedSpecialty === specialty ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={selectedSpecialty === specialty ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {specialty}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Available Mentors */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold">Available Mentors</h2>
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-green-100 text-green-800 text-lg">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{mentor.name}</h3>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm">{mentor.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{mentor.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      {mentor.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{mentor.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{mentor.experience} experience</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>{mentor.mentees} mentees</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Available: {mentor.availability}</p>
                        <p className="text-sm text-gray-500">Languages: {mentor.languages.join(', ')}</p>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => handleConnectMentor(mentor.name)}
                      >
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Looking for Mentorship */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Looking for Mentorship</h2>
          {mentees.map((mentee) => (
            <Card key={mentee.id}>
              <CardContent className="pt-6">
                <div className="flex items-start space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-800">
                      {mentee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-grow">
                    <h4 className="font-medium">{mentee.name}</h4>
                    <p className="text-sm text-gray-500 mb-2">{mentee.location}</p>
                    <p className="text-sm text-gray-600 mb-2">{mentee.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {mentee.lookingFor.map((area) => (
                        <Badge key={area} variant="outline" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>
                    
                    <p className="text-xs text-gray-500">Goal: {mentee.goals}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorshipMatching;
