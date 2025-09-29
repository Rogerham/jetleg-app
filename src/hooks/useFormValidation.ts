import { useState, useCallback } from 'react';
import { z } from 'zod';

export interface ValidationError {
  field: string;
  message: string;
}

export interface UseFormValidationReturn<T> {
  errors: ValidationError[];
  validateField: (field: keyof T, value: any) => boolean;
  validateForm: (data: T) => boolean;
  clearErrors: () => void;
  getFieldError: (field: keyof T) => string | undefined;
}

export function useFormValidation<T extends Record<string, any>>(schema: z.ZodObject<any>): UseFormValidationReturn<T> {
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const validateField = useCallback((field: keyof T, value: any): boolean => {
    try {
      // For single field validation, we'll create a partial schema
      const partialSchema = schema.partial();
      const testData = { [field]: value } as Partial<T>;
      partialSchema.parse(testData);
      
      // Remove any existing errors for this field
      setErrors(prev => prev.filter(error => error.field !== field as string));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.issues.filter(issue => 
          issue.path.length > 0 && issue.path[0] === field
        );
        
        if (fieldErrors.length > 0) {
          setErrors(prev => [
            ...prev.filter(e => e.field !== field as string),
            { field: field as string, message: fieldErrors[0].message }
          ]);
        }
      }
      return false;
    }
  }, [schema]);

  const validateForm = useCallback((data: T): boolean => {
    try {
      schema.parse(data);
      setErrors([]);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors = error.issues.map(issue => ({
          field: issue.path.join('.'),
          message: issue.message
        }));
        setErrors(validationErrors);
      }
      return false;
    }
  }, [schema]);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const getFieldError = useCallback((field: keyof T): string | undefined => {
    return errors.find(error => error.field === field as string)?.message;
  }, [errors]);

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    getFieldError
  };
}