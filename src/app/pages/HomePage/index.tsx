import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Container, TextField } from '@mui/material';
import styled from 'styled-components';

export function HomePage() {
  return (
    <Container maxWidth="md">
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <SearchBar helperText="Where you want to go?" label="Destination" />
      <span>HomePage container</span>
    </Container>
  );
}

const SearchBar = styled(TextField)`
  width: 100%;
  margin-top: 45px;
  input {
    display: block;
  }
`;
