import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, AlertTriangle, Target, DollarSign, Clock } from 'lucide-react';

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

interface AnalysisResultProps {
  result: AnalysisResult;
  onNewAnalysis: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ 
  result, 
  onNewAnalysis 
}) => {
  const getSentimentIcon = () => {
    switch (result.sentiment) {
      case 'bullish':
        return <TrendingUp className="h-6 w-6 text-trading-buy" />;
      case 'bearish':
        return <TrendingDown className="h-6 w-6 text-trading-sell" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-trading-warning" />;
    }
  };

  const getRecommendationColor = () => {
    switch (result.recommendation) {
      case 'BUY':
        return 'bg-trading-buy/10 text-trading-buy border-trading-buy/20';
      case 'SELL':
        return 'bg-trading-sell/10 text-trading-sell border-trading-sell/20';
      default:
        return 'bg-trading-warning/10 text-trading-warning border-trading-warning/20';
    }
  };

  const getRiskColor = () => {
    switch (result.risk_level) {
      case 'LOW':
        return 'bg-trading-buy/10 text-trading-buy';
      case 'MEDIUM':
        return 'bg-trading-warning/10 text-trading-warning';
      case 'HIGH':
        return 'bg-trading-sell/10 text-trading-sell';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-card border-border/50 shadow-card-custom">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {getSentimentIcon()}
              <div>
                <h2 className="text-2xl font-bold text-card-foreground">
                  Analisi Completata
                </h2>
                <p className="text-muted-foreground">
                  Confidenza: {Math.round(result.confidence)}%
                </p>
              </div>
            </div>
            
            <Badge className={getRecommendationColor()}>
              {result.recommendation}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-secondary/20">
              <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Timeframe</p>
              <p className="font-semibold text-card-foreground">{result.timeframe}</p>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-secondary/20">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Rischio</p>
              <Badge className={getRiskColor()}>
                {result.risk_level}
              </Badge>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-secondary/20">
              <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Sentiment</p>
              <p className="font-semibold text-card-foreground capitalize">
                {result.sentiment}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Trading Levels */}
      {(result.entry_price || result.stop_loss || result.take_profit) && (
        <Card className="bg-gradient-card border-border/50 shadow-card-custom">
          <div className="p-6">
            <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-primary" />
              Livelli di Trading
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.entry_price && (
                <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                  <p className="text-sm text-muted-foreground">Entry Price</p>
                  <p className="text-xl font-bold text-primary">
                    ${result.entry_price.toFixed(2)}
                  </p>
                </div>
              )}
              
              {result.stop_loss && (
                <div className="p-4 rounded-lg border border-trading-sell/20 bg-trading-sell/5">
                  <p className="text-sm text-muted-foreground">Stop Loss</p>
                  <p className="text-xl font-bold text-trading-sell">
                    ${result.stop_loss.toFixed(2)}
                  </p>
                </div>
              )}
              
              {result.take_profit && (
                <div className="p-4 rounded-lg border border-trading-buy/20 bg-trading-buy/5">
                  <p className="text-sm text-muted-foreground">Take Profit</p>
                  <p className="text-xl font-bold text-trading-buy">
                    ${result.take_profit.toFixed(2)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* Analysis */}
      <Card className="bg-gradient-card border-border/50 shadow-card-custom">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Analisi Dettagliata
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {result.analysis}
          </p>
          
          {result.key_points.length > 0 && (
            <div>
              <h4 className="font-medium text-card-foreground mb-3">
                Punti Chiave:
              </h4>
              <ul className="space-y-2">
                {result.key_points.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Card>

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <Button onClick={onNewAnalysis} variant="trading" size="lg">
          Nuova Analisi
        </Button>
      </div>
    </div>
  );
};