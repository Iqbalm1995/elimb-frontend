export async function urlToBase64(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          resolve(reader.result);
        } else {
          reject(new Error("Failed to convert image to base64"));
        }
      };
      reader.onerror = () => {
        reject(new Error("Failed to read the image file"));
      };
      reader.readAsDataURL(blob);
    });
  } catch (error: any) {
    throw new Error(`Failed to fetch the image: ${error.message}`);
  }
}
