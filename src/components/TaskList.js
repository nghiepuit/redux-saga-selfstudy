import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import Task from './Task';

const styles = theme => ({
  taskTitle: {
    margin: '1rem'
  }
});

const TaskList = props => {
  
  const {tasks, status, classes} = props;

  const renderTask = () => {
    const {changeStatus} = props;
    let result = null;
    if (tasks && tasks.length > 0) {
      result = tasks.map(task => {
        return (
          <Task key={task.id} task={task} changeStatus={changeStatus}></Task>
        );
      });
    }
    return result;
  }

  return (
    <div className="task-list">
      <div className={classes.taskTitle}>
        <strong>
          {status}
        </strong>
      </div>
      <div className="task">
        {renderTask()}
      </div>
    </div>  
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  status: PropTypes.string.isRequired
};

export default withStyles(styles)(TaskList);
