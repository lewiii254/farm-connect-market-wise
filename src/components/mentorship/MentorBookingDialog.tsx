
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarIcon, Clock, User, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Mentor {
  id: number;
  name: string;
  specialization: string[];
  availability: string;
  image: string;
}

interface MentorBookingDialogProps {
  mentor: Mentor;
  trigger: React.ReactNode;
}

export const MentorBookingDialog = ({ mentor, trigger }: MentorBookingDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionType, setSessionType] = useState('');
  const [message, setMessage] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const sessionTypes = [
    { value: 'consultation', label: 'General Consultation (Free)' },
    { value: 'technical', label: 'Technical Training (KSh 500)' },
    { value: 'business', label: 'Business Planning (KSh 800)' },
    { value: 'field-visit', label: 'Farm Visit (KSh 1,200)' }
  ];

  const handleBookSession = async () => {
    if (!selectedDate || !selectedTime || !sessionType) {
      toast({
        title: "Missing Information",
        description: "Please select date, time, and session type.",
        variant: "destructive"
      });
      return;
    }

    setIsBooking(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Session Booked!",
      description: `Your ${sessionTypes.find(s => s.value === sessionType)?.label} with ${mentor.name} is confirmed for ${selectedDate.toLocaleDateString()} at ${selectedTime}.`,
    });
    
    setIsOpen(false);
    setIsBooking(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-green-600" />
            Book Session with {mentor.name}
          </DialogTitle>
          <DialogDescription>
            Schedule a mentorship session to get expert guidance on your farming journey.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Mentor Info */}
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <img 
              src={mentor.image} 
              alt={mentor.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h4 className="font-semibold">{mentor.name}</h4>
              <p className="text-sm text-gray-600">
                Specializes in: {mentor.specialization.join(', ')}
              </p>
            </div>
          </div>

          {/* Session Type */}
          <div className="space-y-2">
            <Label>Session Type</Label>
            <Select value={sessionType} onValueChange={setSessionType}>
              <SelectTrigger>
                <SelectValue placeholder="Choose session type" />
              </SelectTrigger>
              <SelectContent>
                {sessionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              Select Date
            </Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date.getDay() === 0}
              className="rounded-md border"
            />
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Select Time
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTime(time)}
                  className="text-sm"
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              Message (Optional)
            </Label>
            <Textarea
              placeholder="Tell the mentor what you'd like to discuss..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          <Button 
            onClick={handleBookSession} 
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isBooking}
          >
            {isBooking ? 'Booking Session...' : 'Confirm Booking'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
