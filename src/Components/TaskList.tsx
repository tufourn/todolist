import React from 'react';
import { Stack, Text } from '@mantine/core'
import Task from './Task'


function TaskList({ tasks, deleteTask, toggleTaskCompleteness }: any) {
  return (
    <Stack>
      {Array.isArray(tasks) && tasks.length ? (
        tasks.map((task: any) =>
          <Task
            key={task.id}
            id={task.id}
            content={task.content}
            status={task.status}
            deleteTask={deleteTask}
            toggleTaskCompleteness={toggleTaskCompleteness}
          />
        )
      ) : (
        <Text> you have no tasks </Text>
      )}
    </Stack>
  )
}

export default TaskList;