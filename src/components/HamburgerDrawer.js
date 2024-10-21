import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
/* import ListItemIcon from '@mui/material/ListItemIcon';*/
import ListItemText from '@mui/material/ListItemText';
/* import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail'; */
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import categories from '../data/category';


export default function SwipeableTemporaryDrawer({setCategory, setLoadMore}) {
  const [state, setState] = React.useState({
    left: false,
  });

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width/* : anchor === 'top' || anchor === 'bottom' ? 'auto'  */: 200, 
      paddingLeft: 1, 
      paddingRight:1,
    }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      >
      <List>
        <ListItem>Categories</ListItem>
      </List>
      <Divider />
      <List>
        {/* {categories.map((text, index) => (
          <ListItem 
            style={{ borderRadius: 3, height: 40 }} 
            key={text}
            disablePadding
            component="button"
            onClick={() => setCategory(text)}
          >
            <ListItemText primary={text} />
          </ListItem>
          ))} */}
          {categories.map((text, index) => (
            <ListItem disablePadding key={text}>
              <ListItemButton
                style={{ borderRadius: 3, height: 40 }}
                onClick={() => {
                  setCategory(text) 
                  setLoadMore(20)
                  }
                }
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
            ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={'left'}>
        <Button onClick={toggleDrawer('left', true)}>
          <MenuIcon style={{color:"black"}}/>
          Menu
        </Button>
        <ThemeProvider theme={theme}>
          <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
          
        </ThemeProvider>
      </React.Fragment>
    </div>
  );
}