export type Contact = {
  title: string;
  email: string;
  message: string;
  recaptcha: string;
};

export type Login = {
  email: string;
  password: string;
};

export type PasswordReset = {
  password: string;
  passwordConf: string;
  privacy: boolean;
};

export type SendEmail = {
  email: string;
};

export type SignUp = {
  email: string;
  password: string;
  passwordConf: string;
  recaptcha: string;
  privacy: boolean;
};
