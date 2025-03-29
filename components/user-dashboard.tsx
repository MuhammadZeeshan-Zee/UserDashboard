'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/store/store';
import { fetchUsers, setView, setSearchQuery } from '@/lib/store/userSlice';
import { UserCard } from './user-card';
import { Grid2X2, List } from 'lucide-react';

export function UserDashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredUsers, loading, error, view, searchQuery } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const toggleView = () => {
    dispatch(setView(view === 'grid' ? 'list' : 'grid'));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-xs w-full"
        />

        {/* Single Toggle Button */}
        <button
          onClick={toggleView}
          className="p-2 rounded bg-blue-100 text-blue-600 flex items-center gap-2"
          aria-label="Toggle view"
        >
          {view === 'grid' ? <List className="h-5 w-5" /> : <Grid2X2 className="h-5 w-5" />}
          {/* <span>{view === 'grid' ? 'List View' : 'Grid View'}</span> */}
        </button>
      </div>

      {/* User List/Grid View */}
      <div
        className={
          view === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
        }
      >
        {filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} view={view} />
        ))}
      </div>
    </div>
  );
}
