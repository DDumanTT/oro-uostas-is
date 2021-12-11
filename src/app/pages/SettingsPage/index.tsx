import {
  Avatar,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { getUser } from 'user_info';

export function SettingsPage() {
  return (
    <Grid item lg={8} sx={{ margin: '0 auto' }}>
      <Typography variant="h5" mt={4}>
        Settings
      </Typography>

      <Box display="flex" mt={2} justifyContent="space-between">
        <Avatar
          sx={{
            width: 200,
            height: 200,
            fontSize: '65px',
            borderRadius: 0,
          }}
        >
          {getUser().name}
          <p style={{ fontSize: '20px' }}>{getUser().surname}</p>
        </Avatar>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          ml={2}
        >
          <Button variant="outlined" sx={{ marginLeft: 1 }}>
            Change username
          </Button>
          <Button variant="outlined" sx={{ marginLeft: 1 }}>
            Change email
          </Button>
          <Button variant="outlined" sx={{ marginLeft: 1 }}>
            Change password
          </Button>
          <Button variant="outlined" sx={{ marginLeft: 1 }}>
            Add 2fa authentication
          </Button>
        </Box>
      </Box>
      {/* BELENKAAA SENELYZAI BRRRRRRR (tingiu margins rasyt xdd) */}
      <br />
      <hr />
      <br />
      <FormControlLabel
        control={<Switch sx={{ m: 1 }} defaultChecked />}
        label="Get email notifications"
      />
      <br />
      <FormControlLabel
        control={<Switch sx={{ m: 1 }} defaultChecked />}
        label="Get application notifications"
      />
      <br />
      <br />
      <hr />
      <Button
        variant="outlined"
        sx={{ marginLeft: 1, marginTop: 2 }}
        color="error"
      >
        Delete account
      </Button>
      <br />
      <br />
      <br />
    </Grid>
  );
}
