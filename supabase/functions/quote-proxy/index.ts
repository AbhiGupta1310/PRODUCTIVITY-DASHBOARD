// quote-proxy/index.ts
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    // Fetch quote from the external API
    const response = await fetch("https://api.quotable.io/random?tags=inspirational,productivity");
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Return the quote data with CORS headers
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in quote-proxy function:", error);
    
    // Return a fallback quote when the API fails
    const fallbackQuote = {
      content: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney",
    };
    
    return new Response(JSON.stringify(fallbackQuote), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  }
});