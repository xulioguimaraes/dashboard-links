import { useEffect, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

import { child, get, off, onChildAdded, onChildChanged, onChildRemoved, ref, remove, set } from 'firebase/database';

import { database } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [handleComplete, setHandleComplete] = useState(true)
  const [handleNewTask, setHandleNewTask] = useState(true)
  const roomsToDoref = ref(database, 'rooms/' + user?.id + "/to-do/")
  useEffect(() => {
    onChildAdded(roomsToDoref, (data) => {
      const newTask = data.val()
      setTasks([...tasks, newTask])
    });
    off(roomsToDoref)
    
  }, [handleNewTask])
  useEffect(() => {
    onChildChanged(roomsToDoref, (data) => {
      const task = data.val() as Task   
      setTasks([...tasks, task])
    });
    off(roomsToDoref)
   
  }, [handleComplete])
  useEffect(() => {
    if (user) {
      get(child(ref(database), 'links/' + user?.id + "/to-do")).then((snapshot) => {
        if (snapshot.exists()) {
          let task = snapshot.val() as Task[]
          task = Object.keys(task).map((index) => {
            return task[+index]
          })
          task = task.filter(item => item)
          setTasks(task)
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    }
  }, [user])
  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle.trim() === "") {
      return
    }
    const obj = {
      id: tasks[tasks.length - 1]?.id ? tasks[tasks.length - 1]?.id + 1 : 1,
      title: newTaskTitle,
      isComplete: false
    }
    setHandleNewTask(!handleNewTask)
    writeTasks(obj)
    setNewTaskTitle('')
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    let arrayTasks = tasks.map(item => item)
    arrayTasks.forEach(item => {
      if (item.id === id) {
        item.isComplete = !item.isComplete
        taskCompletion(item)
      }
    })
    setHandleComplete(!handleComplete)
  }
  function writeTasks(tasksObj: Task) {
    set(ref(database, 'links/' + user?.id + "/to-do/" + tasksObj.id), tasksObj);
  }
  function removeTasks(id: number) {
    remove(ref(database, 'links/' + user?.id + "/to-do/" + id));
  }
  function taskCompletion(tasksObj: Task) {
    set(ref(database, 'links/' + user?.id + "/to-do/" + tasksObj.id), tasksObj);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const arrayTasks = tasks.filter(item => item.id !== id)
    setTasks(arrayTasks)
    removeTasks(id)
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar nova task"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
               
              </button>
            </li>
          ))}

        </ul>
        {
          tasks?.length ===0 && <div>
            <h1>Lista de tasks vazia</h1>
          </div>
        }
      </main>
    </section>
  )
}