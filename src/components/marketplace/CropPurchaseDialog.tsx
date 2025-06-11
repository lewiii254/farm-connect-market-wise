
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, MapPin, Calendar, Truck, Phone } from 'lucide-react';
import { MpesaServicePayment } from '@/components/MpesaServiceIntegration';
import { toast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

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
    notes: '',
    buyerPhone: ''
  });

  const totalAmount = purchaseData.quantity * listing.price_per_kg;

  const handleSuccessfulPurchase = async (transactionId: string) => {
    try {
      // Create order record in database
      const orderData = {
        listing_id: listing.id,
        farmer_id: listing.farmer_id,
        buyer_id: null, // Will be set if user is authenticated
        quantity_kg: purchaseData.quantity,
        total_amount: totalAmount,
        delivery_location: purchaseData.deliveryLocation,
        delivery_date: purchaseData.deliveryDate || null,
        notes: purchaseData.notes || null,
        mpesa_transaction_id: transactionId,
        status: 'confirmed',
        payment_status: 'completed',
        payment_method: 'mpesa'
      };

      const { error } = await supabase
        .from('orders')
        .insert(orderData);

      if (error) {
        console.error('Order creation error:', error);
        toast({
          title: "Payment Successful",
          description: `Your M-Pesa payment was successful! Transaction ID: ${transactionId}. Please contact the farmer directly.`,
        });
      } else {
        toast({
          title: "Purchase Successful!",
          description: `Your order for ${purchaseData.quantity}kg of ${listing.crop_name} has been placed successfully. The farmer will contact you soon.`,
        });
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Payment Successful",
        description: `Your M-Pesa payment was successful! Transaction ID: ${transactionId}. Please contact the farmer directly.`,
      });
    }
    
    setIsOpen(false);
    // Reset form
    setPurchaseData({
      quantity: 1,
      deliveryLocation: '',
      deliveryDate: '',
      notes: '',
      buyerPhone: ''
    });
  };

  const handlePurchaseError = (error: string) => {
    toast({
      title: "Purchase Failed",
      description: error,
      variant: "destructive"
    });
  };

  const isFormValid = () => {
    return purchaseData.quantity > 0 && 
           purchaseData.quantity <= listing.quantity_kg &&
           purchaseData.deliveryLocation.trim() !== '' &&
           purchaseData.buyerPhone.trim() !== '';
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
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
              <Label htmlFor="quantity">Quantity (kg) *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max={listing.quantity_kg}
                value={purchaseData.quantity}
                onChange={(e) => setPurchaseData({
                  ...purchaseData, 
                  quantity: Math.min(Number(e.target.value) || 1, listing.quantity_kg)
                })}
              />
            </div>

            <div>
              <Label htmlFor="buyerPhone">Your Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="buyerPhone"
                  placeholder="254712345678"
                  value={purchaseData.buyerPhone}
                  onChange={(e) => setPurchaseData({...purchaseData, buyerPhone: e.target.value})}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">This will be used for M-Pesa payment and farmer contact</p>
            </div>

            <div>
              <Label htmlFor="deliveryLocation">Delivery Location *</Label>
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
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <Label htmlFor="notes">Special Instructions (Optional)</Label>
              <Input
                id="notes"
                placeholder="Any special requests or notes for the farmer"
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
          {isFormValid() ? (
            <MpesaServicePayment
              serviceName="Crop Purchase"
              amount={totalAmount}
              description={`Purchase ${purchaseData.quantity}kg of ${listing.crop_name} from ${listing.location}`}
              onSuccess={handleSuccessfulPurchase}
              onError={handlePurchaseError}
              buttonText={`Pay KSh ${totalAmount.toLocaleString()} via M-Pesa`}
            />
          ) : (
            <Button disabled className="w-full">
              Please fill in all required fields
            </Button>
          )}

          <div className="text-xs text-gray-500 text-center">
            <Truck className="h-3 w-3 inline mr-1" />
            Delivery charges may apply based on location. The farmer will contact you to arrange delivery.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
