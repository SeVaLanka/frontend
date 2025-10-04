import React from 'react';
import { ProfilePic } from './profile_pic';

/**
 * Example usage of ProfilePic component
 * This file demonstrates different ways to use the ProfilePic atom
 */

export const ProfilePicExamples = () => {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold">ProfilePic Component Examples</h2>
      
      {/* Size variations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Size Variations</h3>
        <div className="flex items-center gap-4">
          <ProfilePic alt="User XS" size="xs" initials="XS" />
          <ProfilePic alt="User SM" size="sm" initials="SM" />
          <ProfilePic alt="User MD" size="md" initials="MD" />
          <ProfilePic alt="User LG" size="lg" initials="LG" />
          <ProfilePic alt="User XL" size="xl" initials="XL" />
          <ProfilePic alt="User 2XL" size="2xl" initials="2XL" />
        </div>
      </div>

      {/* With images */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Images</h3>
        <div className="flex items-center gap-4">
          <ProfilePic 
            src="/api/placeholder/100/100" 
            alt="John Doe" 
            size="md" 
          />
          <ProfilePic 
            src="/api/placeholder/100/100" 
            alt="Jane Smith" 
            size="lg" 
            showStatus={true}
            isOnline={true}
          />
        </div>
      </div>

      {/* Fallback with initials */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Fallback with Initials</h3>
        <div className="flex items-center gap-4">
          <ProfilePic alt="John Doe" size="md" />
          <ProfilePic alt="Jane Smith" size="lg" initials="JS" />
          <ProfilePic alt="Alex Johnson" size="xl" initials="AJ" />
        </div>
      </div>

      {/* With status indicators */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">With Status Indicators</h3>
        <div className="flex items-center gap-4">
          <ProfilePic 
            alt="Online User" 
            size="lg" 
            initials="ON" 
            showStatus={true}
            isOnline={true}
          />
          <ProfilePic 
            alt="Offline User" 
            size="lg" 
            initials="OFF" 
            showStatus={true}
            isOnline={false}
          />
        </div>
      </div>

      {/* Clickable examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Clickable Examples</h3>
        <div className="flex items-center gap-4">
          <ProfilePic 
            alt="Clickable User" 
            size="lg" 
            initials="CU" 
            onClick={() => alert('Profile clicked!')}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePicExamples;