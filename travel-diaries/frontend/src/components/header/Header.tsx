import { useState } from 'react';

import { useSelector } from 'react-redux/es/hooks/useSelector';

import { Link } from 'react-router-dom';

import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';

import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';

const links = ['home', 'diaries', 'auth'];
const loggedInLinks = ['home', 'diaries', 'add', 'profile'];

function Header() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn as boolean);

  const [value, setValue] = useState(0);

  return (
    <header>
      <AppBar sx={{ backgroundColor: 'transparent', position: 'sticky' }}>
        <Toolbar>
          <ModeOfTravelIcon sx={{ color: 'black' }} />

          <Tabs
            value={value}
            onChange={(_event, value) => setValue(value as number)}
            sx={{ marginLeft: 'auto', textDecoration: 'none' }}
          >
            {isLoggedIn
              ? loggedInLinks.map((link) => (
                  <Tab
                    LinkComponent={Link}
                    to={`/${link === 'home' ? '' : link}`}
                    sx={{
                      textDecoration: 'none',
                      ':hover': {
                        textDecoration: 'underline',
                        textUnderlineOffset: '18px',
                      },
                    }}
                    label={link}
                    key={link}
                  />
                ))
              : links.map((link) => (
                  <Tab
                    LinkComponent={Link}
                    to={`/${link === 'home' ? '' : link}`}
                    sx={{
                      textDecoration: 'none',
                      ':hover': {
                        textDecoration: 'underline',
                        textUnderlineOffset: '18px',
                      },
                    }}
                    label={link}
                    key={link}
                  />
                ))}
          </Tabs>
        </Toolbar>
      </AppBar>
    </header>
  );
}

export default Header;
