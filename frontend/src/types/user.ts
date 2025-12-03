export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'viewer'; 
  photoUrl?: string; 
}