
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, DollarSign, Users, Bell, Plus, Package, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import CropListingForm from '@/components/marketplace/CropListingForm';

const Dashboard = () => {
  const { user } = useAuth();
  const [showListingForm, setShowListingForm] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalListings: 0,
    totalRevenue: 0,
    activeOrders: 0,
    priceAlerts: 0,
  });

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    try {
      // Fetch user's crop listings
      const { data: listings } = await supabase
        .from('crop_listings')
        .select('*')
        .eq('farmer_id', user.id);

      // Fetch user's orders (as farmer)
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('farmer_id', user.id);

      // Fetch user's price alerts
      const { data: alerts } = await supabase
        .from('price_alerts')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);

      const totalRevenue = orders?.reduce((sum, order) => {
        return order.status === 'delivered' ? sum + order.total_amount : sum;
      }, 0) || 0;

      const activeOrders = orders?.filter(order => 
        ['confirmed', 'paid', 'in_transit'].includes(order.status)
      ).length || 0;

      setDashboardData({
        totalListings: listings?.length || 0,
        totalRevenue,
        activeOrders,
        priceAlerts: alerts?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const dashboardStats = [
    {
      title: 'Total Revenue',
      value: `KSh ${dashboardData.totalRevenue.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      title: 'Active Listings',
      value: dashboardData.totalListings.toString(),
      change: '+3',
      icon: Package,
      color: 'text-blue-600',
    },
    {
      title: 'Active Orders',
      value: dashboardData.activeOrders.toString(),
      change: '+5',
      icon: ShoppingCart,
      color: 'text-purple-600',
    },
    {
      title: 'Price Alerts',
      value: dashboardData.priceAlerts.toString(),
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
                Welcome back! Here's your farming business overview.
              </p>
            </div>
            <Button 
              className="bg-green-600 hover:bg-green-700" 
              onClick={() => setShowListingForm(!showListingForm)}
            >
              <Plus className="h-4 w-4 mr-2" />
              {showListingForm ? 'Hide Form' : 'Add New Listing'}
            </Button>
          </div>
        </div>

        {/* Show listing form if toggled */}
        {showListingForm && (
          <div className="mb-8">
            <CropListingForm onSuccess={() => {
              setShowListingForm(false);
              fetchDashboardData();
            }} />
          </div>
        )}

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
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => setShowListingForm(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Crop Listing
              </Button>
              <Link to="/markets">
                <Button variant="outline" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Set Price Alerts
                </Button>
              </Link>
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
            {dashboardData.totalListings > 0 ? (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">
                  You have {dashboardData.totalListings} active listing{dashboardData.totalListings > 1 ? 's' : ''}
                </p>
                <Link to="/buyers">
                  <Button className="bg-green-600 hover:bg-green-700">
                    View All Listings
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-600">No active listings</p>
                <p className="text-sm text-gray-500 mt-2">
                  Create your first listing to start connecting with Kenyan buyers
                </p>
                <Button 
                  className="mt-4 bg-green-600 hover:bg-green-700" 
                  onClick={() => setShowListingForm(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Listing
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
