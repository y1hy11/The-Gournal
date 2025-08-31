import { XMLParser } from 'fast-xml-parser';

const CORS_PROXY = 'https://api.allorigins.win/get?url=';

const RSS_SOURCES = {
  general: [
    'https://feeds.bbci.co.uk/news/rss.xml',
    'https://www.reuters.com/rssFeed/worldNews',
    'https://rss.cnn.com/rss/edition.rss',
    'https://feeds.npr.org/1001/rss.xml',
    'https://feeds.washingtonpost.com/rss/world',
    'https://feeds.bloomberg.com/markets/news.rss',
    'https://www.reuters.com/rssFeed/businessNews',
    'https://feeds.feedburner.com/venturebeat/SZYF',
    'https://rss.cnn.com/rss/money_latest.rss',
    'https://feeds.feedburner.com/TechCrunch',
    'https://www.wired.com/feed/rss',
    'https://feeds.arstechnica.com/arstechnica/index',
    'https://www.theverge.com/rss/index.xml',
    'https://feeds.feedburner.com/venturebeat/SZYF',
    'https://rss.cnn.com/rss/edition_space.rss',
    'https://feeds.nationalgeographic.com/ng/News/News_Main',
    'https://www.sciencedaily.com/rss/all.xml',
    'https://rss.cnn.com/rss/edition_health.rss',
    'https://www.reuters.com/rssFeed/healthNews',
    'https://feeds.webmd.com/rss/rss.aspx?RSSSource=RSS_PUBLIC',
    'https://rss.cnn.com/rss/edition_sport.rss',
    'https://www.espn.com/espn/rss/news',
    'https://feeds.skysports.com/feeds/11095',
    'https://feeds.nationalgeographic.com/ng/News/News_Environment',
    'https://www.reuters.com/rssFeed/environmentNews'
  ]
};

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  parseAttributeValue: true,
  trimValues: true
});

const cleanText = (text) => {
  if (!text) return '';
  
  let cleaned = text.replace(/<[^>]*>/g, '');
  
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
    '&hellip;': '...',
    '&mdash;': '—',
    '&ndash;': '–'
  };
  
  Object.keys(entities).forEach(entity => {
    cleaned = cleaned.replace(new RegExp(entity, 'g'), entities[entity]);
  });
  
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
};

const extractImageUrl = (content, description, item) => {
  if (!content && !description) return null;
  
  const text = content || description || '';
  
  // Enhanced image extraction patterns
  const patterns = [
    /<img[^>]+src="([^"]+)"/i,
    /<img[^>]+src='([^']+)'/i,
    /url="([^"]+\.(jpg|jpeg|png|gif|webp|bmp|svg))"/i,
    /src="([^"]+\.(jpg|jpeg|png|gif|webp|bmp|svg))"/i,
    /image[^>]*url[^>]*[=:][\s]*["']([^"']+)["']/i,
    /thumbnail[^>]*url[^>]*[=:][\s]*["']([^"']+)["']/i,
    /href="([^"]+\.(jpg|jpeg|png|gif|webp|bmp))"/i
  ];
  
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match && match[1]) {
      // Enhanced URL validation for security
      const url = match[1].trim();
      
      // Validate URL format and security
      if (isValidImageUrl(url)) {
        return url;
      }
    }
  }
  
  // Fallback to placeholder image service
  return `https://picsum.photos/800/400?random=${Math.floor(Math.random() * 1000)}`;
};

const isValidImageUrl = (url) => {
  try {
    const urlObj = new URL(url);
    
    if (urlObj.protocol !== 'https:') {
      return false;
    }
    
    const blockedPatterns = [
      'feedburner', 'doubleclick', 'googleadservices', 
      'googlesyndication', 'adsystem', 'ads.', 'ad.',
      'javascript:', 'data:', 'vbscript:'
    ];
    
    const hostname = urlObj.hostname.toLowerCase();
    const fullUrl = url.toLowerCase();
    
    for (const pattern of blockedPatterns) {
      if (hostname.includes(pattern) || fullUrl.includes(pattern)) {
        return false;
      }
    }
    
    const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
    const hasValidExtension = validExtensions.some(ext => 
      urlObj.pathname.toLowerCase().includes(ext)
    );
    
    const trustedDomains = [
      'picsum.photos', 'images.', 'img.', 'static.', 'media.',
      'cdn.', 'assets.', 'upload.', 'photo.'
    ];
    
    const isTrustedDomain = trustedDomains.some(domain => 
      hostname.includes(domain)
    );
    
    return hasValidExtension || isTrustedDomain;
    
  } catch (error) {
    return false;
  }
};

const parseRSSItem = (item, sourceName) => {
  const title = cleanText(item.title || '');
  const description = cleanText(item.description || item.summary || '');
  const content = cleanText(item.content || item['content:encoded'] || description);
  const link = item.link || item.guid;
  const pubDate = item.pubDate || item.published || item.date;
  
  let imageUrl = null;
  
  if (item.enclosure && item.enclosure.type && item.enclosure.type.includes('image')) {
    imageUrl = item.enclosure.url;
  } else if (item['media:content'] && Array.isArray(item['media:content'])) {
    const imageContent = item['media:content'].find(media => 
      media.type && media.type.includes('image')
    );
    if (imageContent) imageUrl = imageContent.url;
  } else if (item['media:content']) {
    imageUrl = item['media:content'].url;
  } else if (item['media:thumbnail']) {
    if (Array.isArray(item['media:thumbnail'])) {
      imageUrl = item['media:thumbnail'][0].url;
    } else {
      imageUrl = item['media:thumbnail'].url;
    }
  } else if (item.image) {
    imageUrl = typeof item.image === 'string' ? item.image : item.image.url;
  } else {
    imageUrl = extractImageUrl(content, description, item);
  }
  
  if (!imageUrl || imageUrl === null) {
    imageUrl = `https://picsum.photos/800/400?random=${Math.floor(Math.random() * 1000)}`;
  }
  
  const expandedContent = content || description || 'Content not available for this article.';
  const enhancedContent = expandedContent.length < 200 
    ? `${expandedContent}\n\nThis is a preview of the full article. Visit the source for complete coverage and additional details.`
    : expandedContent;
  
  const id = `${sourceName}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    id,
    title,
    description: description || 'No description available',
    content: enhancedContent,
    url: link,
    urlToImage: imageUrl,
    publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
    source: {
      id: sourceName.toLowerCase().replace(/\s+/g, '-'),
      name: sourceName
    },
    author: item.author || item.creator || null
  };
};

const fetchRSSFeed = async (url, sourceName = null) => {
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(url)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const xmlData = data.contents;
    
    if (!xmlData) {
      throw new Error('No XML data received');
    }
    
    const parsed = parser.parse(xmlData);
    
    let channel = null;
    if (parsed.rss && parsed.rss.channel) {
      channel = parsed.rss.channel;
    } else if (parsed.feed) {
      channel = parsed.feed;
    } else if (parsed.channel) {
      channel = parsed.channel;
    }
    
    if (!channel) {
      throw new Error('Invalid RSS/Atom feed structure');
    }
    
    const feedTitle = sourceName || channel.title || 'News Source';
    
    let items = [];
    if (channel.item) {
      items = Array.isArray(channel.item) ? channel.item : [channel.item];
    } else if (channel.entry) {
      items = Array.isArray(channel.entry) ? channel.entry : [channel.entry];
    }
    
    const articles = items
      .slice(0, 20)
      .map(item => parseRSSItem(item, feedTitle));
    
    return articles;
    
  } catch (error) {
    console.error(`Error fetching RSS feed ${url}:`, error);
    return []; 
  }
};

export const rssService = {
  getArticlesByCategory: async (category = 'general', maxArticles = 50) => {
    try {
      const feedUrls = RSS_SOURCES[category] || RSS_SOURCES.general;
      
      const feedPromises = feedUrls.map(url => fetchRSSFeed(url));
      const feedResults = await Promise.all(feedPromises);
      
      let allArticles = [];
      feedResults.forEach(articles => {
        allArticles = allArticles.concat(articles);
      });
      
      allArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
      
      const limitedArticles = allArticles.slice(0, maxArticles);
      
      return {
        status: 'ok',
        totalResults: limitedArticles.length,
        articles: limitedArticles
      };
      
    } catch (error) {
      console.error('Error fetching RSS articles:', error);
      throw new Error('Unable to fetch RSS articles. Please check your internet connection and try again.');
    }
  },
  
  getTopHeadlines: async (category = 'general', pageSize = 20) => {
    return await rssService.getArticlesByCategory(category, pageSize);
  },
  
  getCategories: () => {
    return Object.keys(RSS_SOURCES);
  },
  
  addCustomFeed: (category, feedUrl) => {
    if (!RSS_SOURCES[category]) {
      RSS_SOURCES[category] = [];
    }
    RSS_SOURCES[category].push(feedUrl);
  }
};

export const categories = Object.keys(RSS_SOURCES);

export default rssService;
