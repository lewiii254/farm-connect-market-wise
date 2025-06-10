
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Clock, Users, Star, Lock } from 'lucide-react';
import { MpesaServicePayment } from '@/components/MpesaServiceIntegration';
import { toast } from "@/hooks/use-toast";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  price: number;
  rating: number;
  students: number;
  isPaid: boolean;
  level: string;
  topics: string[];
}

interface PaidCourseDialogProps {
  course: Course;
  trigger: React.ReactNode;
}

export const PaidCourseDialog = ({ course, trigger }: PaidCourseDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSuccessfulPayment = (transactionId: string) => {
    toast({
      title: "Course Unlocked!",
      description: `You now have full access to "${course.title}". Happy learning!`,
    });
    setIsOpen(false);
    // Here you would typically grant course access to the user
  };

  const handlePaymentError = (error: string) => {
    toast({
      title: "Payment Failed",
      description: error,
      variant: "destructive"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-green-600" />
            {course.title}
          </DialogTitle>
          <DialogDescription>
            Premium agricultural course by {course.instructor}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Course Preview */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {course.level}
              </Badge>
              <div className="text-2xl font-bold text-green-700">
                KSh {course.price.toLocaleString()}
              </div>
            </div>
            
            <p className="text-gray-700 mb-3">{course.description}</p>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-gray-500" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3 text-gray-500" />
                <span>{course.students} students</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>{course.rating}/5</span>
              </div>
            </div>
          </div>

          {/* Course Content Preview */}
          <div>
            <h4 className="font-semibold mb-2">What you'll learn:</h4>
            <ul className="space-y-1">
              {course.topics.map((topic, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* Course Benefits */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Premium Course Benefits:</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• Lifetime access to course materials</li>
              <li>• Direct Q&A sessions with instructor</li>
              <li>• Downloadable resources and guides</li>
              <li>• Certificate of completion</li>
              <li>• Access to exclusive farming community</li>
            </ul>
          </div>

          {/* Payment Section */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-gray-600">This is a premium course</span>
            </div>
            
            <MpesaServicePayment
              serviceName="Premium Course Access"
              amount={course.price}
              description={`Access to "${course.title}" by ${course.instructor}`}
              onSuccess={handleSuccessfulPayment}
              onError={handlePaymentError}
              buttonText={`Unlock Course - KSh ${course.price.toLocaleString()}`}
            />
          </div>

          <div className="text-xs text-gray-500 text-center">
            30-day money-back guarantee • Secure payment via M-Pesa
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
