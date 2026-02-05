 import { useState } from 'react';
 import { useTranslation } from 'react-i18next';
 import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { useMailchimpSubscribe } from '@/hooks/useMailchimpSubscribe';
 import { cn } from '@/lib/utils';
 
 interface NewsletterSignupProps {
   type: 'traveler' | 'operator';
   className?: string;
   showNameFields?: boolean;
   variant?: 'default' | 'compact';
 }
 
 const NewsletterSignup = ({ 
   type, 
   className, 
   showNameFields = false,
   variant = 'default'
 }: NewsletterSignupProps) => {
   const { t } = useTranslation();
   const [email, setEmail] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const { subscribe, isLoading, isSuccess, isError, errorCode, reset } = useMailchimpSubscribe();
 
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     
     if (!email.trim()) return;
     
     await subscribe(
       email.trim(),
       type,
       firstName.trim() || undefined,
       lastName.trim() || undefined
     );
   };
 
   const getErrorMessage = () => {
     switch (errorCode) {
       case 'already_subscribed':
         return t(`newsletter.${type}.alreadySubscribed`);
       case 'invalid_email':
         return t('newsletter.invalidEmail');
       default:
         return t('newsletter.error');
     }
   };
 
   const handleReset = () => {
     reset();
     setEmail('');
     setFirstName('');
     setLastName('');
   };
 
   // Success state
   if (isSuccess) {
     return (
       <div className={cn(
         "rounded-2xl p-6 text-center",
         "bg-accent/10 border border-accent/20",
         className
       )}>
         <CheckCircle className="h-12 w-12 text-accent mx-auto mb-4" />
         <h3 className="text-lg font-semibold text-foreground mb-2">
           {t(`newsletter.${type}.successTitle`)}
         </h3>
         <p className="text-muted-foreground">
           {t(`newsletter.${type}.successMessage`)}
         </p>
       </div>
     );
   }
 
   return (
     <div className={cn(
       "rounded-2xl p-6 md:p-8",
       "bg-card border border-border",
       className
     )}>
       <div className="flex items-center gap-3 mb-4">
         <div className="p-2 rounded-full bg-accent/10">
           <Mail className="h-5 w-5 text-accent" />
         </div>
         <div>
           <h3 className="text-lg font-semibold text-foreground font-heading">
             {t(`newsletter.${type}.title`)}
           </h3>
           {variant === 'default' && (
             <p className="text-sm text-muted-foreground">
               {t(`newsletter.${type}.subtitle`)}
             </p>
           )}
         </div>
       </div>
 
       <form onSubmit={handleSubmit} className="space-y-4">
         {showNameFields && (
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <Input
               type="text"
               placeholder={t('newsletter.firstName')}
               value={firstName}
               onChange={(e) => setFirstName(e.target.value)}
               className="input-jetleg"
               disabled={isLoading}
             />
             <Input
               type="text"
               placeholder={t('newsletter.lastName')}
               value={lastName}
               onChange={(e) => setLastName(e.target.value)}
               className="input-jetleg"
               disabled={isLoading}
             />
           </div>
         )}
 
         <div className="flex flex-col sm:flex-row gap-3">
           <Input
             type="email"
             placeholder={t('newsletter.emailPlaceholder')}
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="input-jetleg flex-1"
             disabled={isLoading}
             required
           />
           <Button 
             type="submit" 
             className="btn-jetleg-primary whitespace-nowrap"
             disabled={isLoading || !email.trim()}
           >
             {isLoading ? (
               <>
                 <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                 {t('newsletter.subscribing')}
               </>
             ) : (
               t('newsletter.subscribe')
             )}
           </Button>
         </div>
 
         {isError && (
           <div className="flex items-center gap-2 text-destructive text-sm">
             <AlertCircle className="h-4 w-4 flex-shrink-0" />
             <span>{getErrorMessage()}</span>
             <button 
               type="button" 
               onClick={handleReset}
               className="underline hover:no-underline ml-auto"
             >
               {t('newsletter.tryAgain')}
             </button>
           </div>
         )}
 
         <p className="text-xs text-muted-foreground">
           {t('newsletter.privacyNote')}
         </p>
       </form>
     </div>
   );
 };
 
 export default NewsletterSignup;