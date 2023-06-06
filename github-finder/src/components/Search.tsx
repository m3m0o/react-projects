type SearchProps = {
  loadUser: (username: string) => Promise<void>
}

import { useState, KeyboardEvent } from 'react';

import { BsSearch } from 'react-icons/bs';

import styles from './Search.module.css';

const Search = ({ loadUser }: SearchProps) => {
  const [username, setUsername] = useState('');

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' ) {
      loadUser(username);
    }
  }

  return (
    <section className={ styles.search }>
      <h2>Busque por um usuário</h2>

      <p>Conheça seus melhores repositórios</p>

      <div className={ styles['search_container'] }>
        <input
          type='text'
          placeholder='Digite o nome do usuário'
          onChange={(event) => setUsername(event.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={() => loadUser(username)}>
          <BsSearch />
        </button>
      </div>
    </section>
  )
}

export default Search