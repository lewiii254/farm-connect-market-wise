import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Camera, 
  Upload, 
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Leaf,
  Bug,
  Droplets,
  TrendingUp,
  FileText,
  Info
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DiagnosisResult {
  condition: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  treatment: string[];
  prevention: string[];
}

const CropHealthDiagnostics = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);

  // Sample diagnosis data for demonstration
  const sampleDiagnoses: DiagnosisResult[] = [
    {
      condition: 'Early Blight (Alternaria)',
      confidence: 92,
      severity: 'medium',
      description: 'Fungal disease causing brown spots with concentric rings on leaves. Common in tomatoes and potatoes during warm, humid conditions.',
      treatment: [
        'Apply copper-based fungicide (e.g., Bordeaux mixture)',
        'Remove and destroy infected leaves immediately',
        'Spray with chlorothalonil every 7-10 days',
        'Ensure good air circulation around plants'
      ],
      prevention: [
        'Practice crop rotation (3-year minimum)',
        'Use disease-resistant varieties',
        'Avoid overhead watering',
        'Mulch to prevent soil splash on leaves',
        'Space plants properly for air circulation'
      ]
    },
    {
      condition: 'Healthy Crop',
      confidence: 95,
      severity: 'low',
      description: 'Your crop appears healthy with no visible signs of disease or pest damage. Continue current management practices.',
      treatment: [
        'No treatment required',
        'Continue regular monitoring',
        'Maintain current care routine'
      ],
      prevention: [
        'Continue good agricultural practices',
        'Regular inspection for early problem detection',
        'Maintain balanced fertilization',
        'Ensure adequate irrigation'
      ]
    },
    {
      condition: 'Aphid Infestation',
      confidence: 88,
      severity: 'medium',
      description: 'Sap-sucking insects causing leaf curling and stunted growth. Can transmit viral diseases.',
      treatment: [
        'Spray with neem oil solution (2-3 times per week)',
        'Apply insecticidal soap',
        'Introduce beneficial insects (ladybugs, lacewings)',
        'Use strong water spray to dislodge aphids'
      ],
      prevention: [
        'Plant companion plants (marigolds, garlic)',
        'Use reflective mulch',
        'Encourage natural predators',
        'Avoid over-fertilization with nitrogen'
      ]
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setDiagnosis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeCrop = () => {
    setIsAnalyzing(true);
    // Simulate AI analysis delay
    setTimeout(() => {
      // Randomly select a diagnosis for demonstration
      const randomDiagnosis = sampleDiagnoses[Math.floor(Math.random() * sampleDiagnoses.length)];
      setDiagnosis(randomDiagnosis);
      setIsAnalyzing(false);
    }, 2500);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low':
        return <CheckCircle className="h-4 w-4" />;
      case 'medium':
        return <AlertTriangle className="h-4 w-4" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const features = [
    {
      icon: Camera,
      title: 'AI-Powered Analysis',
      description: 'Advanced machine learning models trained on 100,000+ crop images'
    },
    {
      icon: Bug,
      title: 'Pest Detection',
      description: 'Identifies 50+ common pests affecting Kenyan crops'
    },
    {
      icon: Leaf,
      title: 'Disease Recognition',
      description: 'Detects 80+ plant diseases with 90%+ accuracy'
    },
    {
      icon: Droplets,
      title: 'Nutrient Deficiency',
      description: 'Analyzes leaf color and patterns for nutrient issues'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-600 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-2xl">AI Crop Health Diagnostics</CardTitle>
              <CardDescription className="text-base">
                Upload a photo of your crop for instant disease and pest detection
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature) => (
          <Card key={feature.title} className="border-gray-200">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 bg-green-100 rounded-full mb-3">
                  <feature.icon className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Crop Image</CardTitle>
          <CardDescription>
            Take a clear photo of the affected plant part (leaf, stem, or fruit)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-green-500 transition-colors">
            {selectedImage ? (
              <div className="w-full space-y-4">
                <img 
                  src={selectedImage} 
                  alt="Uploaded crop" 
                  className="max-h-96 mx-auto rounded-lg shadow-md"
                />
                <div className="flex gap-3 justify-center">
                  <label htmlFor="image-upload">
                    <Button variant="outline" className="cursor-pointer" asChild>
                      <span>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Different Image
                      </span>
                    </Button>
                  </label>
                  <Button 
                    onClick={analyzeCrop}
                    disabled={isAnalyzing}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Analyze Crop Health
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <label htmlFor="image-upload" className="cursor-pointer text-center">
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Click to upload crop image
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG up to 10MB
                </p>
              </label>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              For best results: Use good lighting, focus on the affected area, and take photos from multiple angles
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Diagnosis Results */}
      {diagnosis && (
        <Card className="border-2 border-green-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl">Diagnosis Results</CardTitle>
              <Badge className={`${getSeverityColor(diagnosis.severity)} border`}>
                <span className="flex items-center gap-1">
                  {getSeverityIcon(diagnosis.severity)}
                  {diagnosis.severity.toUpperCase()} SEVERITY
                </span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Condition & Confidence */}
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-green-900">{diagnosis.condition}</h3>
                <Badge variant="outline" className="bg-white">
                  {diagnosis.confidence}% Confidence
                </Badge>
              </div>
              <p className="text-gray-700">{diagnosis.description}</p>
            </div>

            {/* Treatment Recommendations */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Recommended Treatment</h3>
              </div>
              <ul className="space-y-2">
                {diagnosis.treatment.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 bg-blue-50 p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prevention Tips */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold">Prevention Strategies</h3>
              </div>
              <ul className="space-y-2">
                {diagnosis.prevention.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 bg-green-50 p-3 rounded-lg">
                    <Leaf className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button className="bg-green-600 hover:bg-green-700">
                <FileText className="h-4 w-4 mr-2" />
                Save Diagnosis Report
              </Button>
              <Button variant="outline">
                <Info className="h-4 w-4 mr-2" />
                Consult Expert
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">100,000+</div>
              <div className="text-sm text-gray-600">Training Images</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">93%</div>
              <div className="text-sm text-gray-600">Accuracy Rate</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">130+</div>
              <div className="text-sm text-gray-600">Conditions Detected</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CropHealthDiagnostics;
