'use client';

import React from 'react';
import Link from 'next/link';
import { User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccountLinkProps {
  className?: string;
  showLabel?: boolean;
}

/**
 * Account link component for navigation.
 * Can be used in headers or navigation menus.
 */
export const AccountLink: React.FC<AccountLinkProps> = ({ 
  className = '', 
  showLabel = true 
}) => {
  return (
    <Link
      href="/account"
      className={cn(
        "flex items-center space-x-2 p-2 text-gray-700 hover:text-ds-primary-sage transition-colors duration-200 rounded-lg hover:bg-ds-primary-sage/5",
        className
      )}
      aria-label="Go to account dashboard"
    >
      <User className="w-5 h-5" />
      {showLabel && <span className="font-medium">My Account</span>}
    </Link>
  );
};