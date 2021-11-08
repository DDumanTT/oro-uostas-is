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
    departureCode: string;
    arrivalTime: string;
    arrivalCode: string;
    duration: number;
    date: Date;
    price: number;
    logoPath: string;
  };
}

export function FlightCard(props: Props) {
  let data = props.flightData;
  let hours = Math.floor(data.duration / 60);
  let minutes = data.duration - hours * 60;
  return (
    <StyledCard>
      <CardTop subheader={data.date.toISOString().substring(0, 10)} />
      <CardContent>
        <StyledInfo>
          <CardElement>
            <Typography variant="h5">{data.departureCode}</Typography>
          </CardElement>
          <MiddleElement>
            <Typography variant="h5">
              {String(hours).padStart(2, '0')}:
              {String(minutes).padStart(2, '0')}
            </Typography>
          </MiddleElement>
          <CardElement>
            <Typography variant="h5">{data.arrivalCode}</Typography>
          </CardElement>
        </StyledInfo>
      </CardContent>
      <CardFooter>
        <Box sx={{ display: 'flex', flexGrow: 1, height: '5vh' }}>
          <img width="auto" height="auto" src={data.logoPath} alt="logo" />
        </Box>
        <Typography variant="h6" sx={{ display: 'flex' }}>
          €{data.price}
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
