import Amplify, { API } from "aws-amplify"
import awsExports from "./aws-exports"

Amplify.configure(awsExports)

const apiName = 'taskList'

export async function getTasks() {
    const path = '/tasks'
    const result = await API.get(apiName, path)
    return result.tasks
}

export async function createTask(title) {
    const path = '/tasks'
    const result = await API.post(apiName, path, {
        body: { title }
    })
    return result.task
}

export async function toggleTask(id, completed) {
    const path = '/tasks/' + id
    const result = await API.patch(apiName, path, {
        body: { completed }
    })
    return result.task
}

export async function deleteTask(id) {
    const path = '/tasks/' + id
    const result = await API.del(apiName, path)
    return result.tasks
}