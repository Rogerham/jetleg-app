import { z } from 'zod';

// Authentication validation schemas
export const loginSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must be less than 128 characters" })
});

export const registerSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "First name can only contain letters, spaces, hyphens and apostrophes" }),
  lastName: z.string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Last name can only contain letters, spaces, hyphens and apostrophes" }),
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string()
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(20, { message: "Phone number must be less than 20 characters" })
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, { message: "Please enter a valid phone number" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must be less than 128 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" }),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Contact form validation schema
export const contactSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Name can only contain letters, spaces, hyphens and apostrophes" }),
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  subject: z.string()
    .trim()
    .min(1, { message: "Subject is required" })
    .max(200, { message: "Subject must be less than 200 characters" }),
  message: z.string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(2000, { message: "Message must be less than 2000 characters" })
});

// Booking form validation schema
export const bookingSchema = z.object({
  passengers: z.array(z.object({
    firstName: z.string()
      .trim()
      .min(1, { message: "First name is required" })
      .max(50, { message: "First name must be less than 50 characters" })
      .regex(/^[a-zA-Z\s'-]+$/, { message: "First name can only contain letters, spaces, hyphens and apostrophes" }),
    lastName: z.string()
      .trim()
      .min(1, { message: "Last name is required" })
      .max(50, { message: "Last name must be less than 50 characters" })
      .regex(/^[a-zA-Z\s'-]+$/, { message: "Last name can only contain letters, spaces, hyphens and apostrophes" }),
    email: z.string()
      .trim()
      .email({ message: "Please enter a valid email address" })
      .max(255, { message: "Email must be less than 255 characters" }),
    phone: z.string()
      .trim()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .max(20, { message: "Phone number must be less than 20 characters" })
      .regex(/^[\+]?[0-9\s\-\(\)]+$/, { message: "Please enter a valid phone number" }),
    dateOfBirth: z.string()
      .min(1, { message: "Date of birth is required" }),
    passportNumber: z.string()
      .trim()
      .min(6, { message: "Passport number must be at least 6 characters" })
      .max(20, { message: "Passport number must be less than 20 characters" })
      .regex(/^[A-Z0-9]+$/, { message: "Passport number can only contain uppercase letters and numbers" })
  })).min(1, { message: "At least one passenger is required" }),
  
  // Payment validation
  cardNumber: z.string()
    .trim()
    .regex(/^[0-9\s]+$/, { message: "Card number can only contain numbers and spaces" })
    .min(13, { message: "Card number must be at least 13 digits" })
    .max(19, { message: "Card number must be less than 19 digits" }),
  expiryDate: z.string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry date must be in MM/YY format" }),
  cvv: z.string()
    .trim()
    .regex(/^[0-9]{3,4}$/, { message: "CVV must be 3 or 4 digits" }),
  cardholderName: z.string()
    .trim()
    .min(1, { message: "Cardholder name is required" })
    .max(100, { message: "Cardholder name must be less than 100 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Cardholder name can only contain letters, spaces, hyphens and apostrophes" })
});

// Profile update validation schema
export const profileUpdateSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "First name can only contain letters, spaces, hyphens and apostrophes" }),
  lastName: z.string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less than 50 characters" })
    .regex(/^[a-zA-Z\s'-]+$/, { message: "Last name can only contain letters, spaces, hyphens and apostrophes" }),
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string()
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(20, { message: "Phone number must be less than 20 characters" })
    .regex(/^[\+]?[0-9\s\-\(\)]+$/, { message: "Please enter a valid phone number" })
    .optional()
});

// Password change validation schema
export const passwordChangeSchema = z.object({
  currentPassword: z.string()
    .min(1, { message: "Current password is required" }),
  newPassword: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(128, { message: "Password must be less than 128 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, { message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" }),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Forgot password validation schema
export const forgotPasswordSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" })
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;