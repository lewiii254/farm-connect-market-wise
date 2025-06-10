
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Clock, Users, Star, Lock, BookOpen } from 'lucide-react';
import { PaidCourseDialog } from './PaidCourseDialog';

const PaidCoursesGrid = () => {
  const paidCourses = [
    {
      id: 'modern-irrigation',
      title: 'Modern Irrigation Systems',
      description: 'Master drip irrigation, sprinkler systems, and water management for maximum crop yield',
      instructor: 'Dr. Sarah Wanjiku',
      duration: '8 hours',
      price: 2500,
      rating: 4.8,
      students: 245,
      isPaid: true,
      level: 'Intermediate',
      topics: [
        'Drip irrigation design and installation',
        'Water quality testing and treatment',
        'Automation and smart controls',
        'Cost-benefit analysis',
        'Maintenance and troubleshooting'
      ]
    },
    {
      id: 'organic-farming',
      title: 'Certified Organic Farming',
      description: 'Complete guide to organic certification, practices, and premium market access',
      instructor: 'Prof. James Mwangi',
      duration: '12 hours',
      price: 3500,
      rating: 4.9,
      students: 189,
      isPaid: true,
      level: 'Advanced',
      topics: [
        'Organic certification process',
        'Natural pest management',
        'Soil health and composting',
        'Organic market strategies',
        'Record keeping and compliance'
      ]
    },
    {
      id: 'greenhouse-management',
      title: 'Commercial Greenhouse Production',
      description: 'From setup to harvest - maximize profits with controlled environment agriculture',
      instructor: 'Eng. Mary Kilimo',
      duration: '10 hours',
      price: 4000,
      rating: 4.7,
      students: 156,
      isPaid: true,
      level: 'Advanced',
      topics: [
        'Greenhouse design and construction',
        'Climate control systems',
        'Hydroponic growing methods',
        'Crop planning and rotation',
        'Financial planning and ROI'
      ]
    },
    {
      id: 'farm-business',
      title: 'Agricultural Business Management',
      description: 'Transform your farm into a profitable business with modern management practices',
      instructor: 'CPA Peter Kamau',
      duration: '6 hours',
      price: 2000,
      rating: 4.6,
      students: 312,
      isPaid: true,
      level: 'Beginner',
      topics: [
        'Farm financial planning',
        'Market analysis and pricing',
        'Value addition strategies',
        'Agricultural insurance',
        'Digital marketing for farmers'
      ]
    },
    {
      id: 'livestock-nutrition',
      title: 'Advanced Livestock Nutrition',
      description: 'Optimize animal health and productivity through scientific nutrition management',
      instructor: 'Dr. Grace Nyaga',
      duration: '9 hours',
      price: 3000,
      rating: 4.8,
      students: 198,
      isPaid: true,
      level: 'Intermediate',
      topics: [
        'Nutritional requirements by species',
        'Feed formulation and quality',
        'Pasture management',
        'Health monitoring',
        'Cost optimization strategies'
      ]
    },
    {
      id: 'soil-science',
      title: 'Soil Science & Fertility Management',
      description: 'Deep dive into soil health, testing, and nutrient management for optimal yields',
      instructor: 'Dr. David Kiprop',
      duration: '7 hours',
      price: 2800,
      rating: 4.7,
      students: 267,
      isPaid: true,
      level: 'Intermediate',
      topics: [
        'Soil composition and structure',
        'Nutrient cycling and availability',
        'Soil testing and interpretation',
        'Fertilizer application strategies',
        'Erosion prevention methods'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Premium Agricultural Courses</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Unlock advanced farming knowledge with our expert-led premium courses. Pay securely via M-Pesa and get lifetime access.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paidCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow relative">
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                <Lock className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="text-lg pr-16">{course.title}</CardTitle>
              <CardDescription className="text-sm">{course.description}</CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-green-600">
                  KSh {course.price.toLocaleString()}
                </div>
                <Badge variant="outline">{course.level}</Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{course.students}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span>{course.rating}/5</span>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <span className="font-medium">Instructor:</span> {course.instructor}
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium">Course Topics:</div>
                <ul className="text-xs text-gray-600 space-y-1">
                  {course.topics.slice(0, 3).map((topic, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      {topic}
                    </li>
                  ))}
                  {course.topics.length > 3 && (
                    <li className="text-gray-500">+ {course.topics.length - 3} more topics</li>
                  )}
                </ul>
              </div>

              <PaidCourseDialog
                course={course}
                trigger={
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Unlock Course via M-Pesa
                  </Button>
                }
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 text-center">
        <BookOpen className="h-12 w-12 mx-auto text-green-600 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Why Choose Premium Courses?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
          <div>
            <div className="font-medium text-green-700">Expert Instructors</div>
            <div className="text-gray-600">Learn from certified agricultural professionals</div>
          </div>
          <div>
            <div className="font-medium text-green-700">Lifetime Access</div>
            <div className="text-gray-600">Access course materials anytime, anywhere</div>
          </div>
          <div>
            <div className="font-medium text-green-700">Certification</div>
            <div className="text-gray-600">Receive certificates upon completion</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaidCoursesGrid;
