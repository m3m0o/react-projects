import { useState } from 'react';

import { UserProps } from '../types/user';

import Search from '../components/Search';

const Home = () => {
  const [user, setUser] = useState<UserProps | null>(null);

  const loadUser = async(username: string) => {
    const response = await fetch(`https://api.github.com/users/${username}`);

    const data = await response.json();

    const { avatar_url, login, location, followers, following } = data;

    const userData: UserProps = {
      avatar_url,
      username,
      location,
      followers,
      following
    }

    setUser(userData)
  }

  return (
    <section>
      <Search loadUser={ loadUser } />

      { user && <p>{ user.username }</p> }
    </section>
  )
}

export default Home;