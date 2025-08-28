import { create } from 'zustand';
import { newsAPI } from './ApiServices';

const useNewsStore = create((set, get) => ({
  articles: [],
  allArticles: [],
  loading: false,
  error: null,

  setArticles: (articles) => {
    set({ 
      allArticles: articles,
      articles: articles,
      filteredArticles: articles
    });
  },
  
  fetchArticles: async (category = 'general', useApi = true) => {
    set({ loading: true, error: null });
    
    try {
      if (useApi) {
        const data = await newsAPI.getArticlesByCategory(category, 50);
        const allArticles = data.articles || [];
        get().setArticles(allArticles);
      } else {
        throw new Error('Local data not available. API connection required.');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      set({ 
        error: error.message || 'Unable to fetch articles. Please check your internet connection and try again.',
        articles: [],
        allArticles: []
      });
    } finally {
      set({ loading: false });
    }
  },

}));

export default useNewsStore;
