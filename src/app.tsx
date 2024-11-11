import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Home: React.FC = () => <h2>Главная страница</h2>;
const FavoritePlaces: React.FC = () => <h2>Избранные места</h2>;

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <h1>Путеводитель по городу</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<FavoritePlaces />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
