import { UserDashboard } from '@/components/user-dashboard';

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">User Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Manage and view all users in your system
        </p>
      </div>
      <UserDashboard />
    </main>
  );
}