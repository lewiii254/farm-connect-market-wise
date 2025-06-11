
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlayCircle, Clock, Users, Star, CheckCircle, BookOpen, Award } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorImage: string;
  duration: string;
  students: number;
  rating: number;
  level: string;
  category: string;
  price?: number;
  isPaid: boolean;
  isEnrolled?: boolean;
  progress?: number;
  completedLessons?: number;
  totalLessons?: number;
}

interface InteractiveCourseCardProps {
  course: Course;
}

export const InteractiveCourseCard = ({ course }: InteractiveCourseCardProps) => {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(course.isEnrolled || false);

  const handleEnroll = async () => {
    if (enrolled) return;
    
    setIsEnrolling(true);
    
    // Simulate enrollment process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setEnrolled(true);
    setIsEnrolling(false);
    
    toast({
      title: "Successfully Enrolled!",
      description: `You're now enrolled in "${course.title}". Start learning today!`,
    });
  };

  const startCourse = () => {
    toast({
      title: "Course Started",
      description: `Welcome to "${course.title}". Let's begin your learning journey!`,
    });
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 relative overflow-hidden">
      {/* Course Level Badge */}
      <div className="absolute top-4 right-4 z-10">
        <Badge 
          variant="secondary" 
          className={`${
            course.level === 'Beginner' ? 'bg-green-100 text-green-800' :
            course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}
        >
          {course.level}
        </Badge>
      </div>

      {/* Course Image/Thumbnail */}
      <div className="h-32 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
        <BookOpen className="h-12 w-12 text-green-600" />
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">{course.category}</Badge>
          {course.isPaid && (
            <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
              Premium
            </Badge>
          )}
          {enrolled && (
            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
              Enrolled
            </Badge>
          )}
        </div>
        
        <CardTitle className="text-lg leading-tight pr-16">{course.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">{course.description}</CardDescription>
        
        {/* Instructor Info */}
        <div className="flex items-center gap-2 pt-2">
          <Avatar className="w-6 h-6">
            <AvatarImage src={course.instructorImage} />
            <AvatarFallback>{course.instructor[0]}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600">{course.instructor}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Course Stats */}
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

        {/* Progress Bar (if enrolled) */}
        {enrolled && course.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{Math.round(course.progress)}%</span>
            </div>
            <Progress value={course.progress} className="h-2" />
            <div className="text-xs text-gray-500">
              {course.completedLessons}/{course.totalLessons} lessons completed
            </div>
          </div>
        )}

        {/* Price (if paid course) */}
        {course.isPaid && course.price && (
          <div className="text-lg font-bold text-green-600">
            KSh {course.price.toLocaleString()}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2">
          {!enrolled ? (
            <Button 
              onClick={handleEnroll}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isEnrolling}
            >
              {isEnrolling ? (
                'Enrolling...'
              ) : (
                <>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  {course.isPaid ? 'Purchase Course' : 'Enroll Free'}
                </>
              )}
            </Button>
          ) : course.progress === 100 ? (
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-green-600 font-medium">
                <CheckCircle className="h-4 w-4" />
                Course Completed!
              </div>
              <Button size="sm" variant="outline" className="w-full">
                <Award className="h-4 w-4 mr-2" />
                View Certificate
              </Button>
            </div>
          ) : (
            <Button 
              onClick={startCourse}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              Continue Learning
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
