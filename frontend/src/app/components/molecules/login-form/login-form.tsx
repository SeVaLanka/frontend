'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Textbox } from '@/app/components/atoms/textbox/textbox';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormProps {
  /** Initial form values */
  initialValues?: Partial<LoginFormData>;
  /** Callback when form is submitted */
  onSubmit?: (data: LoginFormData) => void;
  /** Whether the form is in loading state */
  loading?: boolean;
  /** Form validation errors */
  errors?: Partial<LoginFormData>;
  /** Custom className for the container */
  className?: string;
  /** Submit button text */
  submitText?: string;
  /** Whether to show remember me checkbox */
  showRememberMe?: boolean;
  /** Remember me value */
  rememberMe?: boolean;
  /** Callback when remember me changes */
  onRememberMeChange?: (checked: boolean) => void;
  /** Whether to show forgot password link */
  showForgotPassword?: boolean;
  /** Callback when forgot password is clicked */
  onForgotPassword?: () => void;
  /** Size of form elements */
  size?: 'sm' | 'md' | 'lg';
}

export const LoginForm: React.FC<LoginFormProps> = ({
  initialValues = {},
  onSubmit,
  loading = false,
  errors = {},
  className,
  submitText = 'Sign In',
  showRememberMe = true,
  rememberMe = false,
  onRememberMeChange,
  showForgotPassword = true,
  onForgotPassword,
  size = 'md',
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: initialValues.email || '',
    password: initialValues.password || '',
  });

  const handleInputChange = (field: keyof LoginFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loading) {
      onSubmit?.(formData);
    }
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onRememberMeChange?.(e.target.checked);
  };

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

  return (
    <form onSubmit={handleSubmit} className={cn('w-full space-y-6', className)}>
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

      {/* Password Field */}
      <Textbox
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleInputChange('password')}
        leftIcon={<PasswordIcon />}
        state={errors.password ? 'error' : 'default'}
        errorMessage={errors.password}
        size={size}
        disabled={loading}
        required
      />

      {/* Remember Me & Forgot Password */}
      {(showRememberMe || showForgotPassword) && (
        <div className="flex items-center justify-between">
          {showRememberMe && (
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                disabled={loading}
                className="h-4 w-4 text-[#499537] focus:ring-[#499537]/20 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Remember me</span>
            </label>
          )}

          {showForgotPassword && (
            <button
              type="button"
              onClick={onForgotPassword}
              disabled={loading}
              className={cn(
                'text-sm font-medium transition-colors duration-200',
                'text-[#499537] hover:text-[#3a7a2e]',
                'focus:outline-none focus:underline',
                loading && 'opacity-50 cursor-not-allowed'
              )}
            >
              Forgot password?
            </button>
          )}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !formData.email || !formData.password}
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
            Signing in...
          </>
        ) : (
          submitText
        )}
      </button>
    </form>
  );
};

export default LoginForm;