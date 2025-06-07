
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  PlayCircle, 
  Award, 
  Users, 
  Clock, 
  TrendingUp,
  Download,
  Star,
  CheckCircle,
  Video,
  FileText,
  Headphones,
  GraduationCap,
  Smartphone,
  Lightbulb
} from 'lucide-react';

const AgriEducationHub = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const featuredCourses = [
    {
      id: 1,
      title: "Modern Farming Techniques for Beginners",
      instructor: "Dr. Sarah Muthoni",
      rating: 4.8,
      students: 1240,
      duration: "4 weeks",
      level: "Beginner",
      price: "Free",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=250&fit=crop",
      description: "Learn sustainable farming practices, soil management, and crop rotation techniques.",
      modules: 12,
      certificate: true,
      category: "Crop Production"
    },
    {
      id: 2,
      title: "Digital Marketing for Agricultural Products",
      instructor: "James Kiprotich",
      rating: 4.9,
      students: 890,
      duration: "3 weeks",
      level: "Intermediate",
      price: "KSh 2,500",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
      description: "Master online marketing strategies to sell your agricultural products effectively.",
      modules: 8,
      certificate: true,
      category: "Business & Marketing"
    },
    {
      id: 3,
      title: "Climate-Smart Agriculture",
      instructor: "Prof. Mary Wanjiku",
      rating: 4.7,
      students: 650,
      duration: "5 weeks",
      level: "Advanced",
      price: "KSh 3,000",
      image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop",
      description: "Adapt your farming practices to climate change and build resilient agricultural systems.",
      modules: 15,
      certificate: true,
      category: "Sustainability"
    }
  ];

  const learningPaths = [
    {
      title: "Young Farmer Entrepreneur",
      description: "Complete pathway from farming basics to running an agribusiness",
      courses: 6,
      duration: "12 weeks",
      level: "Beginner to Advanced",
      skills: ["Crop Production", "Business Planning", "Financial Management", "Marketing"]
    },
    {
      title: "Agri-Tech Specialist",
      description: "Master modern technology applications in agriculture",
      courses: 4,
      duration: "8 weeks",
      level: "Intermediate",
      skills: ["Precision Farming", "IoT in Agriculture", "Drone Technology", "Data Analysis"]
    },
    {
      title: "Sustainable Farming Expert",
      description: "Focus on environmentally friendly and organic farming practices",
      courses: 5,
      duration: "10 weeks",
      level: "Intermediate to Advanced",
      skills: ["Organic Farming", "Permaculture", "Water Conservation", "Soil Health"]
    }
  ];

  const skillsWorkshops = [
    {
      title: "Mobile App for Farm Management",
      date: "January 20, 2024",
      time: "2:00 PM - 4:00 PM",
      type: "Live Workshop",
      participants: 45,
      instructor: "Tech Expert",
      tools: ["Smartphone Apps", "Record Keeping", "Data Analysis"]
    },
    {
      title: "Financial Literacy for Young Farmers",
      date: "January 25, 2024",
      time: "10:00 AM - 12:00 PM",
      type: "Interactive Session",
      participants: 60,
      instructor: "Finance Specialist",
      tools: ["Budgeting", "Savings", "Investment", "Loans"]
    },
    {
      title: "Social Media Marketing Bootcamp",
      date: "February 1, 2024",
      time: "3:00 PM - 6:00 PM",
      type: "Hands-on Workshop",
      participants: 35,
      instructor: "Digital Marketer",
      tools: ["Instagram", "WhatsApp Business", "Facebook", "Content Creation"]
    }
  ];

  const resources = [
    {
      type: "PDF Guide",
      title: "Young Farmer's Startup Checklist",
      downloads: 2400,
      icon: FileText,
      size: "2.4 MB"
    },
    {
      type: "Video Series",
      title: "Season-by-Season Crop Calendar",
      downloads: 1800,
      icon: Video,
      size: "145 MB"
    },
    {
      type: "Podcast",
      title: "Success Stories: Young Kenyan Farmers",
      downloads: 3200,
      icon: Headphones,
      size: "Audio"
    },
    {
      type: "Mobile App",
      title: "FarmTracker: Free Farm Management App",
      downloads: 5600,
      icon: Smartphone,
      size: "12 MB"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-800 text-sm font-medium mb-6">
          <GraduationCap className="h-4 w-4 mr-2" />
          Agricultural Education Hub
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Learn. Grow. <span className="text-blue-600">Succeed.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive agricultural education designed specifically for young farmers in Kenya. 
          Build the skills you need to transform agriculture and create sustainable businesses.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { icon: BookOpen, label: "Courses Available", value: "120+", color: "text-blue-600 bg-blue-100" },
          { icon: Users, label: "Students Enrolled", value: "3,500+", color: "text-green-600 bg-green-100" },
          { icon: Award, label: "Certificates Issued", value: "2,100+", color: "text-purple-600 bg-purple-100" },
          { icon: TrendingUp, label: "Success Rate", value: "94%", color: "text-orange-600 bg-orange-100" }
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

      {/* Featured Courses */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Courses for Young Farmers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-all duration-300 hover-scale">
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className="absolute top-3 right-3 bg-green-600">
                  {course.category}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{course.level}</Badge>
                  <span className="text-lg font-bold text-green-600">{course.price}</span>
                </div>
                <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                <p className="text-sm text-gray-600">by {course.instructor}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    {course.rating}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">{course.modules} modules</span>
                  {course.certificate && (
                    <div className="flex items-center text-sm text-green-600">
                      <Award className="h-4 w-4 mr-1" />
                      Certificate
                    </div>
                  )}
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Start Learning
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Learning Paths */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Structured Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {learningPaths.map((path, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-lg text-blue-600">{path.title}</CardTitle>
                <p className="text-gray-600">{path.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Courses:</span>
                    <span className="text-sm font-medium">{path.courses} courses</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="text-sm font-medium">{path.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Level:</span>
                    <span className="text-sm font-medium">{path.level}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm font-medium text-gray-700 mb-2">Skills You'll Learn:</div>
                  <div className="flex flex-wrap gap-1">
                    {path.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Start Path
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Live Workshops */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Upcoming Skills Workshops</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skillsWorkshops.map((workshop, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className="bg-orange-100 text-orange-800">{workshop.type}</Badge>
                  <span className="text-sm text-gray-600">{workshop.participants} joining</span>
                </div>
                <CardTitle className="text-lg">{workshop.title}</CardTitle>
                <p className="text-sm text-gray-600">with {workshop.instructor}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {workshop.date} • {workshop.time}
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Tools & Topics:</div>
                  <div className="flex flex-wrap gap-1">
                    {workshop.tools.map((tool, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <Users className="h-4 w-4 mr-2" />
                  Register Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Free Resources */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Free Learning Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover-scale">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mx-auto mb-4">
                  <resource.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-center">{resource.title}</h3>
                <p className="text-sm text-gray-600 text-center mb-3">{resource.type}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <span>{resource.downloads.toLocaleString()} downloads</span>
                  <span>{resource.size}</span>
                </div>
                <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-1" />
                  Download
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-white text-center">
        <div className="flex items-center justify-center mb-4">
          <Lightbulb className="h-12 w-12 text-yellow-300" />
        </div>
        <h3 className="text-2xl font-bold mb-4">Start Your Agricultural Education Journey Today</h3>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Join thousands of young Kenyan farmers who are building successful agricultural businesses through 
          our comprehensive education platform. Get certified, gain practical skills, and transform your future.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-50">
            <BookOpen className="h-5 w-5 mr-2" />
            Browse All Courses
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
            <GraduationCap className="h-5 w-5 mr-2" />
            Get Started Free
          </Button>
        </div>
        <div className="mt-6 text-blue-200 text-sm">
          ✓ 30-day money-back guarantee  ✓ Mobile-friendly learning  ✓ Lifetime access to resources
        </div>
      </div>
    </div>
  );
};

export default AgriEducationHub;
