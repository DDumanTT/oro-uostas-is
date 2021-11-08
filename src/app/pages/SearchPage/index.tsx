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
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';

interface Props {}

const flights = [
  {
    departureTime: '11:10',
    departureCode: 'RIX',
    arrivalTime: '11:55',
    arrivalCode: 'OSL',
    duration: 105,
    date: new Date('2021-11-09'),
    price: 38.99,
  },
  {
    departureTime: '18:10',
    departureCode: 'RIX',
    arrivalTime: '00:10',
    arrivalCode: 'OSL',
    duration: 420,
    date: new Date('2021-11-10'),
    price: 121.57,
  },
  {
    departureTime: '13:45',
    departureCode: 'RIX',
    arrivalTime: '08:05',
    arrivalCode: 'OSL',
    duration: 1160,
    date: new Date('2021-11-11'),
    price: 164.57,
  },
];

export function SearchPage(props: Props) {
  let { from, to } = useParams<{ from: string; to: string }>();

  return (
    <MainContainer sx={{ display: 'inline-flex', alignItems: 'center' }}>
      <Box sx={{ flex: '1 1 auto', display: 'flex', justifyContent: 'center' }}>
        filters
      </Box>
      <Box
        sx={{
          flex: '2 1 auto',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h5">
          Flights {from} {'->'} {to}
        </Typography>
        <Stack>
          {flights.map((item, key) => {
            let hours = Math.floor(item.duration / 60);
            let minutes = item.duration - hours * 60;
            return (
              <StyledCard key={key}>
                <CardTop subheader={item.date.toISOString().substring(0, 10)} />
                {/* <Typography variant="subtitle2">
                    {item.date.toISOString().substring(0, 10)}
                  </Typography> */}
                {/* </CardTop> */}
                <CardContent>
                  <StyledInfo>
                    <CardElement>
                      <Typography variant="h5">{item.departureCode}</Typography>
                    </CardElement>
                    <MiddleElement>
                      <Typography variant="h5">
                        {String(hours).padStart(2, '0')}:
                        {String(minutes).padStart(2, '0')}
                      </Typography>
                    </MiddleElement>
                    <CardElement>
                      <Typography variant="h5">{item.arrivalCode}</Typography>
                    </CardElement>
                  </StyledInfo>
                </CardContent>
                <CardFooter>
                  <Typography variant="h6">€{item.price}</Typography>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{ marginLeft: '20px' }}
                  >
                    Yoink
                  </Button>
                </CardFooter>
              </StyledCard>
            );
          })}
        </Stack>
      </Box>
    </MainContainer>
  );
}

const CardElement = styled(Box)`
  width: 100%;
  height: 100%;
  text-align: center;
`;

const MiddleElement = styled(Box)`
  border-left: 1px ${props => props.theme.palette.primary.main} solid;
  border-right: 1px ${props => props.theme.palette.primary.main} solid;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const CardTop = styled(CardHeader)`
  border-bottom: 1px ${props => props.theme.palette.primary.main} solid;
`;

const CardFooter = styled(CardActions)`
  padding-top: 16px;
  border-top: 1px ${props => props.theme.palette.primary.main} solid;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const StyledInfo = styled(Box)`
  display: inline-flex;
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
  justify-content: space-evenly;
`;

const StyledCard = styled(Card)`
  margin-top: 15px;
  /* div:last-child {
    padding-bottom: 8px;
  } */
`;

const MainContainer = styled(Container)`
  margin-top: 20px;
`;
