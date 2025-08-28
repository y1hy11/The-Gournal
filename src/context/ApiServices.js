import axios from "axios";

// News API configuration
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

if (!API_KEY) {
  console.error('News API key is missing. Please check your .env file.');
}

// Rate limiting configuration
const RATE_LIMIT_DELAY = 1000; // 1 second delay between API calls
let lastApiCall = 0;

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    apiKey: API_KEY,
  },
  timeout: 10000, // 10 second timeout
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

// API Services
export const newsAPI = {
  // Get top headlines with enhanced content
  getTopHeadlines: async (category = "", pageSize = 20, page = 1) => {
    try {
      await rateLimit(); // Apply rate limiting

      // Try multiple approaches to get better content
      let response;
      let articles = [];

      // Approach 1: Use specific high-quality sources
      const sources = [
        "the-verge",
        "wired",
        "ars-technica",
        "engadget",
        "bbc-news",
        "reuters",
        "bloomberg",
        "business-insider",
        "cnn",
        "associated-press",
      ].join(",");

      try {
        console.log("Fetching from premium sources...");
        response = await apiClient.get("/top-headlines", {
          params: { sources, pageSize, page },
        });
        articles = response.data.articles || [];
      } catch (sourceError) {
        console.log("Premium sources failed, trying general headlines...");

        // Approach 2: Try general top headlines by category
        const params = { pageSize, page };
        if (category && category !== "general") {
          params.category = category;
          params.country = "us"; // Add country for better results
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
      // Return error when no local fallback is available
      throw new Error(
        "Unable to fetch articles. Please check your internet connection and try again."
      );
    }
  },

  // Get articles by category with enhanced content
  getArticlesByCategory: async (category, pageSize = 20, page = 1) => {
    try {
      // Try to get from API
      const result = await newsAPI.getTopHeadlines(category, pageSize, page);
      return result;
    } catch (error) {
      console.error("Error in getArticlesByCategory:", error);
      throw new Error(
        "Unable to fetch articles by category. Please check your internet connection and try again."
      );
    }
  },
};

export default newsAPI;
