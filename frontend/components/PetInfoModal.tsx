'use client';

import { useState } from 'react';

interface PetInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  petName: string;
  petType: string;
  onSubmit: (data: PetInfoData) => void;
}

interface PetInfoData {
  issues: string[];
  birthday: string;
  healthIssues: string;
}

const BEHAVIOR_TAGS = [
  'Hyper', 'Anxious', 'Sensitive', 'Friendly', 'Aggressive',
  'Hates needles', 'Biter', 'Shy', 'Fearful', 'Nervous'
];

export default function PetInfoModal({ isOpen, onClose, petName, petType, onSubmit }: PetInfoModalProps) {
  const [selectedBehaviors, setSelectedBehaviors] = useState<string[]>([]);
  const [birthday, setBirthday] = useState('');
  const [healthIssues, setHealthIssues] = useState('');

  if (!isOpen) return null;

  const toggleIssue = (issue: string) => {
    setSelectedBehaviors(prev => 
      prev.includes(issue) 
        ? prev.filter(b => b !== issue)
        : [...prev, issue]
    );
  };

  const handleSubmit = () => {
    onSubmit({
      issues: selectedBehaviors,
      birthday,
      healthIssues
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-2xl font-extrabold text-gray-900">Additional pet info</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Pet Name Card */}
          <div className="bg-blue-50 rounded-2xl p-4 mb-6 flex items-center gap-4">
            <div className="text-6xl">
              {petType.toLowerCase() === 'cat' ? '🐈' : '🐕'}
            </div>
            <div>
              <div className="font-bold text-gray-900 text-xl">{petName}</div>
              <div className="text-gray-600 text-sm">Add info</div>
            </div>
          </div>

          {/* Remove this section - we don't need name displayed twice */}
          {/* <h3 className="text-3xl font-extrabold text-gray-900 mb-8">{petName}</h3> */}

          {/* Issues Section */}
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-4 text-lg">Issues</label>
            <div className="grid grid-cols-2 gap-3">
              {BEHAVIOR_TAGS.map((issue) => (
                <button
                  key={issue}
                  onClick={() => toggleIssue(issue)}
                  className={`
                    px-4 py-3 rounded-xl font-semibold text-center transition-all
                    ${selectedBehaviors.includes(issue)
                      ? 'bg-blue-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }
                  `}
                >
                  {issue}
                </button>
              ))}
            </div>
          </div>

          {/* Birthday Section */}
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-4 text-lg">Birthday</label>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-gray-900"
              placeholder="MM / DD / YYYY"
            />
          </div>

          {/* Health Issues Section */}
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-4 text-lg">Health issues</label>
            <textarea
              value={healthIssues}
              onChange={(e) => setHealthIssues(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none text-gray-900 resize-none"
              placeholder="Any allergies, medications, special care needs..."
            />
          </div>

          {/* Continue Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-4 rounded-xl font-bold text-xl hover:bg-blue-600 transition-all hover:scale-105 shadow-lg"
          >
            Continue to service
          </button>
        </div>
      </div>
    </div>
  );
}

