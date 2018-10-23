import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import TaskList from './../components/TaskList';
import TaskForm from './../components/TaskForm';
import {TASK_STATUSES} from './../constants';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  colorPrimary: {
    backgroundColor: '#B2DFDB',
  },
  barColorPrimary: {
    backgroundColor: '#00695C',
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
});

class TaskPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showForm: false
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  renderTaskList = () => {
    const {tasks, changeStatus, loading, classes} = this.props;
    if (loading && loading === true) {
      return (
        <CircularProgress className={classes.progress} color="secondary" />
      );
    } else {
      return TASK_STATUSES.map((status, i) => {
        const tasksFilter = tasks.filter(task => task.status === status);
        return (
          <Grid item md={4} key={i}>
            <TaskList tasks={tasksFilter} status={status} changeStatus={changeStatus}/>
          </Grid>
        );
      });
    }
  }

  renderForm = () => {
    const {showForm} = this.state;
    let xhtml = null;
    if (showForm) {
      xhtml = <TaskForm 
        open={showForm} 
        onClose={e => this.handleClose(e)} 
        onSave={e => this.handleSave(e) }
      />;
    }
    return xhtml;
  }

  handleClose = data => {
    this.setState({
      showForm: data
    });
  }

  handleSave = data => {
    const {saveTask} = this.props;
    this.setState({
      showForm: false
    });
    saveTask(data);
  }

  toggleForm() {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  render() {
    const {classes} = this.props;
    return (
      <div className="tasks">
        <Button variant="contained" className={classes.button} onClick={() => this.toggleForm()}>
          <AddIcon /> Add
        </Button>
        {this.renderForm()}
        <Grid container className={classes.root} spacing={16}>
          {this.renderTaskList()}
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(TaskPage);
