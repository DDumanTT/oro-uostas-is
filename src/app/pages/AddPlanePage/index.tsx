/**
 *
 * EmployeePanel
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
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
import axios from '../../../axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function AddPlanePage(props) {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    plane_name: '',
    total_seats: '',
    max_speed: '',
    assemble_date: Date.now(),
    model: '',
    manufacturer: '',
  });

  const updateField = e => {
    setInputData({ ...inputData, [e.target.id]: e.target.value });
  };

  const handleInsertFlight = () => {
    axios
      .post('/planes/insert', inputData)
      .then(res => {
        // navigate('/admin');
      })
      .finally(() => {
        navigate('/admin');
      });
    // axios({
    //   method: 'post',
    //   url: "/planes/insert",
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
          id="plane_name"
          required
          label="Plane name"
          value={inputData.plane_name}
          onChange={updateField}
        />
        <TextField
          id="total_seats"
          required
          label="Total seats"
          value={inputData.total_seats}
          onChange={updateField}
        />
        <TextField
          id="max_speed"
          required
          label="Max speed"
          value={inputData.max_speed}
          onChange={updateField}
        />
      </Grid>
      <Grid item lg={8} sx={{ display: 'flex' }}>
        <TextField
          id="assemble_date"
          label="Assemble date"
          required
          type="datetime-local"
          sx={{ width: 250 }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={updateField}
          value={inputData.assemble_date}
        />
        <TextField
          id="model"
          required
          type="text"
          label="Model"
          value={inputData.model}
          onChange={updateField}
        />
      </Grid>

      <Grid item lg={8} sx={{ display: 'flex' }}>
        <TextField
          id="manufacturer"
          required
          label="Manufacturer"
          value={inputData.manufacturer}
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
