
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, MapPin, Users, Plus } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const events = [
    {
      id: 1,
      title: 'Nakuru Agricultural Show',
      date: '2024-06-15',
      time: '9:00 AM - 5:00 PM',
      location: 'Nakuru ASK Showground',
      description: 'Annual agricultural exhibition featuring latest farming technology and livestock.',
      attendees: 250,
      type: 'Agricultural Show'
    },
    {
      id: 2,
      title: 'Coffee Farmers Training',
      date: '2024-06-20',
      time: '2:00 PM - 4:00 PM',
      location: 'Kiambu Community Center',
      description: 'Training session on modern coffee processing techniques.',
      attendees: 45,
      type: 'Training'
    },
    {
      id: 3,
      title: 'Dairy Farmers Meetup',
      date: '2024-06-25',
      time: '10:00 AM - 12:00 PM',
      location: 'Eldoret Farmers Hall',
      description: 'Monthly meetup for dairy farmers to share experiences and best practices.',
      attendees: 68,
      type: 'Meetup'
    },
    {
      id: 4,
      title: 'Organic Farming Workshop',
      date: '2024-07-02',
      time: '1:00 PM - 5:00 PM',
      location: 'Meru Agricultural Training Center',
      description: 'Hands-on workshop on organic farming methods and certification.',
      attendees: 32,
      type: 'Workshop'
    }
  ];

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date());

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'Agricultural Show': return 'bg-blue-100 text-blue-800';
      case 'Training': return 'bg-green-100 text-green-800';
      case 'Meetup': return 'bg-purple-100 text-purple-800';
      case 'Workshop': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleJoinEvent = (eventTitle: string) => {
    toast({
      title: "Event Registration",
      description: `You've registered for ${eventTitle}. Confirmation details will be sent to you.`,
    });
  };

  const handleCreateEvent = () => {
    toast({
      title: "Create Event",
      description: "Event creation functionality coming soon!",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Event Calendar
              <Button 
                size="sm" 
                className="bg-green-600 hover:bg-green-700"
                onClick={handleCreateEvent}
              >
                <Plus className="h-4 w-4 mr-1" />
                New Event
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      {/* Events List */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              Join agricultural events and farmer meetups in your area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <Badge className={getEventTypeColor(event.type)}>
                      {event.type}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{event.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-2" />
                      <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-green-600">
                      Free to attend
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleJoinEvent(event.title)}
                    >
                      Join Event
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventCalendar;
