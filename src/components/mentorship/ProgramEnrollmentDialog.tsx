
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { UserPlus, CreditCard, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Program {
  title: string;
  duration: string;
  nextStart: string;
  benefits: string[];
}

interface ProgramEnrollmentDialogProps {
  program: Program;
  trigger: React.ReactNode;
}

export const ProgramEnrollmentDialog = ({ program, trigger }: ProgramEnrollmentDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    phone: '',
    location: '',
    farmingExperience: '',
    goals: '',
    hasSmartphone: false,
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.phone || !formData.location || !formData.agreeToTerms) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and agree to terms.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate enrollment process
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    toast({
      title: "Enrollment Successful!",
      description: `You've been enrolled in "${program.title}". You'll receive a confirmation SMS with program details.`,
    });
    
    setIsOpen(false);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-green-600" />
            Enroll in {program.title}
          </DialogTitle>
          <DialogDescription>
            Join our youth development program and transform your agricultural journey.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Program Summary */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">{program.title}</h4>
            <div className="text-sm text-green-700 space-y-1">
              <p>Duration: {program.duration}</p>
              <p>Next Start: {program.nextStart}</p>
              <p className="font-medium">Program is FREE for youth aged 18-30!</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-3">
            <h4 className="font-semibold">Personal Information</h4>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="35"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="0712345678"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="location">Location/County *</Label>
              <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your county" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nairobi">Nairobi</SelectItem>
                  <SelectItem value="kiambu">Kiambu</SelectItem>
                  <SelectItem value="nakuru">Nakuru</SelectItem>
                  <SelectItem value="meru">Meru</SelectItem>
                  <SelectItem value="uasin-gishu">Uasin Gishu</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="experience">Farming Experience</Label>
              <Select value={formData.farmingExperience} onValueChange={(value) => handleInputChange('farmingExperience', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No experience</SelectItem>
                  <SelectItem value="beginner">Less than 1 year</SelectItem>
                  <SelectItem value="intermediate">1-3 years</SelectItem>
                  <SelectItem value="experienced">3+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="goals">Your Goals & Expectations</Label>
              <Textarea
                id="goals"
                placeholder="What do you hope to achieve from this program?"
                value={formData.goals}
                onChange={(e) => handleInputChange('goals', e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Requirements */}
          <div className="space-y-3">
            <h4 className="font-semibold">Requirements</h4>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="smartphone"
                checked={formData.hasSmartphone}
                onCheckedChange={(checked) => handleInputChange('hasSmartphone', checked as boolean)}
              />
              <Label htmlFor="smartphone" className="text-sm">
                I have access to a smartphone for digital learning
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm">
                I agree to attend all sessions and complete program requirements *
              </Label>
            </div>
          </div>

          <Button 
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enrolling...' : 'Complete Enrollment (FREE)'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
