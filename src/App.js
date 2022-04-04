import { useEffect, useState } from 'react'
import './App.css'
import '@aws-amplify/ui-react/styles.css';

import * as amplify from './amplify'
import { Button, Loader, Authenticator } from '@aws-amplify/ui-react';
import AppForm from './AppForm';

function App() {

  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [masterLoading, setMasterLoading] = useState(false)
  const [userData, setUserData] = useState()

  useEffect(() => {
    async function getTasks() {
      setMasterLoading(true)
      const tasks = await amplify.getTasks()
      setTasks(tasks)
      setMasterLoading(false)
    }
    getTasks()
  }, [userData]);

  async function deleteTask(id) {
    setLoading(true)
    await amplify.deleteTask(id)
    const tasks = await amplify.getTasks()
    setTasks(tasks)
    setLoading(false)
  }

  async function toggleTask(id, completed) {
    setLoading(true)
    var isCompleted = !completed
    await amplify.toggleTask(id, isCompleted)
    const tasks = await amplify.getTasks()
    setTasks(tasks)
    setLoading(false)
  }

  function handleFormSubmit(data) {
    setTasks(data)
    console.log(data)
  }

  function handleSignOut(signOut) {
    async function runSignOut() {

      const response = await signOut();
      setUserData(false);
    }
    runSignOut();
  }

  return (
    <div className="App">
      {masterLoading ? <Loader variation="linear" /> :
        tasks.length > 0 ? tasks.map(task => (
          <section key={task.id}>
            <p>{task.title}
              <Button type="submit" onClick={() => { toggleTask(task.id, task.completed) }}>{task.completed ? "✅" : "⬛"}</Button>
              <Button type="submit" onClick={() => { deleteTask(task.id) }}>🗑️</Button>
            </p>
            <p>{task.username}</p>
          </section>
        ))
          : <section><p>You have no tasks!</p></section>}


      {loading ? <Loader variation="linear" /> : ''}
      <Authenticator>
        {({ signOut, user }) => {
          console.log('from authenticator component: ', user);
          setUserData(true);
          return (
            < main >
              <AppForm handleFormSubmit={handleFormSubmit}></AppForm>
              <Button onClick={(e) => { handleSignOut(signOut) }}>Sign Out</Button>
            </main>
          )
        }}
      </Authenticator>
    </div >
  )
}

export default App