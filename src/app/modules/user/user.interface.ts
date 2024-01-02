export type passStore = {
  password: string;
  passwordChangedAt: Date;
};

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  passwordHolder?: [passStore];
};
