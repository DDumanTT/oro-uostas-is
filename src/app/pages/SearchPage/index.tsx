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
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { FlightCard } from './components/FlightCard';
import { FiltersPanel } from './components/FiltersPanel';
import { useState } from 'react';
import { StringDecoder } from 'string_decoder';

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
  let { from, to } = useParams<any>();

  return (
    <MainContainer container spacing={2}>
      <FiltersPanel />
      <Grid item sm={12} md={8}>
        <Typography variant="h5">
          Flights {from} {'->'} {to}
        </Typography>
        <Stack>
          {flights.map((item, key) => {
            return <FlightCard flightData={item} key={key} />;
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
