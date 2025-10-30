import { motion } from 'framer-motion';
import { CheckCircle2, Calendar, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import type { UserInfo, LLMResponse } from '../../types/cardScanner';

interface ResultScreenProps {
  userInfo: UserInfo;
  llmResponse: LLMResponse | null;
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  selfieImage?: string | null;
  onScheduleMeeting: () => void;
  onScanAnother: () => void;
}

export function ResultScreen({ 
  userInfo, 
  llmResponse, 
  processingStatus,
  selfieImage,
  onScheduleMeeting, 
  onScanAnother 
}: ResultScreenProps) {
  const isCompleted = processingStatus === 'completed';

  return (
    <div className="flex-1 flex items-center justify-center p-4 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full mx-auto"
      >
        <Card>
          <div className="space-y-6">
            {/* Success Header */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="flex flex-col items-center text-center space-y-4"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-200">Card Processed Successfully!</h2>
                <p className="text-slate-400 mt-2">Information extracted from your business card</p>
              </div>
            </motion.div>

            {/* Processing Status */}
            <div className={`rounded-xl p-3 text-center text-sm font-medium ${
              processingStatus === 'completed' ? 'bg-green-500/10 text-green-400' :
              processingStatus === 'processing' ? 'bg-yellow-500/10 text-yellow-400' :
              processingStatus === 'failed' ? 'bg-red-500/10 text-red-400' :
              'bg-blue-500/10 text-blue-400'
            }`}>
              Status: {processingStatus.toUpperCase()}
            </div>

            {/* Profile Summary with Selfie */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Extracted Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                  <User className="w-5 h-5 text-cyan-400" />
                  Profile Information
                </h3>
                
                {userInfo && (
                  <div className="bg-slate-800/50 rounded-xl p-4 space-y-3">
                    {userInfo.name && (
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Name</p>
                        <p className="text-slate-200 font-medium">{userInfo.name}</p>
                      </div>
                    )}
                    
                    {userInfo.email && (
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Email</p>
                        <p className="text-slate-200 font-medium">{userInfo.email}</p>
                      </div>
                    )}
                    
                    {userInfo.phone && (
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Phone</p>
                        <p className="text-slate-200 font-medium">{userInfo.phone}</p>
                      </div>
                    )}
                    
                    {userInfo.company && (
                      <div>
                        <p className="text-xs text-slate-500 uppercase tracking-wide">Company</p>
                        <p className="text-slate-200 font-medium">{userInfo.company}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {!userInfo?.name && !userInfo?.email && !userInfo?.phone && !userInfo?.company && (
                  <p className="text-slate-400 italic">No contact information extracted</p>
                )}
              </div>

              {/* Selfie Display */}
              {selfieImage && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-400" />
                    Your Selfie
                  </h3>
                  <div className="bg-slate-800/50 rounded-xl p-4">
                    <div className="relative">
                      <img 
                        src={selfieImage} 
                        alt="Your selfie" 
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 right-2 bg-green-500 rounded-full p-1">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2 text-center">
                      Selfie captured successfully
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Confidence Score */}
            {llmResponse?.confidence_score !== undefined && (
              <div className="bg-slate-900/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-400">Confidence Score</p>
                  <p className="text-lg font-bold text-cyan-400">
                    {(llmResponse.confidence_score * 100).toFixed(0)}%
                  </p>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                    style={{ width: `${llmResponse.confidence_score * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button 
                variant="secondary" 
                onClick={onScanAnother}
                className="flex-1"
              >
                Scan Another Card
              </Button>
              <Button 
                onClick={onScheduleMeeting}
                disabled={!isCompleted || !userInfo.email}
                className="flex-1"
              >
                <Calendar className="w-4 h-4" />
                Schedule Meeting
              </Button>
            </div>

            {!userInfo.email && (
              <p className="text-amber-400 text-sm text-center">
                ⚠️ Email address required to schedule meetings
              </p>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
