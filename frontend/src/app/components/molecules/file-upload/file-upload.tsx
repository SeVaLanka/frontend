'use client';

import React, { useCallback } from 'react';
import { cn } from '@/lib/utils';

export interface FileUploadProps {
  /** Accept file types */
  accept?: string;
  /** Multiple file selection */
  multiple?: boolean;
  /** Maximum file size in MB */
  maxSize?: number;
  /** File upload handler */
  onFileSelect: (files: File[]) => void;
  /** Loading state */
  loading?: boolean;
  /** Custom className */
  className?: string;
  /** Upload text */
  uploadText?: string;
  /** Browse text */
  browseText?: string;
  /** Disabled state */
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept = ".pdf,.jpg,.jpeg,.png,.doc,.docx",
  multiple = true,
  maxSize = 10,
  onFileSelect,
  loading = false,
  className,
  uploadText = "Drag & drop files here or",
  browseText = "Browse Files",
  disabled = false,
}) => {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !loading) {
      setIsDragOver(true);
    }
  }, [disabled, loading]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled || loading) return;

    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => {
      const sizeInMB = file.size / (1024 * 1024);
      return sizeInMB <= maxSize;
    });

    if (validFiles.length > 0) {
      onFileSelect(validFiles);
    }
  }, [disabled, loading, maxSize, onFileSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const sizeInMB = file.size / (1024 * 1024);
      return sizeInMB <= maxSize;
    });

    if (validFiles.length > 0) {
      onFileSelect(validFiles);
    }

    // Reset input
    e.target.value = '';
  }, [maxSize, onFileSelect]);

  return (
    <div
      className={cn(
        'border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200',
        isDragOver && !disabled && !loading 
          ? 'border-[#499537] bg-[#499537]/5' 
          : 'border-gray-300 hover:border-gray-400',
        disabled && 'opacity-50 cursor-not-allowed',
        loading && 'opacity-75',
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center space-y-4">
        {/* Upload Icon */}
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
          {loading ? (
            <svg className="w-8 h-8 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          )}
        </div>

        {/* Upload Text */}
        <div className="space-y-2">
          <p className="text-gray-600">
            {loading ? 'Uploading...' : uploadText}
          </p>
          
          {!loading && (
            <label className="inline-block">
              <input
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleFileSelect}
                disabled={disabled}
                className="hidden"
              />
              <span className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors">
                {browseText}
              </span>
            </label>
          )}
        </div>

        {/* File Info */}
        <p className="text-xs text-gray-500">
          Maximum file size: {maxSize}MB
        </p>
      </div>
    </div>
  );
};

export default FileUpload;