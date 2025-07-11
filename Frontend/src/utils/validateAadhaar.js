export const validateAadhaar = (aadhaar) => {
  if (!aadhaar || typeof aadhaar !== "string") {
    return { isValid: false, message: "Aadhaar number is required and must be a string." };
  }

  const trimmedAadhaar = aadhaar.trim();
  const regex = /^\d{4}\s\d{4}\s\d{4}$/; // Matches XXXX XXXX XXXX format

  if (!regex.test(trimmedAadhaar)) {
    return { isValid: false, message: "Invalid Aadhaar number format. Please use XXXX XXXX XXXX." };
  }

  return { isValid: true, message: "Aadhaar number is valid." };
};