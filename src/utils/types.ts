export interface IUser {
  id: string;
  name: string;
  email: string;
  token: string;
  firstName: string;
  lastName: string;
  userid: string;
  role: "Admin" | "Reader" | "Author"; // Updated to include author role
  photoUrl: string;
}
