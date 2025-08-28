import { useState } from 'react';
import useNewsStore from '@context/UserContext';

const SearchBar = () => {
  const { 
    articles,
    allArticles,
    setArticles,
    fetchArticles,
    loading 
  } = useNewsStore();

  const [searchQuery, setSearchQuery] = useState('');

  // Filter articles in real-time as user types
  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (!query.trim()) {
      // If search is empty, show all articles
      setArticles(allArticles);
      return;
    }

    // Filter articles based on search query
    const filteredArticles = allArticles.filter(article => {
      const searchTerm = query.toLowerCase();
      const title = (article.title || '').toLowerCase();
      const description = (article.description || '').toLowerCase();
      const content = (article.content || '').toLowerCase();
      const source = (article.source?.name || '').toLowerCase();
      
      return title.includes(searchTerm) || 
             description.includes(searchTerm) || 
             content.includes(searchTerm) ||
             source.includes(searchTerm);
    });

    // Update the articles state to show only filtered results
    setArticles(filteredArticles);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Since filtering is now real-time, this mainly prevents page reload
    console.log(`Search submitted for: "${searchQuery}" (${articles.length} results)`);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setArticles(allArticles);
    console.log('Search cleared, showing all articles:', allArticles.length);
  };

  const resetSearch = async () => {
    setSearchQuery('');
    console.log('Resetting search and fetching fresh articles...');
    // Fetch fresh articles from API
    await fetchArticles();
  };

  return (
    <div>
        <form onSubmit={handleSearch} className="flex">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              placeholder="Search news articles by keywords..."
              className="border-[0_2px_2px_0] border-[#302B1F] w-full p-[8px] text-[#302B1F] placeholder-[#302B1F] focus:outline-none"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="p-[8px] border-[0_2px_2px_0] border-[#302B1F] bg-[#302B1F] text-[#E2D4BC] font-semibold uppercase hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="p-[8px] border-[0_2px_2px_0] border-[#302B1F] text-[#302B1F]"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={resetSearch}
            disabled={loading}
            className="p-[8px] border-[0_0_2px_0] border-[#302B1F] font-semibold uppercase"
          >
            {loading ? 'Resetting...' : 'Reset'}
          </button>
        </form>
        
        {searchQuery && (
          <div className="p-[5px_0_0_5px] text-[#E2D4BC] border-b-[2px] border-[#302B1F]">
            <span className="text-[16px] font-semibold uppercase">
              Search Results for: "{searchQuery}" ({articles.length} articles found)
            </span>
            {articles.length === 0 && (
              <p className="text-xs m-[2px_0_5px_0]">
                No articles found matching your search. Try different keywords.
              </p>
            )}
          </div>
        )}
    </div>
  );
};

export default SearchBar;
