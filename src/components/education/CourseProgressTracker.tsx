
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Play, CheckCircle, Lock, Clock, Award, BookOpen } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

interface Course {
  id: string;
  title: string;
  instructor: string;
  totalLessons: number;
  completedLessons: number;
  progress: number;
  lessons: Lesson[];
}

export const CourseProgressTracker = () => {
  const [enrolledCourses] = useState<Course[]>([
    {
      id: 'organic-basics',
      title: 'Organic Farming Basics',
      instructor: 'Dr. Sarah Wanjiku',
      totalLessons: 8,
      completedLessons: 3,
      progress: 37.5,
      lessons: [
        { id: '1', title: 'Introduction to Organic Farming', duration: '15 min', completed: true, locked: false },
        { id: '2', title: 'Soil Health Fundamentals', duration: '20 min', completed: true, locked: false },
        { id: '3', title: 'Composting Techniques', duration: '25 min', completed: true, locked: false },
        { id: '4', title: 'Natural Pest Control', duration: '18 min', completed: false, locked: false },
        { id: '5', title: 'Organic Certification Process', duration: '22 min', completed: false, locked: true },
        { id: '6', title: 'Marketing Organic Produce', duration: '30 min', completed: false, locked: true },
        { id: '7', title: 'Financial Planning', duration: '25 min', completed: false, locked: true },
        { id: '8', title: 'Case Studies & Success Stories', duration: '20 min', completed: false, locked: true }
      ]
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing for Farmers',
      instructor: 'James Mwangi',
      totalLessons: 6,
      completedLessons: 1,
      progress: 16.7,
      lessons: [
        { id: '1', title: 'Social Media Basics', duration: '12 min', completed: true, locked: false },
        { id: '2', title: 'Creating Compelling Content', duration: '18 min', completed: false, locked: false },
        { id: '3', title: 'WhatsApp Business Setup', duration: '15 min', completed: false, locked: true },
        { id: '4', title: 'Online Marketplaces', duration: '20 min', completed: false, locked: true },
        { id: '5', title: 'Customer Relationship Management', duration: '25 min', completed: false, locked: true },
        { id: '6', title: 'Measuring Success', duration: '16 min', completed: false, locked: true }
      ]
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState(enrolledCourses[0]);

  const startLesson = (lessonId: string) => {
    // Simulate starting a lesson
    console.log(`Starting lesson ${lessonId}`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Learning Journey</h2>
        <p className="text-gray-600">Track your progress and continue learning</p>
      </div>

      {/* Course Selection */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {enrolledCourses.map((course) => (
          <Button
            key={course.id}
            variant={selectedCourse.id === course.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCourse(course)}
            className="whitespace-nowrap"
          >
            {course.title}
          </Button>
        ))}
      </div>

      {/* Course Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{selectedCourse.title}</CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {selectedCourse.completedLessons}/{selectedCourse.totalLessons} Complete
            </Badge>
          </div>
          <p className="text-sm text-gray-600">Instructor: {selectedCourse.instructor}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{Math.round(selectedCourse.progress)}%</span>
              </div>
              <Progress value={selectedCourse.progress} className="h-2" />
            </div>

            {selectedCourse.progress === 100 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <Award className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-green-800">Course Completed!</h4>
                <p className="text-sm text-green-700 mb-3">Congratulations on completing this course</p>
                <Button size="sm" className="bg-green-600 hover:bg-green-700">
                  Download Certificate
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lessons List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Course Lessons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {selectedCourse.lessons.map((lesson, index) => (
              <div 
                key={lesson.id} 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  lesson.completed 
                    ? 'bg-green-50 border-green-200' 
                    : lesson.locked 
                    ? 'bg-gray-50 border-gray-200' 
                    : 'bg-blue-50 border-blue-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    lesson.completed 
                      ? 'bg-green-600 text-white' 
                      : lesson.locked 
                      ? 'bg-gray-400 text-white' 
                      : 'bg-blue-600 text-white'
                  }`}>
                    {lesson.completed ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : lesson.locked ? (
                      <Lock className="h-4 w-4" />
                    ) : (
                      <span className="text-sm">{index + 1}</span>
                    )}
                  </div>
                  
                  <div>
                    <h4 className={`font-medium ${lesson.locked ? 'text-gray-500' : 'text-gray-900'}`}>
                      {lesson.title}
                    </h4>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock className="h-3 w-3" />
                      {lesson.duration}
                    </div>
                  </div>
                </div>

                <div>
                  {lesson.completed ? (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Completed
                    </Badge>
                  ) : lesson.locked ? (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                      Locked
                    </Badge>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => startLesson(lesson.id)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Start
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
            <div className="text-sm text-gray-600">Courses Enrolled</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600 mb-2">4</div>
            <div className="text-sm text-gray-600">Lessons Completed</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600 mb-2">0</div>
            <div className="text-sm text-gray-600">Certificates Earned</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
