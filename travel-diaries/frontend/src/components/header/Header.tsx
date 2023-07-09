import { useState } from 'react';

import { AppBar, Toolbar, Tabs, Tab } from '@mui/material';

import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';

const links = ['Home', 'Diaries', 'Auth'];

function Header() {
  const [value, setValue] = useState(0);

  return (
    <header>
      <AppBar sx={{ backgroundColor: 'transparent' }}>
        <Toolbar>
          <ModeOfTravelIcon sx={{ color: 'black' }} />

          <Tabs
            value={value}
            onChange={(_event, value) => setValue(value as number)}
            sx={{ marginLeft: 'auto', textDecoration: 'none' }}
          >
            {links.map((link) => (
              <Tab
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
