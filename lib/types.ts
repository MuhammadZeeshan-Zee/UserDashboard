export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserState {
  users: User[];
  filteredUsers: User[];
  loading: boolean;
  error: string | null;
  view: 'grid' | 'list';
  searchQuery: string;
}