import {
  Alert,
  AlertColor,
  Avatar,
  Button,
  FormControlLabel,
  Grid,
  Snackbar,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUser } from 'user_info';
import axios from '../../../axiosConfig';
import { FlightCard } from '../SearchPage/components/FlightCard';

export function ProfilePage() {
  const [flights, setFlights] = React.useState([]);

  //  reik gaut vartotoju nupirktus skrydzius ir sumest i flights
  React.useEffect(() => {
    axios.get('/bookings').then(res => {
      console.log(res);
      setFlights(res.data.flights);
    });
  }, []);

  const handeSnackBarError = () => {
    setSnackBar({ severity: 'error', message: 'Flight was canceled' });
    setSnackBarState({ ...snackBarState, open: true });
  };

  const [snackBarState, setSnackBarState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
  });
  const [snackBar, setSnackBar] = React.useState<{
    severity: AlertColor;
    message: string;
  }>({
    severity: 'info',
    message: '',
  });
  const { vertical, horizontal, open }: any = snackBarState;
  const handleSnackBarClose = () => {
    setSnackBarState({ ...snackBarState, open: false });
  };

  return (
    <Grid item lg={8} sx={{ margin: '0 auto' }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackBarState.open}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity={snackBar.severity}
          sx={{ width: '100%' }}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
      <Typography variant="h5" mt={4}>
        Profile page
      </Typography>

      <Box display="flex" mt={2}>
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
        <Box display="flex" flexDirection="column" ml={2} sx={{ width: 1 }}>
          <Box
            sx={{
              background: '#757575',
              width: '100%',
              height: '100%',
              fontSize: 15,
            }}
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            alignItems="center"
          >
            <p>Top text</p>
            <p>Bottom text</p>
          </Box>
        </Box>
      </Box>
      {/* BELENKAAA SENELYZAI BRRRRRRR (tingiu margins rasyt xdd) */}
      <br />
      <Typography variant="h5" mt={4}>
        Bought flights
      </Typography>
      <hr />
      <br />
      <Stack>
        {/* Reik pridet mygtuka kad atsaukt skrydi */}
        {flights.map((item, key) => {
          return (
            <FlightCard
              flightData={item}
              key={key}
              delete={true}
              snackbar={handeSnackBarError}
            />
          );
        })}
      </Stack>
      <br />
      <br />
      <br />
    </Grid>
  );
}
