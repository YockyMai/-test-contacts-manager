export const phoneToNumber = (phone: string) => {
  return phone.replace(/\D/g, "");
};
