export const filterTask = (tasks, status) => {
  let filtertedTasks = tasks.filter((task) => task.taskStatus === status);
  return filtertedTasks;
};

export const getStatusList = () => {
  const statues = ["To Do", "In Progress", "Completed", "Archived"];
  return statues;
};
