import {
  Avatar,
  Button,
  FormControlLabel,
  Grid,
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
  //   React.useEffect(() => {
  //     axios.get('flights/search').then(res => {
  //       console.log(res);
  //       setFlights(res.data);
  //     });
  //   }, []);

  return (
    <Grid item lg={8} sx={{ margin: '0 auto' }}>
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
          return <FlightCard flightData={item} key={key} />;
        })}
      </Stack>
      <br />
      <br />
      <br />
    </Grid>
  );
}
