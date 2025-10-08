'use client';

import React from 'react';
import { Button } from '../../atoms/button/button';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

interface DocumentListProps {
  documents: Document[];
  onDeleteDocument: (id: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, onDeleteDocument }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="text-gray-400 mb-2">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-500">No documents uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Uploaded Documents</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {documents.map((document) => (
          <div key={document.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{document.name}</p>
                <p className="text-sm text-gray-500">{document.type} • {document.size} • {document.uploadDate}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(document.status)}`}>
                {document.status}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onDeleteDocument(document.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;