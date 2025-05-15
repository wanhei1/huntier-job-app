// Middleware for API request logging
export async function logRequest(method: string, url: string, body?: any) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${method} ${url}`);
  
  if (body) {
    try {
      console.log('Request body:', typeof body === 'string' ? body : JSON.stringify(body, null, 2));
    } catch (e) {
      console.log('Request body: [Could not stringify]', body);
    }
  }
}

// Middleware for API response logging
export async function logResponse(status: number, body?: any) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Response status: ${status}`);
  
  if (body) {
    try {
      console.log('Response body:', typeof body === 'string' ? body : JSON.stringify(body, null, 2));
    } catch (e) {
      console.log('Response body: [Could not stringify]', body);
    }
  }
}
