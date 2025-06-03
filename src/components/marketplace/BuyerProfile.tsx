
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Building2, Phone, MapPin, Package } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface BuyerProfileData {
  id: string;
  company_name: string;
  business_type: string;
  location: string;
  phone_number: string;
  verification_status: string;
  minimum_order_kg: number | null;
  preferred_crops: string[] | null;
}

// Define constants with proper validation
const BUSINESS_TYPES = [
  'supermarket',
  'restaurant', 
  'wholesaler',
  'export',
  'processor',
  'retailer',
  'hotel',
  'institution'
];

const KENYAN_COUNTIES = [
  'Nairobi',
  'Mombasa',
  'Nakuru',
  'Eldoret',
  'Kisumu',
  'Thika',
  'Malindi',
  'Kitale',
  'Garissa',
  'Kakamega',
  'Machakos',
  'Meru',
  'Nyeri',
  'Kericho'
];

const AVAILABLE_CROPS = [
  'Maize',
  'Beans',
  'Potatoes',
  'Tomatoes',
  'Kales (Sukuma Wiki)',
  'Avocados',
  'Bananas',
  'Carrots',
  'Onions',
  'Cabbage',
  'Spinach'
];

const BuyerProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<BuyerProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    business_type: undefined as string | undefined,
    location: undefined as string | undefined,
    phone_number: '',
    minimum_order_kg: '',
    preferred_crops: [] as string[],
  });

  useEffect(() => {
    if (user) {
      fetchBuyerProfile();
    }
  }, [user]);

  const fetchBuyerProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('buyers')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setProfile(data);
        setFormData({
          company_name: data.company_name || '',
          business_type: data.business_type && BUSINESS_TYPES.includes(data.business_type) ? data.business_type : undefined,
          location: data.location && KENYAN_COUNTIES.includes(data.location) ? data.location : undefined,
          phone_number: data.phone_number || '',
          minimum_order_kg: data.minimum_order_kg?.toString() || '',
          preferred_crops: Array.isArray(data.preferred_crops) ? data.preferred_crops.filter(crop => AVAILABLE_CROPS.includes(crop)) : [],
        });
      } else {
        setIsEditing(true);
      }
    } catch (error: any) {
      console.error('Error fetching buyer profile:', error);
      toast({
        title: "Error",
        description: "Failed to load buyer profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    if (!formData.company_name || !formData.business_type || !formData.location || !formData.phone_number) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const dataToSubmit = {
        user_id: user.id,
        company_name: formData.company_name,
        business_type: formData.business_type,
        location: formData.location,
        phone_number: formData.phone_number,
        minimum_order_kg: formData.minimum_order_kg ? parseFloat(formData.minimum_order_kg) : null,
        preferred_crops: formData.preferred_crops.length > 0 ? formData.preferred_crops : null,
      };

      let result;
      if (profile) {
        result = await supabase
          .from('buyers')
          .update(dataToSubmit)
          .eq('id', profile.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('buyers')
          .insert(dataToSubmit)
          .select()
          .single();
      }

      if (result.error) throw result.error;

      setProfile(result.data);
      setIsEditing(false);
      
      toast({
        title: "Profile Updated",
        description: "Your buyer profile has been successfully updated!",
      });
    } catch (error: any) {
      console.error('Error saving buyer profile:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCrop = (crop: string) => {
    if (!AVAILABLE_CROPS.includes(crop)) {
      console.warn('Invalid crop value:', crop);
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      preferred_crops: prev.preferred_crops.includes(crop)
        ? prev.preferred_crops.filter(c => c !== crop)
        : [...prev.preferred_crops, crop]
    }));
  };

  const getVerificationColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!profile && !isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create Buyer Profile</CardTitle>
          <CardDescription>
            Set up your buyer profile to connect with farmers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setIsEditing(true)} className="bg-green-600 hover:bg-green-700">
            Create Profile
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>
            {profile ? 'Edit Buyer Profile' : 'Create Buyer Profile'}
          </CardTitle>
          <CardDescription>
            Provide your business information to connect with farmers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name *</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => setFormData({...formData, company_name: e.target.value})}
                  placeholder="Your company name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business_type">Business Type *</Label>
                <Select 
                  value={formData.business_type || ''} 
                  onValueChange={(value) => {
                    if (BUSINESS_TYPES.includes(value)) {
                      setFormData({...formData, business_type: value});
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Select 
                  value={formData.location || ''} 
                  onValueChange={(value) => {
                    if (KENYAN_COUNTIES.includes(value)) {
                      setFormData({...formData, location: value});
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {KENYAN_COUNTIES.map((county) => (
                      <SelectItem key={county} value={county}>
                        {county}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number *</Label>
                <Input
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
                  placeholder="+254 XXX XXX XXX"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="minimum_order_kg">Minimum Order (kg)</Label>
                <Input
                  id="minimum_order_kg"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.minimum_order_kg}
                  onChange={(e) => setFormData({...formData, minimum_order_kg: e.target.value})}
                  placeholder="e.g., 100"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Preferred Crops</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {AVAILABLE_CROPS.map((crop) => (
                  <div key={crop} className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant={formData.preferred_crops.includes(crop) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCrop(crop)}
                      className={formData.preferred_crops.includes(crop) ? "bg-green-600 hover:bg-green-700" : ""}
                    >
                      {crop}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-4">
              <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? 'Saving...' : (profile ? 'Update Profile' : 'Create Profile')}
              </Button>
              {profile && (
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="h-5 w-5 text-green-600" />
              <span>{profile.company_name}</span>
            </CardTitle>
            <CardDescription>
              {profile.business_type.charAt(0).toUpperCase() + profile.business_type.slice(1)} Business
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getVerificationColor(profile.verification_status)}>
              {profile.verification_status.charAt(0).toUpperCase() + profile.verification_status.slice(1)}
            </Badge>
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-gray-500" />
            <span>{profile.phone_number}</span>
          </div>
        </div>

        {profile.minimum_order_kg && (
          <div className="flex items-center space-x-2">
            <Package className="h-4 w-4 text-gray-500" />
            <span>Minimum Order: {profile.minimum_order_kg} kg</span>
          </div>
        )}

        {profile.preferred_crops && profile.preferred_crops.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Preferred Crops</h4>
            <div className="flex flex-wrap gap-2">
              {profile.preferred_crops.filter(crop => AVAILABLE_CROPS.includes(crop)).map(crop => (
                <Badge key={crop} variant="secondary">
                  {crop}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BuyerProfile;
