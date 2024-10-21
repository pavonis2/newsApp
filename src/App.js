//97575090f92c4a3581a732168f47dbfa
import { useEffect, useState } from 'react';
import './App.css';
import NavInshorts from './components/NavInshorts';
import NewsContent from './components/NewsContent/NewsContent';
import axios from 'axios';
import apikey from './data/config';
import Footer from './components/Footer/Footer';

function App() {
  const [category, setCategory] = useState("business");
  const [newsArray, setNewsArray] = useState([]);
  const [newsResults, setNewsResults] = useState();
  const [loadMore, setLoadMore] = useState(20);

  const newsApi = async() => {
    try {
      console.log(category);
      const news = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}&category=${category}&pageSize=${loadMore}`
      );
      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    newsApi();
  }, [newsResults, category, loadMore])
  

  return (
    <div className="App">
      <NavInshorts 
        setCategory={setCategory} 
        setLoadMore={setLoadMore}
      />
      <NewsContent 
        newsArray={newsArray} 
        newsResults={newsResults}
        loadMore={loadMore}
        setLoadMore={setLoadMore}
      />
      <Footer />
    </div>
  );
}

export default App;
