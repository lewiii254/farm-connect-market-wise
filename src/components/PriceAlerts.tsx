import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Plus, X } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface PriceAlert {
  id: string;
  crop_name: string;
  target_price: number;
  location: string | null;
  is_active: boolean;
  created_at: string;
}

const PriceAlerts = () => {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newAlert, setNewAlert] = useState({
    crop_name: '',
    target_price: '',
    location: ''
  });

  const crops = ['Maize', 'Beans', 'Potatoes', 'Tomatoes', 'Kales (Sukuma Wiki)', 'Avocados'];
  const locations = ['Nairobi', 'Mombasa', 'Nakuru', 'Eldoret', 'Kisumu', 'Nyeri'];

  useEffect(() => {
    if (user) {
      fetchAlerts();
    }
  }, [user]);

  const fetchAlerts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('price_alerts')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAlerts(data || []);
    } catch (error: any) {
      console.error('Error fetching alerts:', error);
      toast({
        title: "Error",
        description: "Failed to load price alerts",
        variant: "destructive"
      });
    }
  };

  const handleAddAlert = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create price alerts.",
        variant: "destructive"
      });
      return;
    }

    if (!newAlert.crop_name || !newAlert.target_price) {
      toast({
        title: "Missing Information",
        description: "Please fill in crop type and target price.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('price_alerts')
        .insert({
          user_id: user.id,
          crop_name: newAlert.crop_name,
          target_price: parseFloat(newAlert.target_price),
          location: newAlert.location || null,
        });

      if (error) throw error;

      toast({
        title: "Price Alert Created",
        description: `You'll be notified when ${newAlert.crop_name} reaches KSh ${newAlert.target_price}/kg${newAlert.location ? ` in ${newAlert.location}` : ''}.`,
      });

      setNewAlert({ crop_name: '', target_price: '', location: '' });
      setShowForm(false);
      fetchAlerts();
    } catch (error: any) {
      console.error('Error creating alert:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create price alert",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAlert = async (id: string) => {
    try {
      const { error } = await supabase
        .from('price_alerts')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Alert Deleted",
        description: "Price alert has been removed.",
      });

      fetchAlerts();
    } catch (error: any) {
      console.error('Error deleting alert:', error);
      toast({
        title: "Error",
        description: "Failed to delete price alert",
        variant: "destructive"
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-green-600" />
            <CardTitle>Price Alerts</CardTitle>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            size="sm"
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Alert
          </Button>
        </div>
        <CardDescription>Get notified when crop prices reach your target</CardDescription>
      </CardHeader>
      <CardContent>
        {showForm && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={newAlert.crop_name} onValueChange={(value) => setNewAlert({...newAlert, crop_name: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map(crop => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Target price (KSh/kg)"
                value={newAlert.target_price}
                onChange={(e) => setNewAlert({...newAlert, target_price: e.target.value})}
              />

              <Select value={newAlert.location} onValueChange={(value) => setNewAlert({...newAlert, location: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Any location</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleAddAlert} className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Alert'}
              </Button>
              <Button onClick={() => setShowForm(false)} variant="outline">
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-center justify-between p-3 bg-white border rounded-lg">
              <div>
                <p className="font-medium">{alert.crop_name}</p>
                <p className="text-sm text-gray-600">
                  Alert when price reaches KSh {alert.target_price}/kg
                  {alert.location && ` in ${alert.location}`}
                </p>
                <p className="text-xs text-gray-500">
                  Created {new Date(alert.created_at).toLocaleDateString()}
                </p>
              </div>
              <Button
                onClick={() => handleDeleteAlert(alert.id)}
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {alerts.length === 0 && (
            <p className="text-center text-gray-500 py-4">No price alerts set</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceAlerts;
