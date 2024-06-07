import "./homePage.scss";
import Article from "../../components/article/Article";
import { useEffect, useState } from "react";
import { Grid } from "react-loader-spinner";
import { SCRAPE_URL } from "../../serverURLs";

const HomePage = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "Fetching latest news from The Hindu...",
    "We aren't testing your patience😅",
    "Good things come to those who wait...",
    "Almost there, hang tight!",
    "Gathering the most recent updates for you..."
  ];

  useEffect(() => {
    const fetchNewsArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${SCRAPE_URL}`);
        const data = await response.json();
        setNewsArticles(data);
      } catch (error) {
        console.error('Error fetching news articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsArticles();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [messages.length]);

  return (
    <div className="homePage">
      {loading && (
        <div className="loader">
          <Grid
            height="100"
            width="100"
            color="black"
            ariaLabel="loading"
          />
          <div className="loadingMessage">{messages[messageIndex]}</div>
        </div>
      )}
      <div className={`sources ${loading ? 'hidden' : ''}`}>
        <div className="source">
          <a href="https://www.thehindu.com/" className="newsSource">
            The Hindu
          </a>
          {newsArticles
            .filter((article) => article.source === 'The Hindu')
            .map((news, index) => (
              <Article
                key={index}
                title={news.title}
                label={news.label}
                url={news.url}
                time={news.time}
              />
            ))}
        </div>
        <div className="source">
          <a href="https://www.indianexpress.com/" className="newsSource">
            Indian Express
          </a>
          {newsArticles
            .filter((article) => article.source === 'Indian Express')
            .map((news, index) => (
              <Article
                key={index}
                label={news.label}
                title={news.title}
                url={news.url}
                time={news.time}
              />
            ))}
        </div>
        <div className="source">
          <a href="https://pib.gov.in/" className="newsSource">
            PIB
          </a>
          {newsArticles
            .filter((article) => article.source === 'PIB')
            .map((news, index) => (
              <Article
                key={index}
                title={news.title}
                time={news.time}
                url={news.url}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
