import React from 'react';
import Navigation from '@/components/Navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PrivateMessaging from '@/components/PrivateMessaging';
import EventCalendar from '@/components/EventCalendar';
import KnowledgeBase from '@/components/KnowledgeBase';
import MentorshipMatching from '@/components/MentorshipMatching';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Users, MessageSquare, Heart, Share2, Plus, Calendar, BookOpen, UserCheck } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const Community = () => {
  const farmersGroups = [
    {
      id: 1,
      name: 'Nakuru Vegetable Farmers',
      members: 142,
      description: 'Group for vegetable farmers in Nakuru county sharing best practices.',
      image: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=100&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Kiambu Coffee Growers',
      members: 98,
      description: 'Supporting coffee farmers in Kiambu with market connections and knowledge.',
      image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=100&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Kenyan Dairy Alliance',
      members: 215,
      description: 'Networking group for dairy farmers across Kenya to share innovations.',
      image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?q=80&w=100&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Machakos Drought Resistant Crops',
      members: 76,
      description: 'Focused on drought-resistant crops suitable for Machakos county farmers.',
      image: 'https://images.unsplash.com/photo-1620857493809-cce7a0d8ec3b?q=80&w=100&auto=format&fit=crop'
    }
  ];

  const forumPosts = [
    {
      id: 1,
      author: 'Joseph Kamau',
      avatar: 'JK',
      time: '2 hours ago',
      content: "Has anyone tried the new disease-resistant maize variety from Kenya Seed Company? I'm considering planting it next season.",
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      author: 'Faith Wanjiku',
      avatar: 'FW',
      time: '5 hours ago',
      content: 'Weather alert: Expected heavy rainfall in Western Kenya next week. Secure your harvested produce and prepare drainage systems.',
      likes: 56,
      comments: 12
    },
    {
      id: 3,
      author: 'Daniel Omondi',
      avatar: 'DO',
      time: '1 day ago',
      content: 'Looking for recommendations on affordable irrigation systems suitable for small farms in Machakos. Any suggestions?',
      likes: 18,
      comments: 15
    }
  ];

  const handleJoinGroup = (groupName: string) => {
    toast({
      title: "Group Request Sent",
      description: `Your request to join ${groupName} has been sent.`,
    });
  };

  const handleLikePost = (postId: number) => {
    toast({
      title: "Post Liked",
      description: "You've liked this post.",
    });
  };

  const handleCommentPost = () => {
    toast({
      title: "Comments Feature",
      description: "Comments functionality coming soon!",
    });
  };

  const handleCreatePost = () => {
    toast({
      title: "Create Post",
      description: "Post creation functionality coming soon!",
    });
  };

  const handleSharePost = () => {
    toast({
      title: "Share Post",
      description: "Sharing functionality coming soon!",
    });
  };

  const handleCreateGroup = () => {
    toast({
      title: "Create Group",
      description: "Group creation functionality coming soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Farmer Community</h1>
          <p className="mt-2 text-lg text-gray-600">
            Connect with other farmers across Kenya to share knowledge and build partnerships.
          </p>
        </div>

        <Tabs defaultValue="forum" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="forum" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Forum
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Knowledge
            </TabsTrigger>
            <TabsTrigger value="mentorship" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Mentorship
            </TabsTrigger>
          </TabsList>

          <TabsContent value="forum">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Forum Posts */}
              <div className="lg:col-span-2 space-y-6">
                {/* Post creation card */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback className="bg-green-100 text-green-800">WM</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <Input 
                          placeholder="Share farming updates or ask questions..." 
                          className="bg-gray-100"
                          onClick={handleCreatePost}
                        />
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700" onClick={handleCreatePost}>
                        <Plus className="h-4 w-4 mr-2" />
                        Post
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Forum posts */}
                {forumPosts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start space-x-4">
                        <Avatar>
                          <AvatarFallback className="bg-green-100 text-green-800">{post.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{post.author}</h3>
                            <p className="text-sm text-gray-500">{post.time}</p>
                          </div>
                          <p className="mt-2 text-gray-700">{post.content}</p>
                          <div className="flex items-center space-x-6 mt-4 text-sm text-gray-500">
                            <button 
                              className="flex items-center space-x-2 hover:text-green-600"
                              onClick={() => handleLikePost(post.id)}
                            >
                              <Heart className="h-4 w-4" />
                              <span>{post.likes} Likes</span>
                            </button>
                            <button 
                              className="flex items-center space-x-2 hover:text-green-600"
                              onClick={handleCommentPost}
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.comments} Comments</span>
                            </button>
                            <button 
                              className="flex items-center space-x-2 hover:text-green-600"
                              onClick={handleSharePost}
                            >
                              <Share2 className="h-4 w-4" />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Farmer Groups */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl">Farmer Groups</CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-green-600"
                        onClick={handleCreateGroup}
                      >
                        <Plus className="h-4 w-4 mr-1" /> New Group
                      </Button>
                    </div>
                    <CardDescription>Connect with farming communities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {farmersGroups.map((group) => (
                        <div key={group.id} className="flex items-start space-x-4 py-2">
                          <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden">
                            <img 
                              src={group.image} 
                              alt={group.name} 
                              className="h-full w-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/40x40/228B22/FFFFFF?text=FG';
                              }}
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-900">{group.name}</h4>
                            <div className="flex items-center text-sm text-gray-500">
                              <Users className="h-3 w-3 mr-1" />
                              <span>{group.members} members</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mt-1 text-green-600 p-0 h-auto hover:text-green-800 hover:bg-transparent"
                              onClick={() => handleJoinGroup(group.name)}
                            >
                              Join Group
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <PrivateMessaging />
          </TabsContent>

          <TabsContent value="events">
            <EventCalendar />
          </TabsContent>

          <TabsContent value="knowledge">
            <KnowledgeBase />
          </TabsContent>

          <TabsContent value="mentorship">
            <MentorshipMatching />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;
