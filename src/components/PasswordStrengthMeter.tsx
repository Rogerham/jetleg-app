import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
}

export interface PasswordCriteria {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
  special: boolean;
}

const checkPasswordCriteria = (password: string): PasswordCriteria => {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };
};

const calculateStrength = (criteria: PasswordCriteria): number => {
  const metCriteria = Object.values(criteria).filter(Boolean).length;
  return (metCriteria / 5) * 100;
};

const getStrengthLevel = (strength: number): { level: string; color: string } => {
  if (strength < 40) return { level: 'Zwak', color: 'bg-destructive' };
  if (strength < 80) return { level: 'Gemiddeld', color: 'bg-amber-500' };
  return { level: 'Sterk', color: 'bg-emerald-500' };
};

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  if (!password) return null;
  
  console.log('PasswordStrengthMeter rendering with password:', password ? 'has value' : 'empty');

  const criteria = checkPasswordCriteria(password);
  const strength = calculateStrength(criteria);
  const { level, color } = getStrengthLevel(strength);

  const criteriaList = [
    { key: 'length', text: 'Minimaal 8 karakters', met: criteria.length },
    { key: 'uppercase', text: 'Hoofdletter', met: criteria.uppercase },
    { key: 'lowercase', text: 'Kleine letter', met: criteria.lowercase },
    { key: 'number', text: 'Cijfer', met: criteria.number },
    { key: 'special', text: 'Speciaal teken (!@#$%^&*)', met: criteria.special },
  ];

  return (
    <div className="mt-3 space-y-3">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground">Wachtwoord sterkte:</span>
          <span className="text-sm font-medium text-foreground">{level}</span>
        </div>
        <div className="relative">
          <Progress value={strength} className="h-2" />
          <div 
            className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-300 ${color}`}
            style={{ width: `${strength}%` }}
          />
        </div>
      </div>
      
      <div className="space-y-1">
        {criteriaList.map((criterion) => (
          <div key={criterion.key} className="flex items-center gap-2 text-sm">
            {criterion.met ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            ) : (
              <XCircle className="h-4 w-4 text-muted-foreground" />
            )}
            <span className={criterion.met ? 'text-foreground' : 'text-muted-foreground'}>
              {criterion.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};