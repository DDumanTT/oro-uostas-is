import PropTypes from 'prop-types';
// material
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object,
};

export default function Logo({ sx }) {
  return <Button color="primary">Darbo ✈️ Partija</Button>;
}
