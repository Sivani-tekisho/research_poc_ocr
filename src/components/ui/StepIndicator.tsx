import React from 'react';
import { CheckCircle2, Circle, Camera, Cpu, User, FileText, Calendar } from 'lucide-react';

import type { CardScanStep } from '../../types/cardScanner';

type Step = CardScanStep;

interface StepIndicatorProps {
  currentStep: Step;
}

const stepConfig = [
  { key: 'landing', label: 'Start', icon: Circle },
  { key: 'capture', label: 'Capture', icon: Camera },
  { key: 'processing', label: 'Process', icon: Cpu },
  { key: 'selfie', label: 'Selfie', icon: User },
  { key: 'result', label: 'Results', icon: FileText },
  { key: 'meetingScheduler', label: 'Schedule', icon: Calendar },
  { key: 'confirmation', label: 'Done', icon: CheckCircle2 },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  const getCurrentStepIndex = () => {
    return stepConfig.findIndex(step => step.key === currentStep);
  };

  const currentIndex = getCurrentStepIndex();

  const getStepStatus = (index: number) => {
    if (index < currentIndex) return 'completed';
    if (index === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="bg-slate-800/30 backdrop-blur-sm border-b border-slate-700/50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Lines */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          {stepConfig.map((step, index) => {
            const status = getStepStatus(index);
            
            return (
              <div
                key={step.key}
                className={`h-1 flex-1 max-w-20 rounded-full transition-all duration-500 ${
                  status === 'completed'
                    ? 'bg-gradient-to-r from-green-400 to-green-500'
                    : status === 'current'
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500'
                    : 'bg-slate-700'
                }`}
              />
            );
          })}
        </div>

        {/* Step Labels */}
        <div className="flex items-center justify-between">
          {stepConfig.map((step, index) => {
            const status = getStepStatus(index);
            const Icon = status === 'completed' ? CheckCircle2 : step.icon;
            
            return (
              <div key={step.key} className="flex flex-col items-center min-w-0 flex-1">
                {/* Step Icon */}
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full mb-1 transition-all duration-300 ${
                    status === 'completed'
                      ? 'bg-green-500/20 text-green-400'
                      : status === 'current'
                      ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-cyan-400'
                      : 'text-slate-500'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {/* Step Label */}
                <p
                  className={`text-xs font-medium text-center ${
                    status === 'completed'
                      ? 'text-green-400'
                      : status === 'current'
                      ? 'text-cyan-400'
                      : 'text-slate-500'
                  }`}
                >
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Current Step Description */}
        <div className="mt-3 text-center">
          <p className="text-sm text-slate-400">
            {currentStep === 'landing' && 'Welcome! Ready to scan your business card?'}
            {currentStep === 'capture' && 'Position your business card and take a photo'}
            {currentStep === 'processing' && 'AI is analyzing your business card...'}
            {currentStep === 'selfie' && 'Take a quick selfie to complete your profile'}
            {currentStep === 'result' && 'Review extracted information and schedule meetings'}
            {currentStep === 'meetingScheduler' && 'Schedule a meeting with your new contact'}
            {currentStep === 'confirmation' && 'All done! Meeting request has been sent'}
          </p>
        </div>
      </div>
    </div>
  );
};