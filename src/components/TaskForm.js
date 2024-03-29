import React from 'react'
import { Button, Card, CardContent, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function TaskForm() {

  const navigate = useNavigate();
  const params = useParams();

  const [task, setTask] = useState({
    title: '',
    description: '',
  })

  const [editing,setEditing]= useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(editing){
      const response = await fetch((`http://localhost:4000/tasks/${params.id}`), {
        method: 'PUT',
        body: JSON.stringify(task),
        headers: {"Content-type": "application/json; charset=UTF-8"}  // Indicates the content ype of the request body.

      });
      const data = await response.json();
      console.log(data);
    }else{
      await fetch(('http://localhost:4000/tasks'), {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {"Content-type": "application/json; charset=UTF-8"}  // Indicates the content ype of the request body.
      })
    }


    setLoading(false);
    navigate('/')
  }

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  }


  const loadTask = async (id) => {
    const response = await fetch(`http://localhost:4000/tasks/${id}`);
    const data = await response.json();
    setTask({title: data.title, description: data.description});
    setEditing(true);
  }

  useEffect( () =>{
    if(params.id){
      loadTask(params.id);
    }
  },[params.id])


  return (
    <Grid container direction='column' alignItems='center' justifyContent='center'>
      <Grid item xs={3}>
        <Card sx={{ mt: 5 }} style={{
          backgroundColor: '#1e272e',
          padding: '1rem'
        }}>
          <Typography variant='5' textAlign='center' color='white'>
            {editing ? 'Edit Task' : 'Create Task'}
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>

              <TextField variant='filled'
                label='Write your title'
                sx={{
                  display: 'block',
                  margin: '.5rem'

                }}
                name='title'
                value={task.title}
                onChange={handleChange}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: "white" } }}
              />
              <TextField variant='filled' label='Write your description' multiline rows={4} sx={{
                display: 'block',
                margin: '.5rem'

              }}
                name='description'
                value={task.description}
                onChange={handleChange}
                inputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: "white" } }}
              />

              <Button variant='contained' color='primary' type='submit'
              disabled={!task.title || !task.description}>
                {loading ? <CircularProgress color='inherit' size={24}/>: 'Save'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
