import React, { useState } from 'react';
import { FileUpload } from '@/components/ui/file-upload';
import { AnalysisResult } from './analysis-result';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Brain, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

interface AnalysisResult {
  sentiment: 'bullish' | 'bearish' | 'neutral';
  confidence: number;
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  entry_price?: number;
  stop_loss?: number;
  take_profit?: number;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH';
  timeframe: string;
  analysis: string;
  key_points: string[];
}

export const ChartAnalyzer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setResult(null);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
  };

  const analyzeChart = async () => {
    if (!selectedFile) {
      toast.error('Seleziona prima un file');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Simulate AI analysis (replace with actual AI service)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock analysis result
      const mockResult: AnalysisResult = {
        sentiment: 'bullish',
        confidence: 85,
        recommendation: 'BUY',
        entry_price: 42350.50,
        stop_loss: 41200.00,
        take_profit: 44500.00,
        risk_level: 'MEDIUM',
        timeframe: '4H',
        analysis: 'Il grafico mostra una chiara tendenza rialzista con un breakout sopra la resistenza chiave di $42,000. Il volume è in aumento e i pattern tecnici suggeriscono una continuazione del trend. La media mobile a 50 periodi sta supportando il prezzo, indicando un momentum positivo.',
        key_points: [
          'Breakout confermato sopra la resistenza di $42,000',
          'Volume in aumento supporta il movimento',
          'RSI in territorio positivo ma non ipercomprato',
          'Media mobile 50 agisce come supporto dinamico',
          'Pattern di bandiera rialzista completato'
        ]
      };
      
      setResult(mockResult);
      toast.success('Analisi completata con successo!');
    } catch (error) {
      toast.error('Errore durante l\'analisi');
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNewAnalysis = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
  };

  if (result) {
    return <AnalysisResult result={result} onNewAnalysis={handleNewAnalysis} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 rounded-full bg-gradient-primary">
            <Brain className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AI Trading Analyzer
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Carica il tuo grafico di trading e ricevi analisi avanzate e suggerimenti professionali dall'intelligenza artificiale
        </p>
      </div>

      {/* Upload Area */}
      <FileUpload
        onFileSelect={handleFileSelect}
        onFileRemove={handleFileRemove}
        selectedFile={selectedFile}
        accept="image/*"
      />

      {/* Preview */}
      {preview && (
        <Card className="bg-gradient-card border-border/50 shadow-card-custom">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BarChart3 className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold text-card-foreground">
                Anteprima Grafico
              </h3>
            </div>
            <div className="rounded-lg overflow-hidden border border-border/50">
              <img
                src={preview}
                alt="Chart preview"
                className="w-full h-auto max-h-96 object-contain bg-secondary/20"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Analyze Button */}
      {selectedFile && (
        <div className="flex justify-center">
          <Button
            onClick={analyzeChart}
            disabled={isAnalyzing}
            variant="trading"
            size="lg"
            className="min-w-48"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Analizzando...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-5 w-5" />
                Analizza Grafico
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};