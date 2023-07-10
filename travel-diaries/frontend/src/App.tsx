import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { Route, Routes } from 'react-router-dom';

import { useSelector } from 'react-redux/es/hooks/useSelector';

import { authActions } from './store';

import Header from './components/header/Header';
import Home from './components/home/Home';
import Diaries from './components/diaries/Diaries';
import Auth from './components/auth/Auth';
import Add from './components/diaries/Add';
import Profile from './components/profile/Profile';
import DiaryUpdate from './components/diaries/DiaryUpdate';

function App() {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.isLoggedIn as boolean);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch(authActions.login());
    }
  }, [localStorage]);

  return (
    <>
      <Header />

      <section>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/diaries' element={<Diaries />} />
          <Route path='/auth' element={<Auth />} />

          {isLoggedIn && (
            <>
              <Route path='/add' element={<Add />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/post/:id' element={<DiaryUpdate />} />{' '}
            </>
          )}
        </Routes>
      </section>
    </>
  );
}

export default App;
