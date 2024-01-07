export const isValidPhone = (phone: string) => {
  const validPhone = new RegExp(
    /^(([0][8])|([6][2][8])|([+][6][2][8]))[0-9]{8,12}$/
  ).test(phone);
  if (!validPhone) {
    return false;
  }
  return true;
};
