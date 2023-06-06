import { UserProps } from '../types/user';

import { MdLocationPin } from 'react-icons/md';

import { Link } from 'react-router-dom';

import styles from './User.module.css';

const User = ({avatar_url, username, location, followers, following}: UserProps) => {
  return (
    <section className={ styles.user }>
      <img src={ avatar_url } alt={ username } />

      <h2>{ username }</h2>

      {location && (
        <p className={ styles.location }>
          <MdLocationPin />

          <span>{ location }</span>
        </p>
      )}

      <div className={ styles.stats }>
        <div>
          <p className={ styles.number }>{ followers }</p>
          <p>Seguidores</p>
        </div>

        <div>
          <p className={ styles.number }>{ following }</p>
          <p>Seguindo</p>
        </div>
      </div>

      <Link to={`/repos/${username}`}>Ver melhores projetos</Link>
    </section>
  )
}

export default User