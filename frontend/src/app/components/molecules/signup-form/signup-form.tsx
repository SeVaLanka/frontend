'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Textbox } from '@/app/components/atoms/textbox/textbox';
import { RadioGroup, RadioOption } from '@/app/components/atoms/radio/radio';

export type UserRole = 'customer' | 'service-provider';

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  phone?: string;
}

export interface SignupFormProps {
  /** Initial form values */
  initialValues?: Partial<SignupFormData>;
  /** Callback when form is submitted */
  onSubmit?: (data: SignupFormData) => void;
  /** Whether the form is in loading state */
  loading?: boolean;
  /** Form validation errors */
  errors?: Partial<SignupFormData>;
  /** Custom className for the container */
  className?: string;
  /** Submit button text */
  submitText?: string;
  /** Whether to show terms and conditions checkbox */
  showTermsCheckbox?: boolean;
  /** Terms accepted value */
  termsAccepted?: boolean;
  /** Callback when terms checkbox changes */
  onTermsChange?: (checked: boolean) => void;
  /** Whether to show phone field */
  showPhoneField?: boolean;
  /** Size of form elements */
  size?: 'sm' | 'md' | 'lg';
  /** Available roles for selection */
  availableRoles?: UserRole[];
}

export const SignupForm: React.FC<SignupFormProps> = ({
  initialValues = {},
  onSubmit,
  loading = false,
  errors = {},
  className,
  submitText = 'Create Account',
  showTermsCheckbox = true,
  termsAccepted = false,
  onTermsChange,
  showPhoneField = true,
  size = 'md',
  availableRoles = ['customer', 'service-provider'],
}) => {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: initialValues.firstName || '',
    lastName: initialValues.lastName || '',
    email: initialValues.email || '',
    password: initialValues.password || '',
    confirmPassword: initialValues.confirmPassword || '',
    role: initialValues.role || 'customer',
    phone: initialValues.phone || '',
  });

  const handleInputChange = (field: keyof SignupFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleRoleChange = (role: string) => {
    setFormData(prev => ({
      ...prev,
      role: role as UserRole,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) {
      onSubmit?.(formData);
    }
  };

  const handleTermsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onTermsChange?.(e.target.checked);
  };

  const isFormValid = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.role &&
      (!showTermsCheckbox || termsAccepted)
    );
  };

  const roleOptions: RadioOption[] = availableRoles.map(role => ({
    value: role,
    label: role === 'customer' ? 'Customer' : 'Service Provider',
    description: role === 'customer' 
      ? 'I want to book services' 
      : 'I want to provide services',
  }));

  const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const EmailIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
    </svg>
  );

  const PasswordIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  const PhoneIcon = () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );

  return (
    <form onSubmit={handleSubmit} className={cn('w-full space-y-6', className)}>
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Textbox
          label="First Name"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={handleInputChange('firstName')}
          leftIcon={<UserIcon />}
          state={errors.firstName ? 'error' : 'default'}
          errorMessage={errors.firstName}
          size={size}
          disabled={loading}
          required
        />

        <Textbox
          label="Last Name"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={handleInputChange('lastName')}
          leftIcon={<UserIcon />}
          state={errors.lastName ? 'error' : 'default'}
          errorMessage={errors.lastName}
          size={size}
          disabled={loading}
          required
        />
      </div>

      {/* Email Field */}
      <Textbox
        label="Email Address"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleInputChange('email')}
        leftIcon={<EmailIcon />}
        state={errors.email ? 'error' : 'default'}
        errorMessage={errors.email}
        size={size}
        disabled={loading}
        required
      />

      {/* Phone Field (Optional) */}
      {showPhoneField && (
        <Textbox
          label="Phone Number"
          type="tel"
          placeholder="Enter your phone number"
          value={formData.phone}
          onChange={handleInputChange('phone')}
          leftIcon={<PhoneIcon />}
          state={errors.phone ? 'error' : 'default'}
          errorMessage={errors.phone}
          size={size}
          disabled={loading}
        />
      )}

      {/* Password Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Textbox
          label="Password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleInputChange('password')}
          leftIcon={<PasswordIcon />}
          state={errors.password ? 'error' : 'default'}
          errorMessage={errors.password}
          size={size}
          disabled={loading}
          required
        />

        <Textbox
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          leftIcon={<PasswordIcon />}
          state={errors.confirmPassword ? 'error' : 'default'}
          errorMessage={errors.confirmPassword}
          size={size}
          disabled={loading}
          required
        />
      </div>

      {/* Role Selection */}
      <RadioGroup
        label="I want to join as"
        options={roleOptions}
        value={formData.role}
        onChange={handleRoleChange}
        name="role"
        size={size}
        disabled={loading}
        direction="vertical"
      />

      {/* Terms and Conditions */}
      {showTermsCheckbox && (
        <div className="flex items-start">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={handleTermsChange}
            disabled={loading}
            className="h-4 w-4 mt-1 text-[#499537] focus:ring-[#499537]/20 border-gray-300 rounded"
          />
          <label className="ml-2 text-sm text-gray-700">
            I agree to the{' '}
            <a href="#" className="text-[#499537] hover:text-[#3a7a2e] font-medium">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-[#499537] hover:text-[#3a7a2e] font-medium">
              Privacy Policy
            </a>
          </label>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !isFormValid()}
        className={cn(
          'w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg',
          'text-white font-medium transition-all duration-200',
          'bg-[#499537] hover:bg-[#3a7a2e]',
          'focus:outline-none focus:ring-2 focus:ring-[#499537]/20 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          size === 'sm' && 'py-2 text-sm',
          size === 'lg' && 'py-4 text-lg'
        )}
      >
        {loading ? (
          <>
            <div className="animate-spin -ml-1 mr-3 h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
            Creating Account...
          </>
        ) : (
          submitText
        )}
      </button>
    </form>
  );
};

export default SignupForm;