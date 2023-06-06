type SearchProps = {
  loadUser: (username: string) => Promise<void>
}

import { useState } from 'react';

import { BsSearch } from 'react-icons/bs';

const Search = ({ loadUser }: SearchProps) => {
  const [username, setUsername] = useState('');

  return (
    <>
      <h2>Busque por um usuário</h2>

      <p>Conheça seus melhores repositórios</p>

      <section>
        <input type='text' placeholder='Digite o nome do usuário' onChange={(event) => setUsername(event.target.value) }/>

        <button onClick={() => loadUser(username)}>
          <BsSearch />
        </button>
      </section>
    </>
  )
}

export default Search