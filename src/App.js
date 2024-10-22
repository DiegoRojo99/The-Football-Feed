import { useEffect, useState } from 'react';
import './App.css';
import HighlightPage from './Highlights/Page';

function App() {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function groupByCompetition(data) {
    return data.reduce((acc, item) => {
      const competitionName = item.competition?.name;
      if(!competitionName){
        return acc;
      }
      if (!acc[competitionName]) {
        acc[competitionName] = [];
      }
      acc[competitionName].push(item);
      return acc;
    }, {});
  }

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const options = {
          method: 'GET',
          hostname: 'free-football-soccer-videos.p.rapidapi.com',
          port: null,
          path: '/',
          headers: {
            'x-rapidapi-key': '9508ee0a75msh34b87de3d1feb97p1a18f4jsn61500fd6c91c',
            'x-rapidapi-host': 'free-football-soccer-videos.p.rapidapi.com'
          }
        };
        const response = await fetch('https://free-football-soccer-videos.p.rapidapi.com/',options);

        if (!response.ok) {
          console.log("Response: ", response);
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const groupedData = groupByCompetition(data);
        setHighlights(groupedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);
  
  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <ul>
            <li>The Football Feed</li>
          </ul>
        </header>
        <body className='App-body'>
          Loading...
        </body>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <header className="App-header">
          <ul>
            <li>The Football Feed</li>
          </ul>
        </header>
        <body className='App-body'>
          Error
        </body>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <ul>
          <li>The Football Feed</li>
        </ul>
      </header>
      <body className='App-body'>
        <HighlightPage data={highlights} />
      </body>
    </div>
  );
}

export default App;
