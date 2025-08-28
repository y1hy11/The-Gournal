import { useEffect } from "react";
import Article from "@components/Article.jsx";
import useNewsStore from "@context/UserContext.jsx";

const Journal = () => {
  const { articles, loading, error, fetchArticles } = useNewsStore();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  if (loading && articles.length === 0) {
    return (
      <main>
        <div className="container mx-auto px-6 py-8">
          <div className="text-center py-16">
            <div className="animate-pulse">
              <h3 className="text-2xl font-bold mb-4">Loading News...</h3>
              <p>Please wait while we fetch the latest articles.</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <div className="container mx-auto px-6 py-12">
          <div className="text-center max-w-lg mx-auto border p-8">
            <h2 className="text-2xl font-bold mb-4">Unable to Load News</h2>
            <p>{error}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container mx-auto px-4 py-6">
        {articles.length === 0 ? (
          <div className="text-center py-[64px]">
            <h3 className="text-[32px] font-bold mb-[8px]">
              No Articles Available
            </h3>
            <p className="text-[17px]">
              Please check back later for the latest news.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6 min-h-screen">
            {/* TOP SECTION - Main Headlines */}
            <div className="col-span-12 grid grid-cols-12 gap-6 border-b-2 border-black rounded-lg pb-6 mb-8">
              {/* Main Headline - Large Article */}
              <div className="col-span-8">
                {articles[0] && (
                  <Article
                    article={articles[0]}
                    size="headline"
                    layout="main-headline"
                  />
                )}
              </div>

              {/* Side Column */}
              <div className="col-span-4 border-l-2 border-black rounded-lg pl-6">
                <div className="mb-6">
                  <div className="bg-[#302B1F] p-[16px] m-[1rem] rounded-[5px]">
                    <h2 className="text-center text-[#ffffff] bg-[#302B1F] font-bold mb-4">
                      SPOTLIGHT
                    </h2>
                  </div>
                  {articles[1] && (
                    <Article
                      article={articles[1]}
                      size="spotlight"
                      layout="sidebar"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* MIDDLE SECTION - Horizontal Layout */}
            <div className="col-span-12 border-b-2 border-black rounded-lg pb-6 mb-8">
              {articles[2] && (
                <Article
                  article={articles[2]}
                  size="horizontal"
                  layout="horizontal-middle"
                />
              )}
            </div>

            {/* BOTTOM SECTION - Multiple Articles */}
            <div className="col-span-12 grid grid-cols-12 gap-6 border-b-2 border-black rounded-lg pt-6 pb-6 mb-8">
              {/* Bottom Small Articles */}
              <div className="col-span-3">
                <div className="bg-[#302B1F] p-[16px] m-[1rem] rounded-[5px]">
                  <h2 className="text-center text-[#ffffff] bg-[#302B1F] font-bold uppercase">
                    the gournal
                  </h2>
                </div>
                {articles[9] && (
                  <Article
                    article={articles[9]}
                    size="tiny"
                    layout="bottom-row"
                  />
                )}
              </div>

              <div className="col-span-6 border-l border-r border-black rounded-lg px-6">
                {articles[10] && (
                  <Article
                    article={articles[10]}
                    size="medium"
                    layout="bottom-center-final"
                  />
                )}
              </div>

              <div className="col-span-3">
                <div className="bg-[#302B1F] p-[16px] m-[1rem] rounded-[5px]">
                  <h2 className="text-center text-[#ffffff] bg-[#302B1F] font-bold uppercase">
                    the gournal
                  </h2>
                </div>
                {articles[11] && (
                  <Article
                    article={articles[11]}
                    size="tiny"
                    layout="bottom-row"
                  />
                )}
              </div>
            </div>

            {/* BOTTOM ROW */}
            <div className="col-span-12 grid grid-cols-12 gap-6 border-b-2 border-black rounded-lg pb-6 mb-8">
              {/* Bottom Left */}
              <div className="col-span-4">
                <div className="bg-[#302B1F] p-[16px] m-[1rem] rounded-[5px]">
                  <h2 className="text-center text-[#ffffff] bg-[#302B1F] font-bold uppercase">
                    the gournal
                  </h2>
                </div>
                {articles[6] && (
                  <Article
                    article={articles[6]}
                    size="small"
                    layout="bottom-section"
                  />
                )}
              </div>

              {/* Bottom Center */}
              <div className="col-span-4 border-l border-r border-black rounded-lg px-6">
                {articles[7] && (
                  <Article
                    article={articles[7]}
                    size="medium"
                    layout="bottom-center"
                  />
                )}
              </div>

              {/* Bottom Right */}
              <div className="col-span-4">
                <div className="bg-[#302B1F] p-[16px] m-[1rem] rounded-[5px]">
                  <h2 className="text-center text-[#ffffff] bg-[#302B1F] font-bold uppercase">
                    the gournal
                  </h2>
                </div>
                {articles[8] && (
                  <Article
                    article={articles[8]}
                    size="small"
                    layout="bottom-section"
                  />
                )}
              </div>
            </div>

            {/** FINAL BOTTOM SECTION **/}
            <div className="col-span-12 pt-8">
              <div className="col-span-12 border-b-2 border-black rounded-lg pb-6 mb-8">
                {articles[15] && (
                  <Article
                    article={articles[15]}
                    size="horizontal"
                    layout="horizontal-middle"
                  />
                )}
              </div>

              <div className="col-span-12 pt-8">
                {articles[16] && (
                  <Article
                    article={articles[16]}
                    size="horizontal-reverse"
                    layout="horizontal-middle"
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Journal;
