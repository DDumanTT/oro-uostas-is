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
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="flight_code"
        required
        label="Flight code"
        variant="standard"
        value={inputData.flight_code}
        onChange={updateField}
      />
      <TextField
        id="departure_location"
        required
        label="Departure location"
        variant="standard"
        value={inputData.departure_location}
        onChange={updateField}
      />
      <TextField
        id="arrival_location"
        required
        label="Arrival location"
        variant="standard"
        value={inputData.arrival_location}
        onChange={updateField}
      />
      <TextField
        id="status"
        label="Status"
        variant="standard"
        value={inputData.status}
        onChange={updateField}
      />

      <Select
        labelId="demo-simple-select-standard-label"
        id="status"
        value={inputData.status}
        label="Status"
        onChange={updateField}
      >
        <MenuItem value={'Active'}>Active</MenuItem>
        <MenuItem value={'Canceled'}>Canceled</MenuItem>
        <MenuItem value={'Delayed'}>Delayed</MenuItem>
        <MenuItem value={'Boarding'}>Boarding</MenuItem>
      </Select>

      <TextField
        id="gate"
        required
        type="text"
        label="Gate"
        variant="standard"
        value={inputData.gate}
        onChange={updateField}
      />
      <TextField
        id="boarding_time"
        required
        type="date"
        label="Boarding time"
        variant="standard"
        value={inputData.boarding_time}
        onChange={updateField}
      />
      <TextField
        id="ticket_price"
        required
        type="number"
        label="Ticket price"
        variant="standard"
        value={inputData.ticket_price}
        onChange={updateField}
      />
      <TextField
        id="duration"
        required
        label="Duration"
        type="time"
        variant="standard"
        value={inputData.duration}
        onChange={updateField}
      />
      <Button onClick={handleInsertFlight} variant="contained">
        Add flight
      </Button>
    </Box>
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
