import { useState } from 'react';

import { UserProps } from '../types/user';

import Search from '../components/Search';
import User from '../components/User';
import Error from '../components/Error';

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [error, setError] = useState(false);

  const loadUser = async(username: string) => {
    setError(false);
    setUser(null);
    
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (response.status === 404) {
      setError(true);

      return
    }

    const data = await response.json();

    const { avatar_url, login, location, followers, following } = data;

    const userData: UserProps = {
      avatar_url,
      username: login,
      location,
      followers,
      following
    }

    setUser(userData)
  }

  return (
    <section>
      <Search loadUser={ loadUser } />

      { user && <User {...user} /> }
      { error && <Error /> }
    </section>
  )
}

export default Home;