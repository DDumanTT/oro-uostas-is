/**
 *
 * EmployeePanel
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';

function ShowFlights(props) {}

function EditFlights(props) {}

function InsertFlight(props) {
  const endpoint = 'flights/insert';
  const [inputData, setInputData] = useState({
    flight_code: '',
    departure_location: '',
    arrival_location: '',
    status: 'Active',
    gate: '',
    boarding_time: '',
    ticket_price: '',
    duration: '',
  });

  const updateField = e => {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };

  const updateStatus = e => {
    setInputData({ ...inputData, status: e.target.value });
  };

  const handleInsertFlight = () => {
    console.log(inputData);
    // axios({
    //   method: 'post',
    //   url: endpoint,
    //   data: {
    //     firstName: 'Fred',
    //     lastName: 'Flintstone',
    //   },
    // });
  };

  return (
    <Grid
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      mt={5}
      noValidate
      autoComplete="off"
      justifyContent="center"
      rowSpacing={2}
      // columnSpacing={4}
      container
    >
      <Grid item lg={8} sx={{ display: 'flex' }}>
        <TextField
          id="flight_code"
          required
          label="Flight code"
          value={inputData.flight_code}
          onChange={updateField}
        />
        <TextField
          id="departure_location"
          required
          label="Departure location"
          value={inputData.departure_location}
          onChange={updateField}
        />
        <TextField
          id="arrival_location"
          required
          label="Arrival location"
          value={inputData.arrival_location}
          onChange={updateField}
        />
      </Grid>
      <Grid item lg={8} sx={{ display: 'flex' }}>
        <FormControl fullWidth sx={{ margin: '8px' }}>
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            id="status2"
            value={inputData.status}
            label="Status"
            onChange={updateStatus}
          >
            <MenuItem value={'Active'}>Active</MenuItem>
            <MenuItem value={'Canceled'}>Canceled</MenuItem>
            <MenuItem value={'Delayed'}>Delayed</MenuItem>
            <MenuItem value={'Boarding'}>Boarding</MenuItem>
          </Select>
        </FormControl>

        <TextField
          id="gate"
          required
          type="text"
          label="Gate"
          value={inputData.gate}
          onChange={updateField}
        />
      </Grid>

      <Grid item lg={8} sx={{ display: 'flex' }}>
        <TextField
          id="boarding_time"
          label="Boarding time"
          required
          type="datetime-local"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={updateField}
          value={inputData.boarding_time}
        />
        <TextField
          id="ticket_price"
          required
          type="number"
          label="Ticket price"
          value={inputData.ticket_price}
          onChange={updateField}
        />
        <TextField
          id="duration"
          required
          label="Duration"
          type="text"
          value={inputData.duration}
          onChange={updateField}
        />
      </Grid>

      <Grid
        item
        lg={8}
        display="flex"
        justifyContent="flex-end"
        mr={2}
        height="66px"
      >
        <Button onClick={handleInsertFlight} variant="contained">
          Save flight
        </Button>
      </Grid>
    </Grid>
  );
}

interface Props {}

export function EmployeePanel(props: Props) {
  const [flights, setFlights] = useState([]);

  return (
    <Box>
      {/* <Button variant="contained">Add</Button> */}
      {/* <Button variant="text">Edit</Button> */}
      {/* <Button variant="outlined">Discount</Button> */}
      {/* Darbuotojų posistemė - darbuotojai gali prisijungti prie darbuotojų
      sąsajos, kurioje gali pridėti, redaguoti, skrydžius, keisti jų statusą,
      suteikti nuolaidas ir */}

      <InsertFlight />
    </Box>
  );
}

const Div = styled.div``;
