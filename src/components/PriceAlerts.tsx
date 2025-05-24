
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Plus, X } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface PriceAlert {
  id: number;
  crop: string;
  targetPrice: number;
  condition: 'above' | 'below';
  market: string;
}

const PriceAlerts = () => {
  const [alerts, setAlerts] = useState<PriceAlert[]>([
    { id: 1, crop: 'Maize', targetPrice: 50, condition: 'above', market: 'Wakulima Market' },
  ]);
  const [showForm, setShowForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    crop: '',
    targetPrice: '',
    condition: 'above' as 'above' | 'below',
    market: ''
  });

  const crops = ['Maize', 'Beans', 'Potatoes', 'Tomatoes', 'Kales (Sukuma Wiki)', 'Avocados'];
  const markets = ['Wakulima Market', 'Kongowea Market', 'Nakuru Wholesale', 'Karatina Market', 'Eldoret Market', 'Kisumu Fresh Produce'];

  const handleAddAlert = () => {
    if (!newAlert.crop || !newAlert.targetPrice || !newAlert.market) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to create a price alert.",
        variant: "destructive"
      });
      return;
    }

    const alert: PriceAlert = {
      id: Date.now(),
      crop: newAlert.crop,
      targetPrice: parseFloat(newAlert.targetPrice),
      condition: newAlert.condition,
      market: newAlert.market
    };

    setAlerts([...alerts, alert]);
    setNewAlert({ crop: '', targetPrice: '', condition: 'above', market: '' });
    setShowForm(false);
    
    toast({
      title: "Price Alert Created",
      description: `You'll be notified when ${newAlert.crop} goes ${newAlert.condition} KSh ${newAlert.targetPrice}/kg at ${newAlert.market}.`,
    });
  };

  const handleDeleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast({
      title: "Alert Deleted",
      description: "Price alert has been removed.",
    });
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
            <div className="grid grid-cols-2 gap-4">
              <Select value={newAlert.crop} onValueChange={(value) => setNewAlert({...newAlert, crop: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map(crop => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={newAlert.market} onValueChange={(value) => setNewAlert({...newAlert, market: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select market" />
                </SelectTrigger>
                <SelectContent>
                  {markets.map(market => (
                    <SelectItem key={market} value={market}>{market}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Select value={newAlert.condition} onValueChange={(value: 'above' | 'below') => setNewAlert({...newAlert, condition: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="above">Goes above</SelectItem>
                  <SelectItem value="below">Falls below</SelectItem>
                </SelectContent>
              </Select>
              
              <Input
                type="number"
                placeholder="Target price (KSh/kg)"
                value={newAlert.targetPrice}
                onChange={(e) => setNewAlert({...newAlert, targetPrice: e.target.value})}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={handleAddAlert} className="bg-green-600 hover:bg-green-700">
                Create Alert
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
                <p className="font-medium">{alert.crop} at {alert.market}</p>
                <p className="text-sm text-gray-600">
                  Alert when price goes {alert.condition} KSh {alert.targetPrice}/kg
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
