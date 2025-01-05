const REGION_LIST_URL = 'https://crustdata-docs-region-json.s3.us-east-2.amazonaws.com/updated_regions.json';

export async function generateResponse(question: string): Promise<string> {
  // Convert question to lowercase for easier matching
  const q = question.toLowerCase();

  // Basic response logic based on keywords
  if (q.includes('region') || q.includes('location')) {
    return `For region-based queries, please use the standardized region values from our reference list at ${REGION_LIST_URL}. This ensures accurate results when using our APIs. The values should exactly match those in the list - for example, use "United States" instead of "USA" or specific cities.`;
  }

  if (q.includes('email') && (q.includes('gmail') || q.includes('search'))) {
    return 'While our email-based search works best with business emails, you can improve results for personal email addresses (@gmail etc.) by combining the search with additional parameters like name, company, or location to get more accurate matches.';
  }

  if (q.includes('api') && q.includes('fail')) {
    return 'API failures are often due to incorrect parameter formatting. Please check our API documentation for the exact format requirements. For specific error messages, I can help troubleshoot the issue.';
  }

  // Default response
  return 'I can help you with questions about Crustdata\'s APIs. Please ask about specific APIs, parameters, or error messages you\'re encountering.';
}