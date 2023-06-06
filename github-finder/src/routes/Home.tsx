import { useState } from 'react';

import { UserProps } from '../types/user';

import Search from '../components/Search';
import User from '../components/User';

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);

  const loadUser = async(username: string) => {
    const response = await fetch(`https://api.github.com/users/${username}`);

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
    </section>
  )
}

export default Home;