'use client';

import React, { useState } from 'react';
import ServiceProviderLayout from '../../components/organism/service-provider-layout/service-provider-layout';
import FileUpload from '../../components/molecules/file-upload/file-upload';
import DocumentList from '../../components/molecules/document-list/document-list';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

const UploadDocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'National ID Card.pdf',
      type: 'PDF',
      size: '2.5 MB',
      uploadDate: 'Dec 15, 2024',
      status: 'Approved'
    },
    {
      id: '2',
      name: 'Professional Certificate.jpg',
      type: 'Image',
      size: '1.8 MB',
      uploadDate: 'Dec 14, 2024',
      status: 'Pending'
    },
    {
      id: '3',
      name: 'Business License.pdf',
      type: 'PDF',
      size: '3.2 MB',
      uploadDate: 'Dec 13, 2024',
      status: 'Rejected'
    }
  ]);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileType = (file: File): string => {
    const extension = file.name.split('.').pop()?.toUpperCase();
    if (['JPG', 'JPEG', 'PNG', 'GIF'].includes(extension || '')) return 'Image';
    if (['PDF'].includes(extension || '')) return 'PDF';
    if (['DOC', 'DOCX'].includes(extension || '')) return 'Document';
    return 'File';
  };

  const handleFileSelect = (files: File[]) => {
    const newDocuments = files.map((file, index) => ({
      id: Date.now().toString() + index,
      name: file.name,
      type: getFileType(file),
      size: formatFileSize(file.size),
      uploadDate: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }),
      status: 'Pending' as const
    }));

    setDocuments(prev => [...newDocuments, ...prev]);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  return (
    <ServiceProviderLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Upload Documents</h1>
          <p className="text-gray-600">
            Upload your required documents for verification. Accepted formats: PDF, JPG, PNG, DOC, DOCX (Max size: 10MB)
          </p>
        </div>

        {/* Document Requirements */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Required Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800">Identity Verification</h3>
              </div>
              <p className="text-sm text-gray-600">National ID Card, Passport, or Driver's License</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800">Professional Certification</h3>
              </div>
              <p className="text-sm text-gray-600">Relevant certificates or qualifications for your service</p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-medium text-gray-800">Business License</h3>
              </div>
              <p className="text-sm text-gray-600">Business registration or trade license (if applicable)</p>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <FileUpload
          maxSize={10}
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          multiple={true}
          onFileSelect={handleFileSelect}
        />

        {/* Document List */}
        <DocumentList 
          documents={documents}
          onDeleteDocument={handleDeleteDocument}
        />
      </div>
    </ServiceProviderLayout>
  );
};

export default UploadDocumentsPage;