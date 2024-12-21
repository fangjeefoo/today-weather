export async function fetchAPI<T>(url: string, config?: RequestInit): Promise<T | string> {
  try {
    const response = await fetch(url, {
      ...config,
    });
    if (!response.ok) {
      const error = new Error(`Something went wrong. Please try again.`);
      throw error;
    }
    return response.json()
  } catch (error: unknown) {
    return (error as Error).message;
  }
}
