import { Route, Routes } from 'react-router-dom';

import Header from './components/header/Header';
import Home from './components/home/Home';
import Diaries from './components/diaries/Diaries';
import Auth from './components/auth/Auth';
import Add from './components/diaries/Add';
import Profile from './components/profile/Profile';
import DiaryUpdate from './components/diaries/DiaryUpdate';

function App() {
  return (
    <>
      <Header />

      <section>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/diaries' element={<Diaries />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/add' element={<Add />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/post/:id' element={<DiaryUpdate />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
