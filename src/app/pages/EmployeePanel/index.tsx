/**
 *
 * EmployeePanel
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

function flights(props) {
  return <Box></Box>;
}

function editFlights(props) {
  return <Box></Box>;
}

interface Props {}

export function EmployeePanel(props: Props) {
  const [flights, setFlights] = useState([]);

  return (
    <Box>
      <Button variant="contained">Add</Button>
      <Button variant="text">Edit</Button>
      <Button variant="outlined">Discount</Button>
      Darbuotojų posistemė - darbuotojai gali prisijungti prie darbuotojų
      sąsajos, kurioje gali pridėti, redaguoti, skrydžius, keisti jų statusą,
      suteikti nuolaidas ir
    </Box>
  );
}

const Div = styled.div``;
