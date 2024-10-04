export const removeSpecialCharacters = (value: string): string => {
  return value
    .split("")
    .filter((char) => {
      const charCode = char.charCodeAt(0);
      return (
        (charCode >= 48 && charCode <= 57) || // números (0-9)
        (charCode >= 65 && charCode <= 90) || // letras maiúsculas (A-Z)
        (charCode >= 97 && charCode <= 122)   // letras minúsculas (a-z)
      );
    })
    .join("");
};
