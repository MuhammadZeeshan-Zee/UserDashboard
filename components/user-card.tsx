'use client';

import { User } from '@/lib/types';
import { Building2, Globe, Mail, Phone } from 'lucide-react';

interface UserCardProps {
  user: User;
  view: 'grid' | 'list';
}

export function UserCard({ user, view }: UserCardProps) {
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div
      className={`bg-white rounded-lg shadow-md p-6 ${
        view === 'list' ? '' : ''
      }`}
    >
      <div className={view === 'list' ? '' : ''}>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
            {initials}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>
      </div>
      <div className={`mt-4 `}>
        <div className="space-y-2 mt-2">
          {[
            { icon: <Mail className="h-4 w-4" />, text: user.email },
            { icon: <Phone className="h-4 w-4" />, text: user.phone },
            { icon: <Globe className="h-4 w-4" />, text: user.website },
            {
              icon: <Building2 className="h-4 w-4" />,
              text: user.company.name,
            },
          ].map(({ icon, text }, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-gray-600"
            >
              {icon}
              <span className="truncate">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
