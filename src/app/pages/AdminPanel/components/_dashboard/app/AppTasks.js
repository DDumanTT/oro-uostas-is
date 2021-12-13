import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Card,
  Checkbox,
  CardHeader,
  Typography,
  FormControlLabel,
  Stack,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

TaskItem.propTypes = {
  task: PropTypes.string,
  checked: PropTypes.bool,
  formik: PropTypes.object,
};

function TaskItem({ task, checked, formik, ...other }) {
  const { getFieldProps } = formik;

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ py: 0.75 }}>
      <FormControlLabel
        control={
          <Checkbox
            {...getFieldProps('checked')}
            value={task}
            checked={checked}
            {...other}
          />
        }
        label={
          <Typography
            variant="body2"
            sx={{
              ...(checked && {
                color: 'text.disabled',
                textDecoration: 'line-through',
              }),
            }}
          >
            {task}
          </Typography>
        }
      />
    </Stack>
  );
}

export default function AppTasks() {
  const [TASKS, addTask] = useState([
    'Find the location of Zenius',
    'Call joe on skype',
    'Create website',
    'Invest in bitconnect',
    'Order pizza',
  ]);
  const [newTask, setNewTask] = useState('');

  const formik = useFormik({
    initialValues: {
      checked: [TASKS[2]],
    },
    onSubmit: values => {
      console.log(values);
    },
  });

  const addEvent = e => {
    e.preventDefault();
    addTask([...TASKS, newTask]);
    setNewTask('');
  };

  const { values, handleSubmit } = formik;

  return (
    <Card>
      <CardHeader title="Events" />
      <Box sx={{ px: 3, py: 1 }}>
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {TASKS.map(task => (
              <TaskItem
                key={task}
                task={task}
                formik={formik}
                checked={values.checked.includes(task)}
              />
            ))}
          </Form>
        </FormikProvider>
      </Box>
      <Grid
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
        display="flex"
      >
        {/* <Grid item lg={8} sx={{ display: 'flex' }}> */}
        <TextField
          id="flight_code"
          required
          label="New event"
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        {/* </Grid> */}
        <Grid
          item
          lg={4}
          display="flex"
          justifyContent="flex-end"
          mr={2}
          height="66px"
        >
          <Button onClick={addEvent} variant="contained" sx={{ margin: '7px' }}>
            Add event
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
