import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import {TASK_STATUSES} from './../constants/index';

const styles = {
  card: {
    minWidth: 275,
    marginBottom: '1rem'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const Task = props => {

  const { classes } = props;
  const { title, description, status, id } = props.task;

  const onStatusChange = e => {
    const newStatus = e.target.value;
    const {changeStatus} = props;
    changeStatus(id, newStatus);
  }

  const renderStatus = () => {
    const xhtml = (
      <Select
        value={status}
        onChange={onStatusChange}
      >
        { TASK_STATUSES.map((status, i) => {
          return <MenuItem key={i} value={status}>{status}</MenuItem>;
        }) }
      </Select>
    );
    return xhtml;
  }

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item md={8}>
            <Typography component="h2" variant="h4" gutterBottom>
              {title}
            </Typography>
          </Grid>
          <Grid item md={4}>
            {renderStatus()}
          </Grid>
        </Grid>
        <Typography component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
};

Task.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Task);

