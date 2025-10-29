import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Building2, 
  Award, 
  Briefcase, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  X,
  ChevronRight
} from 'lucide-react';

export interface ScannedPersonData {
  // Basic Info
  name?: string;
  title?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  
  // Enhanced Details
  companies?: {
    name: string;
    position: string;
    duration: string;
    description?: string;
  }[];
  
  awards?: {
    title: string;
    organization: string;
    year: string;
    description?: string;
  }[];
  
  industry?: string;
  skills?: string[];
  education?: {
    degree: string;
    institution: string;
    year: string;
  }[];
  
  socialProfiles?: {
    platform: string;
    url: string;
  }[];
  
  summary?: string;
  lastScanned?: string;
}

interface SummaryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  scannedData: ScannedPersonData | null;
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({
  isOpen,
  onClose,
  scannedData
}) => {
  if (!scannedData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 h-full w-96 bg-slate-800/95 backdrop-blur-xl border-l border-slate-700/50 z-40 overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-700/50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Contact Summary
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5 text-slate-300" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-200">
                    {scannedData.name || 'Unknown Person'}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {scannedData.title || 'No title available'}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                {scannedData.email && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{scannedData.email}</span>
                  </div>
                )}
                {scannedData.phone && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{scannedData.phone}</span>
                  </div>
                )}
                {scannedData.address && (
                  <div className="flex items-center gap-3 text-slate-300">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{scannedData.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Current Company */}
            {scannedData.company && (
              <div className="bg-slate-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-purple-400" />
                  <h4 className="font-medium text-slate-200">Current Company</h4>
                </div>
                <p className="text-slate-300">{scannedData.company}</p>
                {scannedData.industry && (
                  <p className="text-slate-400 text-sm mt-1">Industry: {scannedData.industry}</p>
                )}
              </div>
            )}

            {/* Work History */}
            {scannedData.companies && scannedData.companies.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 font-medium text-slate-200 mb-3">
                  <Briefcase className="w-5 h-5 text-cyan-400" />
                  Work Experience
                </h4>
                <div className="space-y-3">
                  {scannedData.companies.map((company, index) => (
                    <div key={index} className="bg-slate-700/20 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-slate-200">{company.position}</h5>
                          <p className="text-slate-300 text-sm">{company.name}</p>
                          <p className="text-slate-400 text-xs">{company.duration}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 mt-1" />
                      </div>
                      {company.description && (
                        <p className="text-slate-400 text-xs mt-2">{company.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Awards & Recognition */}
            {scannedData.awards && scannedData.awards.length > 0 && (
              <div>
                <h4 className="flex items-center gap-2 font-medium text-slate-200 mb-3">
                  <Award className="w-5 h-5 text-yellow-400" />
                  Awards & Recognition
                </h4>
                <div className="space-y-3">
                  {scannedData.awards.map((award, index) => (
                    <div key={index} className="bg-slate-700/20 rounded-lg p-3">
                      <h5 className="font-medium text-slate-200">{award.title}</h5>
                      <p className="text-slate-300 text-sm">{award.organization}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <p className="text-slate-400 text-xs">{award.year}</p>
                      </div>
                      {award.description && (
                        <p className="text-slate-400 text-xs mt-2">{award.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {scannedData.skills && scannedData.skills.length > 0 && (
              <div>
                <h4 className="font-medium text-slate-200 mb-3">Skills & Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {scannedData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full text-xs text-slate-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Summary */}
            {scannedData.summary && (
              <div className="bg-gradient-to-br from-slate-700/30 to-slate-600/20 rounded-lg p-4 border border-slate-600/30">
                <h4 className="font-medium text-slate-200 mb-2">AI Summary</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{scannedData.summary}</p>
              </div>
            )}

            {/* Last Scanned */}
            {scannedData.lastScanned && (
              <div className="text-center pt-4 border-t border-slate-700/50">
                <p className="text-slate-400 text-xs">
                  Last scanned: {scannedData.lastScanned}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};