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
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TableBody,
  Paper,
} from '@mui/material';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from '../../../axiosConfig';
import { useNavigate } from 'react-router-dom';

enum Status {
  Active,
  Cancelled,
  Delayed,
  Boarding,
}

function ShowPlanes({ planes = [] }) {
  return (
    <Grid
      display="flex"
      justifyContent="center"
      md={8}
      sx={{ margin: '0 auto' }}
    >
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Plane name</TableCell>
              <TableCell align="right">Model</TableCell>
              <TableCell align="right">Total seats</TableCell>
              <TableCell align="right">Max speeds</TableCell>
              <TableCell align="right">Manufacturer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planes.map((plane: any) => (
              <TableRow
                key={plane.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{plane.id}</TableCell>
                <TableCell align="right">{plane.manufacturer}</TableCell>
                <TableCell align="right">{plane.plane_name}</TableCell>
                <TableCell align="right">{plane.model}</TableCell>
                <TableCell align="right">{plane.total_seats}</TableCell>
                <TableCell align="right">{plane.max_speed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}

function EditFlights(props) {}

function InsertFlight(props) {
  const endpoint = 'flights/insert';
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    flight_code: '',
    departure_location: '',
    arrival_location: '',
    status: 0,
    gate: '',
    boarding_time: '',
    ticket_price: '',
    duration: '',
    plane_id: '',
  });

  const updateField = e => {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };

  const updateStatus = e => {
    setInputData({ ...inputData, status: e.target.value });
  };

  const handleInsertFlight = () => {
    console.log(inputData);
    axios
      .post('/flights/insert', inputData)
      .then(res => {
        console.log(res);
        navigate('/admin');
      })
      .catch(e => {
        console.log(e);
      });
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
            <MenuItem value={0}>Active</MenuItem>
            <MenuItem value={1}>Canceled</MenuItem>
            <MenuItem value={2}>Delayed</MenuItem>
            <MenuItem value={3}>Boarding</MenuItem>
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
          // type="time"
          label="Duration"
          value={inputData.duration}
          onChange={updateField}
        />
        <TextField
          id="plane_id"
          required
          label="Plane id"
          type="text"
          value={inputData.plane_id}
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
  const [planes, setPlanes] = useState([]);

  React.useEffect(() => {
    axios.get('/planes').then(res => {
      setPlanes(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    <Box>
      {/* <Button variant="contained">Add</Button> */}
      {/* <Button variant="text">Edit</Button> */}
      {/* <Button variant="outlined">Discount</Button> */}
      {/* Darbuotojų posistemė - darbuotojai gali prisijungti prie darbuotojų
      sąsajos, kurioje gali pridėti, redaguoti, skrydžius, keisti jų statusą,
      suteikti nuolaidas ir */}
      <ShowPlanes planes={planes} />
      <InsertFlight />
    </Box>
  );
}

const Div = styled.div``;
