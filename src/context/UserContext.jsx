import { create } from 'zustand';
import { rssService } from '../services/RSSService';

const useNewsStore = create((set, get) => ({
  articles: [],
  allArticles: [],
  loading: false,
  error: null,
  currentCategory: 'general',

  setArticles: (articles) => {
    set({ 
      allArticles: articles,
      articles: articles,
      filteredArticles: articles
    });
  },
  
  fetchArticles: async (category = 'general') => {
    set({ loading: true, error: null, currentCategory: category });
    
    try {
      console.log(`Fetching RSS articles for category: ${category}`);
      const data = await rssService.getArticlesByCategory(category, 50);
      const allArticles = data.articles || [];
      
      console.log(`Successfully fetched ${allArticles.length} RSS articles`);
      get().setArticles(allArticles);
      
    } catch (error) {
      console.error('Error fetching RSS articles:', error);
      set({ 
        error: error.message || 'Unable to fetch articles from RSS feeds. Please check your internet connection and try again.',
        articles: [],
        allArticles: []
      });
    } finally {
      set({ loading: false });
    }
  },

  refreshArticles: async () => {
    const { currentCategory } = get();
    await get().fetchArticles(currentCategory);
  },

  getAvailableCategories: () => {
    return rssService.getCategories();
  },

}));

export default useNewsStore;
