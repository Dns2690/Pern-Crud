import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent, Typography } from '@mui/material'
import {useNavigate} from 'react-router-dom'

export default function TaskForm() {
  const navigate = useNavigate();

  const [tasks, setTask] = useState([]);

  const loadTask = async () => {
    const response = await fetch('http://localhost:4000/tasks');
    const data = await response.json();
    setTask(data);
  }

  useEffect(() => {
    loadTask();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:4000/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
  
        }
      });
      
      setTask(tasks.filter(task => task.id !== id));//eliminar en front
    } catch (error) {
      console.log(error);
    }
    
  }




  return (
    <>
      <h1>TaskForm </h1>
      {tasks.map(task =>
        <Card style={{
          marginBottom: ".7rem",
          backgroundColor: '#1e272e'
        }} 
        key={task.id}>
          <CardContent style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
            <div style={{ color: 'white' }} >
              <Typography>{task.title}</Typography>
              <Typography>{task.description}</Typography>
            </div>

            <div>
              <Button variant='contained' color='inherit' onClick={() => 
              navigate(`/tasks/${task.id}/edit`)}>
                Edit
              </Button>

              <Button variant='contained' color='warning' onClick={() => handleDelete(task.id)} style = {{marginLeft:'.4rem'}}>
              Delete
            </Button>
          </div>

        </CardContent>
        </Card >
      )
}

    </>
  )
}