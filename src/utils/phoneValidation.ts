/**
 * Phone number validation utilities for Kenyan phone numbers
 * Supports Safaricom (07XX), Airtel (073X, 078X), and Telkom (077X) formats
 */

export const KENYAN_PHONE_REGEX = /^(\+?254|0)([17][0-9]{8})$/;
export const MPESA_PHONE_REGEX = /^(\+?254|0)(7[0-9]{8})$/;

/**
 * Validates if a phone number is a valid Kenyan format
 * @param phoneNumber - The phone number to validate
 * @returns boolean indicating if the phone number is valid
 */
export const isValidKenyanPhone = (phoneNumber: string): boolean => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false;
  }
  
  const cleaned = phoneNumber.replace(/\s+/g, '');
  return KENYAN_PHONE_REGEX.test(cleaned);
};

/**
 * Validates if a phone number is a valid M-Pesa number (mobile numbers only)
 * @param phoneNumber - The phone number to validate
 * @returns boolean indicating if the phone number is valid for M-Pesa
 */
export const isValidMpesaPhone = (phoneNumber: string): boolean => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return false;
  }
  
  const cleaned = phoneNumber.replace(/\s+/g, '');
  return MPESA_PHONE_REGEX.test(cleaned);
};

/**
 * Formats a Kenyan phone number to the standard +254 format
 * @param phoneNumber - The phone number to format
 * @returns Formatted phone number or null if invalid
 */
export const formatKenyanPhone = (phoneNumber: string): string | null => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return null;
  }
  
  const cleaned = phoneNumber.replace(/\s+/g, '');
  const match = cleaned.match(/^(\+?254|0)([17][0-9]{8})$/);
  
  if (!match) {
    return null;
  }
  
  return `+254${match[2]}`;
};

/**
 * Formats a phone number for M-Pesa (254XXXXXXXXX format without + symbol)
 * @param phoneNumber - The phone number to format
 * @returns M-Pesa formatted phone number or null if invalid
 */
export const formatMpesaPhone = (phoneNumber: string): string | null => {
  if (!isValidMpesaPhone(phoneNumber)) {
    return null;
  }
  
  const cleaned = phoneNumber.replace(/\s+/g, '');
  const match = cleaned.match(/^(\+?254|0)(7[0-9]{8})$/);
  
  if (!match) {
    return null;
  }
  
  return `254${match[2]}`;
};

/**
 * Gets validation error message for phone numbers
 * @param phoneNumber - The phone number to validate
 * @param requireMpesa - Whether to require M-Pesa compatibility
 * @returns Error message or null if valid
 */
export const getPhoneValidationError = (
  phoneNumber: string, 
  requireMpesa: boolean = false
): string | null => {
  if (!phoneNumber || phoneNumber.trim() === '') {
    return 'Phone number is required';
  }
  
  const cleaned = phoneNumber.replace(/\s+/g, '');
  
  if (requireMpesa) {
    if (!isValidMpesaPhone(cleaned)) {
      return 'Please enter a valid M-Pesa phone number (07XXXXXXXX or +2547XXXXXXXX)';
    }
  } else {
    if (!isValidKenyanPhone(cleaned)) {
      return 'Please enter a valid Kenyan phone number (07XXXXXXXX, 01XXXXXXXX, or +254...)';
    }
  }
  
  return null;
};

/**
 * Auto-formats phone number as user types
 * @param value - Current input value
 * @param previousValue - Previous input value
 * @returns Formatted value for display
 */
export const formatPhoneInput = (value: string, previousValue: string = ''): string => {
  // Remove all non-numeric characters except +
  const numeric = value.replace(/[^\d+]/g, '');
  
  // If user is typing and starts with 0, allow it
  if (numeric.startsWith('0') && numeric.length <= 10) {
    return numeric.replace(/(\d{3})(\d{3})(\d{3,4})/, '$1 $2 $3').trim();
  }
  
  // If user is typing and starts with +254
  if (numeric.startsWith('+254') && numeric.length <= 13) {
    const mainPart = numeric.slice(4);
    if (mainPart.length > 0) {
      return `+254 ${mainPart.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3').trim()}`;
    }
    return '+254';
  }
  
  // If user is typing and starts with 254
  if (numeric.startsWith('254') && numeric.length <= 12) {
    const mainPart = numeric.slice(3);
    if (mainPart.length > 0) {
      return `+254 ${mainPart.replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3').trim()}`;
    }
    return '+254';
  }
  
  return value;
};