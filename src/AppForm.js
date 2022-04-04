import React from 'react'
import { useState } from 'react'
import './App.css'

import * as amplify from './amplify'
import { Button, Loader, View, Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

function AppForm({ handleFormSubmit }) {
    const [taskTitle, setTaskTitle] = useState("")
    const [loading, setLoading] = useState(false)

    const createTask = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await amplify.createTask(taskTitle)
            let data = await amplify.getTasks()
            handleFormSubmit(data)
        }
        catch (e) {
            console.error(e)
        }
        setLoading(false)
    }

    return (
        <div>
            {loading ? <Loader variation="linear" /> : ''}
            <form onSubmit={createTask}>
                <input onChange={e => setTaskTitle(e.target.value)} type="text" />
                <br />
                <Button type="submit">Create</Button>
            </form>
        </div>
    )
}

export default AppForm