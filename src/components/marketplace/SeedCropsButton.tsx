
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Seedling, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface SeedCropsButtonProps {
  onSuccess?: () => void;
}

export const SeedCropsButton = ({ onSuccess }: SeedCropsButtonProps) => {
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedCrops = async () => {
    setIsSeeding(true);
    try {
      const { data, error } = await supabase.functions.invoke('seed-crops');
      
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "Sample crops have been added to the marketplace",
      });
      
      onSuccess?.();
    } catch (error) {
      console.error('Error seeding crops:', error);
      toast({
        title: "Error",
        description: "Failed to add sample crops. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button 
      onClick={handleSeedCrops} 
      disabled={isSeeding}
      variant="outline"
      className="flex items-center gap-2"
    >
      {isSeeding ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Seedling className="h-4 w-4" />
      )}
      {isSeeding ? 'Adding Sample Crops...' : 'Add Sample Crops'}
    </Button>
  );
};
