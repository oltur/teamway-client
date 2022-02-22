import {
    Typography,
    Link as MuiLink,
  } from '@mui/material';
  
function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Teamway test task by Alexander Turevskiy, Copyright © '}
        <MuiLink color="inherit" href="https://turevskiy.com">
          https://turevskiy.com
        </MuiLink>
        {' '}
        {new Date().getFullYear()}.
        <br />
        {'Tests are © '}
        <MuiLink color="inherit" href="https://www.psychologies.co.uk">
          https://www.psychologies.co.uk
        </MuiLink>
      </Typography>
    );
  }

  export default Copyright;