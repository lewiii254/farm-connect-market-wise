import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { LogOut, User, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const UserProfile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out."
      });
      navigate('/auth');
    } catch (error) {
      toast({
        title: "Sign Out Failed",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          User Profile
        </CardTitle>
        <CardDescription>Your FarmConnect account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
            <Mail className="h-4 w-4 text-gray-500" />
            <span className="text-sm">{user.email}</span>
          </div>
          
          {user.user_metadata?.full_name && (
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{user.user_metadata.full_name}</span>
            </div>
          )}
          
          {user.user_metadata?.phone_number && (
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{user.user_metadata.phone_number}</span>
            </div>
          )}
          
          {user.user_metadata?.county && (
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{user.user_metadata.county}</span>
            </div>
          )}
        </div>

        <Button onClick={handleSignOut} variant="outline" className="w-full">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </CardContent>
    </Card>
  );
};
