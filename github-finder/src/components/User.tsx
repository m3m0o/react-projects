import { UserProps } from '../types/user';

import { MdLocationPin } from 'react-icons/md';

import { Link } from 'react-router-dom';

const User = ({avatar_url, username, location, followers, following}: UserProps) => {
  return (
    <section>
      <img src={ avatar_url } alt={ username } />

      <h2>{ username }</h2>

      {location && (
        <p>
          <MdLocationPin />

          <span>{ location }</span>
        </p>
      )}

      <div>
        <p>{ followers }</p>
        <p>Seguidores</p>
      </div>

      <div>
        <p>Seguindo</p>
        <p>{ following }</p>
      </div>

      <Link to={`/repos/${username}`}>Ver melhores projetos</Link>
    </section>
  )
}

export default User