import { Outlet } from 'react-router-dom';

import styles from './App.module.css';

function App() {
  return (
    <main className={ styles.app }>
      <h1>Github Finder</h1>

      <Outlet />
    </main>
  )
}

export default App
