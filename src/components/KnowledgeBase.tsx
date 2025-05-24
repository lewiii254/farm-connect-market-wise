
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, Download, Star } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Crop Production', 'Livestock', 'Pest Control', 'Irrigation', 'Financial Planning', 'Marketing'];

  const guides = [
    {
      id: 1,
      title: 'Complete Guide to Maize Farming in Kenya',
      category: 'Crop Production',
      description: 'Comprehensive guide covering variety selection, planting, fertilization, and harvesting of maize.',
      author: 'Dr. John Mwangi',
      rating: 4.8,
      downloads: 1250,
      type: 'PDF Guide',
      difficulty: 'Beginner'
    },
    {
      id: 2,
      title: 'Modern Dairy Farming Techniques',
      category: 'Livestock',
      description: 'Best practices for dairy farming including breeding, feeding, and milk production optimization.',
      author: 'Mary Wanjiku',
      rating: 4.9,
      downloads: 892,
      type: 'Video Series',
      difficulty: 'Intermediate'
    },
    {
      id: 3,
      title: 'Integrated Pest Management for Vegetables',
      category: 'Pest Control',
      description: 'Sustainable approaches to managing pests in vegetable crops without harmful chemicals.',
      author: 'Prof. Sarah Kimani',
      rating: 4.7,
      downloads: 654,
      type: 'Interactive Guide',
      difficulty: 'Advanced'
    },
    {
      id: 4,
      title: 'Drip Irrigation Setup and Maintenance',
      category: 'Irrigation',
      description: 'Step-by-step guide to installing and maintaining drip irrigation systems for small farms.',
      author: 'Peter Ochieng',
      rating: 4.6,
      downloads: 743,
      type: 'Video Tutorial',
      difficulty: 'Intermediate'
    },
    {
      id: 5,
      title: 'Farm Financial Planning and Record Keeping',
      category: 'Financial Planning',
      description: 'Essential guide to managing farm finances, budgeting, and maintaining proper records.',
      author: 'Grace Mutua',
      rating: 4.5,
      downloads: 567,
      type: 'PDF Guide',
      difficulty: 'Beginner'
    },
    {
      id: 6,
      title: 'Marketing Your Produce Effectively',
      category: 'Marketing',
      description: 'Strategies for finding buyers, pricing your products, and building long-term customer relationships.',
      author: 'Daniel Kariuki',
      rating: 4.4,
      downloads: 432,
      type: 'PDF Guide',
      difficulty: 'Intermediate'
    }
  ];

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guide.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleDownload = (guideTitle: string) => {
    toast({
      title: "Download Started",
      description: `Downloading "${guideTitle}"...`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Base</CardTitle>
          <CardDescription>
            Access farming guides, best practices, and expert advice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search guides and resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGuides.map((guide) => (
          <Card key={guide.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge className={getDifficultyColor(guide.difficulty)}>
                  {guide.difficulty}
                </Badge>
                <Badge variant="outline">
                  {guide.type}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight">{guide.title}</CardTitle>
              <CardDescription className="text-sm">
                by {guide.author}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {guide.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{guide.rating}</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  <span>{guide.downloads} downloads</span>
                </div>
              </div>
              
              <Button 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleDownload(guide.title)}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Access Guide
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBase;
