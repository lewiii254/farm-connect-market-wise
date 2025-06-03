
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface CropListingFormProps {
  onSuccess?: () => void;
}

const CropListingForm = ({ onSuccess }: CropListingFormProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    crop_name: '',
    quantity_kg: '',
    price_per_kg: '',
    description: '',
    location: '',
    harvest_date: undefined as Date | undefined,
    available_until: undefined as Date | undefined,
    is_organic: false,
  });

  const crops = [
    'Maize', 'Beans', 'Potatoes', 'Tomatoes', 'Kales (Sukuma Wiki)', 
    'Avocados', 'Bananas', 'Carrots', 'Onions', 'Cabbage', 'Spinach'
  ];

  const kenyanCounties = [
    'Nairobi', 'Mombasa', 'Nakuru', 'Eldoret', 'Kisumu', 'Thika', 'Malindi',
    'Kitale', 'Garissa', 'Kakamega', 'Machakos', 'Meru', 'Nyeri', 'Kericho'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to create a listing",
        variant: "destructive"
      });
      return;
    }

    if (!formData.crop_name || !formData.quantity_kg || !formData.price_per_kg || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('crop_listings')
        .insert({
          farmer_id: user.id,
          crop_name: formData.crop_name,
          quantity_kg: parseFloat(formData.quantity_kg),
          price_per_kg: parseFloat(formData.price_per_kg),
          description: formData.description || null,
          location: formData.location,
          harvest_date: formData.harvest_date?.toISOString().split('T')[0] || null,
          available_until: formData.available_until?.toISOString().split('T')[0] || null,
          is_organic: formData.is_organic,
        });

      if (error) throw error;

      toast({
        title: "Listing Created",
        description: "Your crop listing has been successfully created!",
      });

      // Reset form
      setFormData({
        crop_name: '',
        quantity_kg: '',
        price_per_kg: '',
        description: '',
        location: '',
        harvest_date: undefined,
        available_until: undefined,
        is_organic: false,
      });

      onSuccess?.();
    } catch (error: any) {
      console.error('Error creating listing:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create listing",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="h-5 w-5 text-green-600" />
          <span>Create New Crop Listing</span>
        </CardTitle>
        <CardDescription>
          List your crops to connect with buyers across Kenya
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crop_name">Crop Type *</Label>
              <Select value={formData.crop_name} onValueChange={(value) => setFormData({...formData, crop_name: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop type" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map(crop => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Select value={formData.location} onValueChange={(value) => setFormData({...formData, location: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {kenyanCounties.map(county => (
                    <SelectItem key={county} value={county}>{county}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity_kg">Quantity (kg) *</Label>
              <Input
                id="quantity_kg"
                type="number"
                step="0.1"
                min="0"
                placeholder="e.g., 100"
                value={formData.quantity_kg}
                onChange={(e) => setFormData({...formData, quantity_kg: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price_per_kg">Price per kg (KSh) *</Label>
              <Input
                id="price_per_kg"
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g., 45.00"
                value={formData.price_per_kg}
                onChange={(e) => setFormData({...formData, price_per_kg: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label>Harvest Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.harvest_date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.harvest_date ? format(formData.harvest_date, "PPP") : "Select harvest date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.harvest_date}
                    onSelect={(date) => setFormData({...formData, harvest_date: date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Available Until</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.available_until && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.available_until ? format(formData.available_until, "PPP") : "Select end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.available_until}
                    onSelect={(date) => setFormData({...formData, available_until: date})}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your crop quality, farming methods, etc."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="is_organic"
              checked={formData.is_organic}
              onCheckedChange={(checked) => setFormData({...formData, is_organic: checked})}
            />
            <Label htmlFor="is_organic">Organic Certified</Label>
          </div>

          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
            {isLoading ? 'Creating Listing...' : 'Create Listing'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CropListingForm;
