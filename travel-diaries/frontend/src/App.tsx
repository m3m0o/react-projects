import { Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';
import Home from './components/home/Home';
import Diaries from './components/diaries/Diaries';
import Auth from './components/auth/Auth';

function App() {
  return (
    <>
      <Header />

      <section>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/diaries' element={<Diaries />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
