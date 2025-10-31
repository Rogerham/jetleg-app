import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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

const getStrengthLevel = (strength: number, t: any): { level: string; color: string } => {
  if (strength < 40) return { level: t('passwordStrength.weak'), color: 'bg-destructive' };
  if (strength < 80) return { level: t('passwordStrength.medium'), color: 'bg-amber-500' };
  return { level: t('passwordStrength.strong'), color: 'bg-emerald-500' };
};

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const { t } = useTranslation();
  
  if (!password) return null;

  const criteria = checkPasswordCriteria(password);
  const strength = calculateStrength(criteria);
  const { level, color } = getStrengthLevel(strength, t);

  const criteriaList = [
    { key: 'length', text: t('passwordStrength.minLength'), met: criteria.length },
    { key: 'uppercase', text: t('passwordStrength.uppercase'), met: criteria.uppercase },
    { key: 'lowercase', text: t('passwordStrength.lowercase'), met: criteria.lowercase },
    { key: 'number', text: t('passwordStrength.number'), met: criteria.number },
    { key: 'special', text: t('passwordStrength.special'), met: criteria.special },
  ];

  return (
    <div className="mt-3 space-y-3">
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground">{t('passwordStrength.label')}</span>
          <span className="text-sm font-medium text-foreground">{level}</span>
        </div>
        <div className="relative w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-300 ${color}`}
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