/**
 *
 * FlightCard
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
} from '@mui/material';

interface Props {
  flightData: {
    departureTime: string;
    departure_code: string;
    arrivalTime: string;
    arrival_code: string;
    duration: number;
    boarding_time: Date;
    ticket_price: number;
    logoPath: string;
  };
}

export function FlightCard(props: Props) {
  let data = props.flightData;
  var datetime = new Date('1970-01-01 ' + data.duration);
  return (
    <StyledCard>
      <CardTop subheader={data.boarding_time} />
      <CardContent>
        <StyledInfo>
          <CardElement>
            {/* <Typography variant="h5">{data.departure_code}</Typography> */}
          </CardElement>
          <MiddleElement>
            <Typography variant="h5">
              {String(datetime.getHours()).padStart(2, '0')}:
              {String(datetime.getMinutes()).padStart(2, '0')}
            </Typography>
          </MiddleElement>
          <CardElement>
            {/* <Typography variant="h5">{data.arrival_code}</Typography> */}
          </CardElement>
        </StyledInfo>
      </CardContent>
      <CardFooter>
        {/* <Box sx={{ display: 'flex', flexGrow: 1, height: '5vh' }}>
          <img width="auto" height="auto" src={data.logoPath} alt="logo" />
        </Box> */}
        <Typography variant="h6" sx={{ display: 'flex' }}>
          €{data.ticket_price}
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{ marginLeft: '15px', display: 'flex' }}
        >
          Book
        </Button>
      </CardFooter>
    </StyledCard>
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
  img {
    margin-right: auto;
    margin-left: 5px;
  }
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
`;
