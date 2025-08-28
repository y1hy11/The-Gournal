import { getArticleStyles } from "./ArticleStyles";

const Article = ({ article, size = "medium" }) => {
  if (!article) return null;

  const styles = getArticleStyles(size);

  if (size === "horizontal" || size === "horizontal-reverse") {
    return (
      <article className={styles.container}>
        <div className="flex-shrink-0">
          <img
            src={article.urlToImage}
            alt={article.title}
            className={styles.image}
          />
          <div
            className={`${styles.image} flex items-center justify-center text-[#4B5563] text-[12px] font-bold`}
            style={{ display: "none" }}
          >
            IMAGE
          </div>
        </div>

        <div className={styles.contentWrapper}>
          <h3 className={styles.title}>{article.title}</h3>

          <div className={styles.content}>
            {(article.content || article.description) && (
              <p className="text-justify leading-relaxed p-[8px]">
                {article.content || article.description}
              </p>
            )}
            {!article.content && !article.description && (
              <p className="text-justify leading-relaxed p-[8px] italic text-[#4B5563]">
                Content not available for this article.
              </p>
            )}
          </div>

          {article.url && (
            <div className="p-[5px] border-t flex justify-between">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px] font-bold hover:text-[#ffffff] underline inline-flex items-center"
              >
                Read Full Article →
              </a>

              <div className={styles.meta}>
                <span className="font-semibold">
                  {article.source?.name || "News Source"}
                </span>
                {" • "}
                <span>
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </article>
    );
  }

  return (
    <article className={styles.container}>
      <div className="mb-4">
        <img
          src={article.urlToImage}
          alt={article.title}
          className={styles.image}
          loading="lazy"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      </div>
      <h3 className={styles.title}>{article.title}</h3>
      <div className={styles.content}>
        {(article.content || article.description) && (
          <p className="text-justify leading-relaxed p-[8px]">
            {article.content || article.description}
          </p>
        )}
        {!article.content && !article.description && (
          <p className="text-justify leading-relaxed p-[8px] italic text-[#4B5563]">
            Content not available for this article.
          </p>
        )}
      </div>

      {article.url && (
        <div className="p-[5px] border-t flex justify-between">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[16px] font-bold hover:text-[#ffffff] underline inline-flex items-center"
          >
            Read Full Article →
          </a>

          <div className={styles.meta}>
            <span className="font-semibold">
              {article.source?.name || "News Source"}
            </span>
            {" • "}
            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </article>
  );
};

export default Article;
