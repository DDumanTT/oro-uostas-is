/**
 *
 * SearchPage
 *
 */
import * as React from 'react';
import {
  Container,
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Grid,
  AlertColor,
  Snackbar,
  Alert,
} from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { FlightCard } from './components/FlightCard';
import { FiltersPanel } from './components/FiltersPanel';
import { useState, useEffect } from 'react';
import { StringDecoder } from 'string_decoder';
import axios from '../../../axiosConfig';

const flights = [
  {
    departureTime: '11:10',
    departureCode: 'RIX',
    arrivalTime: '11:55',
    arrivalCode: 'OSL',
    duration: 105,
    date: new Date('2021-11-09'),
    price: 38.99,
    logoPath: '/img/Ryanair_Logo.png',
  },
  {
    departureTime: '18:10',
    departureCode: 'RIX',
    arrivalTime: '00:10',
    arrivalCode: 'OSL',
    duration: 420,
    date: new Date('2021-11-10'),
    price: 121.57,
    logoPath: '/img/Wizzair_Logo.png',
  },
  {
    departureTime: '13:45',
    departureCode: 'RIX',
    arrivalTime: '08:05',
    arrivalCode: 'OSL',
    duration: 1160,
    date: new Date('2021-11-11'),
    price: 164.57,
    logoPath: '/img/Airbaltic_Logo.png',
  },
];

interface Props {
  from: string;
  to: string;
}

export function SearchPage() {
  const handeSnackBarSuccess = () => {
    setSnackBar({
      severity: 'success',
      message: 'Flight was booked successfully',
    });
    setSnackBarState({ ...snackBarState, open: true });
  };

  const handeSnackBarWarning = () => {
    setSnackBar({ severity: 'warning', message: 'You won a spin!' });
    setSnackBarState({ ...snackBarState, open: true });
  };

  const handleSnackBarClose = () => {
    setSnackBarState({ ...snackBarState, open: false });
  };

  const location = useLocation();
  // let { from, to } = useParams<any>();
  const [flights, setFlights] = useState([]);
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

  const { from, to } = location.state;

  useEffect(() => {
    axios
      .get('flights/search', {
        params: {
          from,
          to,
        },
      })
      .then(res => {
        setFlights(res.data);
      });
  }, []);

  return (
    <MainContainer container spacing={2}>
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
      <FiltersPanel />
      <Grid item sm={12} md={8}>
        <Typography variant="h5">
          Flights {from} {'->'} {to}
        </Typography>
        <Stack>
          {flights.map((item, key) => {
            return (
              <FlightCard
                flightData={item}
                key={key}
                snackbar={handeSnackBarSuccess}
                bruhwin={handeSnackBarWarning}
              />
            );
          })}
        </Stack>
      </Grid>
    </MainContainer>
  );
}

const MainContainer = styled(Grid)`
  margin-top: 20px;
  align-items: flex-start;
`;
