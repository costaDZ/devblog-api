// TODO: make this as a Token
export const generateVerificationToken = () =>
  Math.floor(10000 + Math.random() * 900000).toString();
