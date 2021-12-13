import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Modal,
  Box,
  Grid,
  FormControlLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from '../components/_dashboard/user';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from '../../../../axiosConfig';
import { getUser, Roles } from 'user_info';

//
// import USERLIST from '../_mocks_/user';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'arrival_location', label: 'Arrival location', alignRight: false },
  { id: 'departure_location', label: 'Departure location', alignRight: false },
  { id: 'flight_code', label: 'Flight code', alignRight: false },
  { id: 'gate', label: 'Gate', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'ticket_price', label: 'Price', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      _user => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1,
    );
  }
  return stabilizedThis.map(el => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [flights, setFlights] = useState([]);

  const statusas = new Map([
    [0, 'Active'],
    [1, 'Canceled'],
    [2, 'Delayed'],
    [3, 'Boarding'],
  ]);

  useEffect(() => {
    axios
      .get('flights')
      .then(resp => {
        // handle success
        console.log(resp.data);
        setFlights(resp.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = flights.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = event => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - flights.length) : 0;

  const filteredUsers = applySortFilter(
    flights,
    getComparator(order, orderBy),
    filterName,
  );

  const [role, setRole] = useState(0);

  const updateStatus = (e, id) => {
    console.log({
      id,
      status: e.target.value,
    });

    axios
      .post('/dashboard/flights', {
        id,
        status: e.target.value,
      })
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e);
      });

    axios
      .get('flights')
      .then(resp => {
        setFlights(resp.data);
      })
      .catch(function (error) {
        setFlights([]);
      });
  };

  const isUserNotFound = filteredUsers.length === 0;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={flights.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      const {
                        id,
                        arrival_location,
                        departure_location,
                        flight_code,
                        status,
                        gate,
                        ticket_price,
                      } = row;
                      const isItemSelected = selected.indexOf(id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            {arrival_location}
                          </TableCell>
                          <TableCell align="left">
                            {departure_location}
                          </TableCell>
                          <TableCell align="left">{flight_code}</TableCell>
                          <TableCell align="left">{gate}</TableCell>
                          <TableCell align="left">
                            <Select
                              labelId="status"
                              id="status2"
                              value={status}
                              onChange={e => updateStatus(e, id)}
                            >
                              <MenuItem value={0}>Active</MenuItem>
                              <MenuItem value={1}>Canceled</MenuItem>
                              <MenuItem value={2}>Delayed</MenuItem>
                              <MenuItem value={3}>Boarding</MenuItem>
                            </Select>
                          </TableCell>
                          <TableCell align="left">€{ticket_price}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={flights.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
