import axios from "axios";

// News API configuration
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

const isProduction = import.meta.env.PROD;

if (!API_KEY) {
  console.error('News API key is missing.');
  if (isProduction) {
    console.error('Add VITE_NEWS_API_KEY to Vercel environment variables');
  } else {
    console.error('Add VITE_NEWS_API_KEY to your .env file');
  }
}

// Rate limiting configuration
const RATE_LIMIT_DELAY = isProduction ? 2000 : 1000;
let lastApiCall = 0;

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
  timeout: 10000,
});

// Rate limiting function
const rateLimit = async () => {
  const now = Date.now();
  const timeSinceLastCall = now - lastApiCall;

  if (timeSinceLastCall < RATE_LIMIT_DELAY) {
    const waitTime = RATE_LIMIT_DELAY - timeSinceLastCall;
    await new Promise((resolve) => setTimeout(resolve, waitTime));
  }

  lastApiCall = Date.now();
};

// Simple fallback articles
const fallbackArticles = [
  {
    title: "News Service Unavailable",
    description: "Unable to load news at this time. Please try again later.",
    content: "Our news service is temporarily unavailable. This could be due to network issues, API limits, or server maintenance. Please refresh the page or try again in a few minutes.",
    urlToImage: "../public/THE-GOURNAL-Logo.svg",
    url: "#",
    source: { name: "The Gournal" },
    publishedAt: new Date().toISOString()
  },
  {
    title: "Stay Connected",
    description: "We're working to restore normal service as quickly as possible.",
    content: "The Gournal provides daily news from trusted sources worldwide. We apologize for any inconvenience and appreciate your patience as we work to resolve this issue.",
    urlToImage: "../public/THE-GOURNAL-Logo.svg",
    url: "#",
    source: { name: "The Gournal" },
    publishedAt: new Date().toISOString()
  }
];

// Function to clean HTML and programming code from content
const cleanHtmlAndCode = (content) => {
  if (!content) return "";

  let cleanedContent = content;

  // Remove HTML tags
  cleanedContent = cleanedContent.replace(/<[^>]*>/g, "");

  // Remove common HTML entities
  const htmlEntities = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#39;": "'",
    "&nbsp;": " ",
    "&copy;": "©",
    "&reg;": "®",
    "&trade;": "™",
    "&hellip;": "...",
    "&mdash;": "—",
    "&ndash;": "–",
    "&ldquo;": '"',
    "&rdquo;": '"',
    "&lsquo;": "'",
    "&rsquo;": "'",
  };

  Object.keys(htmlEntities).forEach((entity) => {
    const regex = new RegExp(entity, "g");
    cleanedContent = cleanedContent.replace(regex, htmlEntities[entity]);
  });

  // Remove any remaining HTML entities (numeric)
  cleanedContent = cleanedContent.replace(/&#\d+;/g, "");
  cleanedContent = cleanedContent.replace(/&#x[0-9a-fA-F]+;/g, "");

  // Remove JavaScript/CSS code blocks
  cleanedContent = cleanedContent.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ""
  );
  cleanedContent = cleanedContent.replace(
    /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
    ""
  );

  // Remove common programming language patterns
  // Remove code blocks (markdown style)
  cleanedContent = cleanedContent.replace(/```[\s\S]*?```/g, "");
  cleanedContent = cleanedContent.replace(/`[^`]+`/g, "");

  // Remove XML/HTML-like structures that might remain
  cleanedContent = cleanedContent.replace(/<\/?[a-zA-Z][^>]*>/g, "");

  // Clean up excessive whitespace
  cleanedContent = cleanedContent.replace(/\s+/g, " ");
  cleanedContent = cleanedContent.replace(/\n\s*\n/g, "\n\n");
  cleanedContent = cleanedContent.trim();

  return cleanedContent;
};

// Function to enhance truncated content while preserving truncation indicators
const enhanceTruncatedContent = (content, sourceUrl, sourceName) => {
  if (!content) return "";

  // First clean HTML and code elements
  let cleanedContent = cleanHtmlAndCode(content);

  // Check if content has truncation indicators but don't remove them
  const truncationPatterns = [
    /\s*\[\+\d+\s*chars?\]$/i,
    /\s*\[\+\d+\s*characters?\]$/i,
    /\s*\[…\]$/,
    /\s*\[Read more\]$/i,
    /\s*\[Continue reading\]$/i,
  ];

  const hasTruncation = truncationPatterns.some((pattern) =>
    pattern.test(cleanedContent)
  );

  // If content is truncated, add source information after the truncation marker
  if (hasTruncation && sourceUrl && sourceName) {
    return `${cleanedContent}\n\nFor the complete article, visit ${sourceName} at their website.`;
  } else if (hasTruncation) {
    return `${cleanedContent}\n\nFor the complete article, visit the source website.`;
  }

  // If content seems short (likely truncated but no marker), add guidance
  if (cleanedContent.length < 200) {
    return `${cleanedContent}\n\nThis appears to be a preview. Visit the source for the full story.`;
  }

  return cleanedContent;
};

// Function to process API articles
const processApiArticles = (apiArticles) => {
  return apiArticles.map((article) => {
    // Enhance content while preserving truncation indicators
    const processedContent = enhanceTruncatedContent(
      article.content,
      article.url,
      article.source?.name
    );

    return {
      ...article,
      content:
        processedContent ||
        article.description ||
        "Content not available for this article.",
      description: article.description || "No description available",
    };
  });
};

export const categories = [
  "general",
  "business",
  "health",
  "science",
  "sports",
  "technology",
  "environment",
];

// API Services with simple error handling
export const newsAPI = {
  // Get top headlines with enhanced content
  getTopHeadlines: async (category = "", pageSize = 20, page = 1) => {
    // Return fallback if no API key
    if (!API_KEY) {
      console.warn('No API key available, using fallback data');
      return {
        articles: fallbackArticles,
        totalResults: fallbackArticles.length
      };
    }

    try {
      await rateLimit(); // Apply rate limiting

      // Try multiple approaches to get better content
      let response;
      let articles = [];
      const safePageSize = Math.min(pageSize, 10);

      // Approach 1: Use specific high-quality sources
      try {
        console.log("Fetching from premium sources...");
        const sources = [
          "bbc-news",
          "reuters", 
          "associated-press",
          "cnn"
        ].join(",");

        response = await apiClient.get("/top-headlines", {
          params: { 
            sources, 
            pageSize: safePageSize, 
            page: 1
          },
        });
        articles = response.data.articles || [];
      } catch (sourceError) {
        console.log("Premium sources failed, trying general headlines...");
        
        // Simple error handling for specific status codes
        if (sourceError.response?.status === 426) {
          console.error('API quota exceeded');
          return {
            articles: fallbackArticles,
            totalResults: fallbackArticles.length
          };
        }
        
        if (sourceError.response?.status === 401) {
          console.error('Invalid API key');
          return {
            articles: fallbackArticles,
            totalResults: fallbackArticles.length
          };
        }

        // Approach 2: Try general top headlines by category
        const params = { 
          pageSize: safePageSize, 
          page: 1,
          country: "us"
        };
        
        if (category && category !== "general") {
          params.category = category;
        }

        response = await apiClient.get("/top-headlines", { params });
        articles = response.data.articles || [];
      }

      // Process articles to handle truncation
      const processedArticles = processApiArticles(articles);

      return {
        ...response.data,
        articles: processedArticles,
      };
    } catch (error) {
      console.error("Error fetching top headlines:", error);
      
      // Always return fallback data instead of throwing error
      return {
        articles: fallbackArticles,
        totalResults: fallbackArticles.length
      };
    }
  },

  // Get articles by category with enhanced content
  getArticlesByCategory: async (category, pageSize = 20, page = 1) => {
    try {
      const result = await newsAPI.getTopHeadlines(category, pageSize, page);
      return result;
    } catch (error) {
      console.error("Error in getArticlesByCategory:", error);
      
      // Return fallback instead of throwing error
      return {
        articles: fallbackArticles,
        totalResults: fallbackArticles.length
      };
    }
  },
};

export default newsAPI;
