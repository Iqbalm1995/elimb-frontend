import * as CryptoJS from "crypto-js";

export function encryptAES(data: string): string {
  const key = "PLTSElimbAESKeys";
  const hexKey = CryptoJS.enc.Utf8.parse(key);
  const ivX = CryptoJS.enc.Utf8.parse("0000000000000000");
  const encrypted = CryptoJS.AES.encrypt(data, hexKey, {
    iv: ivX,
    mode: CryptoJS.mode.CBC, // Use appropriate mode, e.g., ECB or CBC
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
}

export function decryptAES(encryptedData: string): string {
  const key = "PLTSElimbAESKeys";
  const hexKey = CryptoJS.enc.Utf8.parse(key);
  const ivX = CryptoJS.enc.Utf8.parse("0000000000000000");
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, hexKey, {
    iv: ivX,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decryptedBytes.toString(CryptoJS.enc.Utf8);
}

export function generateStringToSign(
  httpMethod: string,
  relativeUrl: string,
  accessToken: string,
  requestBody: string,
  timestamp: string
): string {
  const encodedBody = CryptoJS.SHA256(requestBody)
    .toString(CryptoJS.enc.Hex)
    .toLowerCase();
  return `${httpMethod}:${relativeUrl}:${accessToken}:${encodedBody}:${timestamp}`;
}

// Step 1
export function getRequestBodyHash(requestBody: string): string {
  // Ensure the request body is always a string
  const bodyString =
    typeof requestBody === "string" ? requestBody : JSON.stringify(requestBody);
  const hash = CryptoJS.SHA256(bodyString).toString(CryptoJS.enc.Hex);
  return hash.toLowerCase(); // Convert to lowercase for consistency
}

// Step 2
export function jsonStringifySingleLine<T>(obj: T | null): string {
  if (obj === null) {
    return ""; // Return empty string if null
  }
  // Convert the object to JSON string
  const jsonString = JSON.stringify(obj);
  // Replace whitespace and format for single line
  return jsonString.replace(/\s/g, "").replace(/:/g, ":"); // Removed unnecessary comma replacement for null case
}

// step 3
export function generateStringToSignHash(
  httpMethod: string,
  relativeUrl: string,
  accessToken: string,
  requestBody: string,
  timestamp: string
): string {
  return `${httpMethod}:${relativeUrl}:${accessToken}:${requestBody}:${timestamp}`;
}

// Step 4
export function generateSignature(
  apiSecret: string,
  stringToSign: string
): string {
  const hmac = CryptoJS.HmacSHA256(stringToSign, apiSecret);
  return hmac.toString(CryptoJS.enc.Hex);
}
