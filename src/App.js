import './App.css';
import Search from './container/search';
import { BrowserRouter, Route } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Route path="/:q?" children={<Search />} />
  </BrowserRouter>
);

export default App;
