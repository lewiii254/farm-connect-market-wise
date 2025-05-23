
import React from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Users, Bell, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const dashboardStats = [
    {
      title: 'Total Revenue',
      value: 'KSh 42,450',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Active Listings',
      value: '24',
      change: '+3',
      icon: TrendingUp,
      color: 'text-blue-600',
    },
    {
      title: 'Connected Buyers',
      value: '18',
      change: '+5',
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Price Alerts',
      value: '7',
      change: '+2',
      icon: Bell,
      color: 'text-orange-600',
    },
  ];

  const recentActivity = [
    {
      type: 'Sale',
      description: 'Sold 50kg maize to Nairobi Fresh Grocers',
      amount: 'KSh 2,250',
      time: '2 hours ago',
    },
    {
      type: 'Alert',
      description: 'Potato prices increased by 8.5% in Nakuru',
      amount: 'KSh 38/kg',
      time: '4 hours ago',
    },
    {
      type: 'Contact',
      description: 'New inquiry from Tuskys Supermarket',
      amount: 'Organic vegetables',
      time: '1 day ago',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-2 text-lg text-gray-600">
                Welcome back, Wanjiku! Here's your farming business overview.
              </p>
            </div>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => alert("Add New Listing functionality will be available soon!")}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Listing
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index} className="hover-scale">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{stat.title}</CardDescription>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest transactions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">{activity.amount}</p>
                      <p className="text-xs text-gray-500">{activity.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your farming business</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/markets">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Check Market Prices
                </Button>
              </Link>
              <Link to="/buyers">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Find New Buyers
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start" onClick={() => alert("Price Alerts functionality will be available soon!")}>
                <Bell className="h-4 w-4 mr-2" />
                Set Price Alerts
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => alert("Add Crop Listing functionality will be available soon!")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Crop Listing
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Current Listings */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Your Current Listings</CardTitle>
            <CardDescription>Manage your active crop listings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600">No active listings</p>
              <p className="text-sm text-gray-500 mt-2">
                Create your first listing to start connecting with Kenyan buyers
              </p>
              <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={() => alert("Create Listing functionality will be available soon!")}>
                <Plus className="h-4 w-4 mr-2" />
                Create Listing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
