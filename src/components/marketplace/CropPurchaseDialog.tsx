
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MapPin, Calendar, Truck } from 'lucide-react';
import { MpesaServicePayment } from '@/components/MpesaServiceIntegration';
import { toast } from "@/hooks/use-toast";

interface CropListing {
  id: string;
  crop_name: string;
  quantity_kg: number;
  price_per_kg: number;
  location: string;
  farmer_id: string;
  description?: string;
  is_organic?: boolean;
}

interface CropPurchaseDialogProps {
  listing: CropListing;
  trigger: React.ReactNode;
}

export const CropPurchaseDialog = ({ listing, trigger }: CropPurchaseDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [purchaseData, setPurchaseData] = useState({
    quantity: 1,
    deliveryLocation: '',
    deliveryDate: '',
    notes: ''
  });

  const totalAmount = purchaseData.quantity * listing.price_per_kg;

  const handleSuccessfulPurchase = (transactionId: string) => {
    toast({
      title: "Purchase Successful!",
      description: `Your order for ${purchaseData.quantity}kg of ${listing.crop_name} has been placed successfully.`,
    });
    setIsOpen(false);
    // Here you would typically create the order in your database
  };

  const handlePurchaseError = (error: string) => {
    toast({
      title: "Purchase Failed",
      description: error,
      variant: "destructive"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-green-600" />
            Purchase {listing.crop_name}
          </DialogTitle>
          <DialogDescription>
            Complete your order for fresh {listing.crop_name} from {listing.location}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold">{listing.crop_name}</h3>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">KSh {listing.price_per_kg}/kg</div>
                <div className="text-sm text-gray-500">Available: {listing.quantity_kg}kg</div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {listing.location}
              </div>
              {listing.is_organic && (
                <Badge variant="secondary" className="text-xs">Organic</Badge>
              )}
            </div>
            {listing.description && (
              <p className="text-sm text-gray-600 mt-2">{listing.description}</p>
            )}
          </div>

          {/* Purchase Details */}
          <div className="space-y-3">
            <div>
              <Label htmlFor="quantity">Quantity (kg)</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={listing.quantity_kg}
                value={purchaseData.quantity}
                onChange={(e) => setPurchaseData({
                  ...purchaseData, 
                  quantity: Math.min(Number(e.target.value), listing.quantity_kg)
                })}
              />
            </div>

            <div>
              <Label htmlFor="deliveryLocation">Delivery Location</Label>
              <Input
                id="deliveryLocation"
                placeholder="Enter your delivery address"
                value={purchaseData.deliveryLocation}
                onChange={(e) => setPurchaseData({...purchaseData, deliveryLocation: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="deliveryDate">Preferred Delivery Date</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={purchaseData.deliveryDate}
                onChange={(e) => setPurchaseData({...purchaseData, deliveryDate: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <Input
                id="notes"
                placeholder="Any special requests or notes"
                value={purchaseData.notes}
                onChange={(e) => setPurchaseData({...purchaseData, notes: e.target.value})}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-2">
              <span>Quantity:</span>
              <span>{purchaseData.quantity} kg</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Price per kg:</span>
              <span>KSh {listing.price_per_kg}</span>
            </div>
            <div className="flex justify-between items-center font-semibold text-lg border-t pt-2">
              <span>Total Amount:</span>
              <span className="text-green-600">KSh {totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment Button */}
          <MpesaServicePayment
            serviceName="Crop Purchase"
            amount={totalAmount}
            description={`Purchase ${purchaseData.quantity}kg of ${listing.crop_name} from ${listing.location}`}
            onSuccess={handleSuccessfulPurchase}
            onError={handlePurchaseError}
            buttonText={`Pay KSh ${totalAmount.toLocaleString()} via M-Pesa`}
          />

          <div className="text-xs text-gray-500 text-center">
            <Truck className="h-3 w-3 inline mr-1" />
            Delivery charges may apply based on location
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
