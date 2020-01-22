export class User {
  id: string;
  userName: string;
  email: string;
  emailConfirmed: boolean;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockOutEnd: string;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  password: string;
}
