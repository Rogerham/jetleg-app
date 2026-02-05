 import { useState } from 'react';
 import { supabase } from '@/integrations/supabase/client';
 
 type SubscribeType = 'traveler' | 'operator';
 type SubscribeStatus = 'idle' | 'loading' | 'success' | 'error';
 
 interface SubscribeResult {
   success: boolean;
   error?: string;
   type?: SubscribeType;
 }
 
 export const useMailchimpSubscribe = () => {
   const [status, setStatus] = useState<SubscribeStatus>('idle');
   const [errorCode, setErrorCode] = useState<string | null>(null);
 
   const subscribe = async (
     email: string,
     type: SubscribeType,
     firstName?: string,
     lastName?: string
   ): Promise<SubscribeResult> => {
     setStatus('loading');
     setErrorCode(null);
 
     try {
       const { data, error } = await supabase.functions.invoke<SubscribeResult>(
         'mailchimp-subscribe',
         {
           body: { email, type, firstName, lastName },
         }
       );
 
       if (error) {
         console.error('Supabase function error:', error);
         setStatus('error');
         setErrorCode('network_error');
         return { success: false, error: 'network_error' };
       }
 
       if (!data?.success) {
         setStatus('error');
         setErrorCode(data?.error || 'unknown_error');
         return { success: false, error: data?.error };
       }
 
       setStatus('success');
       return { success: true, type };
     } catch (err) {
       console.error('Subscribe error:', err);
       setStatus('error');
       setErrorCode('network_error');
       return { success: false, error: 'network_error' };
     }
   };
 
   const reset = () => {
     setStatus('idle');
     setErrorCode(null);
   };
 
   return {
     subscribe,
     reset,
     status,
     errorCode,
     isLoading: status === 'loading',
     isSuccess: status === 'success',
     isError: status === 'error',
   };
 };