import React, { useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, Heart, Share2, Plus, Calendar, BookOpen, UserCheck, TrendingUp, Filter, Send } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: Comment[];
  shares: number;
  isLiked?: boolean;
}

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  time: string;
}

interface Group {
  id: number;
  name: string;
  members: number;
  description: string;
  image: string;
  isJoined?: boolean;
}

const Community = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Joseph Kamau',
      avatar: 'JK',
      time: '2 hours ago',
      content: "Has anyone tried the new disease-resistant maize variety from Kenya Seed Company? I'm considering planting it next season.",
      likes: 24,
      comments: [],
      shares: 3,
      isLiked: false
    },
    {
      id: 2,
      author: 'Faith Wanjiku',
      avatar: 'FW',
      time: '5 hours ago',
      content: 'Weather alert: Expected heavy rainfall in Western Kenya next week. Secure your harvested produce and prepare drainage systems.',
      likes: 56,
      comments: [],
      shares: 12,
      isLiked: false
    },
    {
      id: 3,
      author: 'Daniel Omondi',
      avatar: 'DO',
      time: '1 day ago',
      content: 'Looking for recommendations on affordable irrigation systems suitable for small farms in Machakos. Any suggestions?',
      likes: 18,
      comments: [],
      shares: 5,
      isLiked: false
    }
  ]);

  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: 'Nakuru Vegetable Farmers',
      members: 142,
      description: 'Group for vegetable farmers in Nakuru county sharing best practices.',
      image: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=100&auto=format&fit=crop',
      isJoined: false
    },
    {
      id: 2,
      name: 'Kiambu Coffee Growers',
      members: 98,
      description: 'Supporting coffee farmers in Kiambu with market connections and knowledge.',
      image: 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?q=80&w=100&auto=format&fit=crop',
      isJoined: false
    },
    {
      id: 3,
      name: 'Kenyan Dairy Alliance',
      members: 215,
      description: 'Networking group for dairy farmers across Kenya to share innovations.',
      image: 'https://images.unsplash.com/photo-1604909052743-94e838986d24?q=80&w=100&auto=format&fit=crop',
      isJoined: false
    },
    {
      id: 4,
      name: 'Machakos Drought Resistant Crops',
      members: 76,
      description: 'Focused on drought-resistant crops suitable for Machakos county farmers.',
      image: 'https://images.unsplash.com/photo-1620857493809-cce7a0d8ec3b?q=80&w=100&auto=format&fit=crop',
      isJoined: false
    }
  ]);

  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedPostForComment, setSelectedPostForComment] = useState<number | null>(null);
  const [commentText, setCommentText] = useState('');
  const [postFilter, setPostFilter] = useState('recent');
  const [groupSearchQuery, setGroupSearchQuery] = useState('');
  
  // New group form state
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupCategory, setNewGroupCategory] = useState('');

  const farmersGroups = groups;

  const forumPosts = posts;


  const handleJoinGroup = (groupId: number) => {
    setGroups(groups.map(group => 
      group.id === groupId 
        ? { ...group, isJoined: !group.isJoined, members: group.isJoined ? group.members - 1 : group.members + 1 }
        : group
    ));
    const group = groups.find(g => g.id === groupId);
    toast({
      title: group?.isJoined ? "Left Group" : "Joined Group",
      description: group?.isJoined 
        ? `You have left ${group.name}.` 
        : `You have joined ${group.name}!`,
    });
  };

  const handleLikePost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
    const post = posts.find(p => p.id === postId);
    toast({
      title: post?.isLiked ? "Post Unliked" : "Post Liked",
      description: post?.isLiked ? "You've unliked this post." : "You've liked this post.",
    });
  };

  const handleCommentPost = (postId: number) => {
    setSelectedPostForComment(postId);
  };

  const handleSubmitComment = (postId: number) => {
    if (!commentText.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      author: 'You',
      avatar: 'YO',
      content: commentText,
      time: 'Just now'
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));

    setCommentText('');
    toast({
      title: "Comment Posted",
      description: "Your comment has been added.",
    });
  };

  const handleCreatePost = () => {
    if (!postContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content for your post.",
        variant: "destructive"
      });
      return;
    }

    const newPost: Post = {
      id: Date.now(),
      author: 'You',
      avatar: 'YO',
      time: 'Just now',
      content: postContent,
      likes: 0,
      comments: [],
      shares: 0,
      isLiked: false
    };

    setPosts([newPost, ...posts]);
    setPostContent('');
    setIsCreatePostOpen(false);
    
    toast({
      title: "Post Created",
      description: "Your post has been shared with the community!",
    });
  };

  const handleSharePost = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, shares: post.shares + 1 }
        : post
    ));
    toast({
      title: "Post Shared",
      description: "Post has been shared to your network!",
    });
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim() || !newGroupDescription.trim() || !newGroupCategory) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    const newGroup: Group = {
      id: Date.now(),
      name: newGroupName,
      members: 1,
      description: newGroupDescription,
      image: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?q=80&w=100&auto=format&fit=crop',
      isJoined: true
    };

    setGroups([newGroup, ...groups]);
    setNewGroupName('');
    setNewGroupDescription('');
    setNewGroupCategory('');
    setIsCreateGroupOpen(false);

    toast({
      title: "Group Created",
      description: `${newGroupName} has been created successfully!`,
    });
  };

  // Filter and sort posts
  const filteredPosts = [...posts].sort((a, b) => {
    switch (postFilter) {
      case 'popular':
        return b.likes - a.likes;
      case 'trending':
        return (b.likes + b.comments.length + b.shares) - (a.likes + a.comments.length + a.shares);
      case 'recent':
      default:
        return b.id - a.id;
    }
  });

  // Filter groups by search query
  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(groupSearchQuery.toLowerCase()) ||
    group.description.toLowerCase().includes(groupSearchQuery.toLowerCase())
  );

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
                {/* Post Filter Bar */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">Sort by:</span>
                        <div className="flex gap-2">
                          <Button
                            variant={postFilter === 'recent' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPostFilter('recent')}
                            className={postFilter === 'recent' ? 'bg-green-600 hover:bg-green-700' : ''}
                          >
                            Recent
                          </Button>
                          <Button
                            variant={postFilter === 'popular' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPostFilter('popular')}
                            className={postFilter === 'popular' ? 'bg-green-600 hover:bg-green-700' : ''}
                          >
                            Popular
                          </Button>
                          <Button
                            variant={postFilter === 'trending' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setPostFilter('trending')}
                            className={postFilter === 'trending' ? 'bg-green-600 hover:bg-green-700' : ''}
                          >
                            <TrendingUp className="h-3 w-3 mr-1" />
                            Trending
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

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
                          onClick={() => setIsCreatePostOpen(true)}
                          readOnly
                        />
                      </div>
                      <Button className="bg-green-600 hover:bg-green-700" onClick={() => setIsCreatePostOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Post
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Forum posts */}
                {filteredPosts.map((post) => (
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
                              className={`flex items-center space-x-2 hover:text-green-600 transition-colors ${post.isLiked ? 'text-red-500' : ''}`}
                              onClick={() => handleLikePost(post.id)}
                            >
                              <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-red-500' : ''}`} />
                              <span>{post.likes} Likes</span>
                            </button>
                            <button 
                              className="flex items-center space-x-2 hover:text-green-600"
                              onClick={() => handleCommentPost(post.id)}
                            >
                              <MessageSquare className="h-4 w-4" />
                              <span>{post.comments.length} Comments</span>
                            </button>
                            <button 
                              className="flex items-center space-x-2 hover:text-green-600"
                              onClick={() => handleSharePost(post.id)}
                            >
                              <Share2 className="h-4 w-4" />
                              <span>{post.shares} Shares</span>
                            </button>
                          </div>

                          {/* Comments Section */}
                          {post.comments.length > 0 && (
                            <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-3">
                              {post.comments.map((comment) => (
                                <div key={comment.id} className="flex items-start space-x-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarFallback className="bg-blue-100 text-blue-800 text-xs">
                                      {comment.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-grow">
                                    <div className="flex items-center gap-2">
                                      <p className="text-sm font-medium">{comment.author}</p>
                                      <p className="text-xs text-gray-500">{comment.time}</p>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">{comment.content}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Comment Input */}
                          {selectedPostForComment === post.id && (
                            <div className="mt-4 flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-green-100 text-green-800 text-xs">
                                  YO
                                </AvatarFallback>
                              </Avatar>
                              <Input
                                placeholder="Write a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    handleSubmitComment(post.id);
                                    setSelectedPostForComment(null);
                                  }
                                }}
                                className="flex-grow"
                              />
                              <Button 
                                size="sm" 
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => {
                                  handleSubmitComment(post.id);
                                  setSelectedPostForComment(null);
                                }}
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
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
                        onClick={() => setIsCreateGroupOpen(true)}
                      >
                        <Plus className="h-4 w-4 mr-1" /> New Group
                      </Button>
                    </div>
                    <CardDescription>Connect with farming communities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Group Search */}
                    <div className="mb-4">
                      <Input
                        placeholder="Search groups..."
                        value={groupSearchQuery}
                        onChange={(e) => setGroupSearchQuery(e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-4">
                      {filteredGroups.map((group) => (
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
                              variant={group.isJoined ? "outline" : "ghost"}
                              size="sm" 
                              className={`mt-1 p-0 h-auto ${
                                group.isJoined 
                                  ? 'text-gray-600 hover:text-gray-800' 
                                  : 'text-green-600 hover:text-green-800'
                              } hover:bg-transparent`}
                              onClick={() => handleJoinGroup(group.id)}
                            >
                              {group.isJoined ? 'Leave Group' : 'Join Group'}
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

      {/* Create Post Dialog */}
      <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Post</DialogTitle>
            <DialogDescription>
              Share your farming experiences, ask questions, or provide advice to the community.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="postContent">What's on your mind?</Label>
              <Textarea
                id="postContent"
                placeholder="Share your thoughts, questions, or farming tips..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="min-h-[150px] mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreatePostOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleCreatePost}>
              <Plus className="h-4 w-4 mr-2" />
              Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Group Dialog */}
      <Dialog open={isCreateGroupOpen} onOpenChange={setIsCreateGroupOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a Farmer Group</DialogTitle>
            <DialogDescription>
              Start a new community group to connect with farmers who share your interests.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                placeholder="e.g., Meru Avocado Farmers"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="groupCategory">Category</Label>
              <Select value={newGroupCategory} onValueChange={setNewGroupCategory}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crop-production">Crop Production</SelectItem>
                  <SelectItem value="livestock">Livestock</SelectItem>
                  <SelectItem value="dairy">Dairy Farming</SelectItem>
                  <SelectItem value="organic">Organic Farming</SelectItem>
                  <SelectItem value="irrigation">Irrigation</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="groupDescription">Description</Label>
              <Textarea
                id="groupDescription"
                placeholder="Describe the purpose and goals of this group..."
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
                className="min-h-[100px] mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateGroupOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleCreateGroup}>
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Community;
