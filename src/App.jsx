import { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import Task from './Task';
import Checkbox from './Checkbox';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]); // Başlangıçta boş bir dizi kullanılmalı

  // useEffect(() => {
  //   if (tasks.length === 0) return; // tasks.length olmalı
  //   localStorage.setItem('tasks', JSON.stringify(tasks));
  // }, [tasks]);

  // useEffect(() => {
  //   const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks')); // 'task' yerine 'tasks' kullanılmalı
  //   if (tasksFromLocalStorage) {
  //     setTasks(tasksFromLocalStorage); // Verileri state'e atamayı unutma
  //   }
  // }, []); // Bu useEffect sadece bir kere çalışmalı

  function addTask(name) {
    setTasks(prev => {
      return [...prev, { name: name, done: false }];
    });
  }

  function removeTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject, index) => index !== indexToRemove);
    });
  }
  

  function updateTaskDone(taskIndex, newDone) {
  setTasks(prev => {
    const newTasks = [...prev];
    newTasks[taskIndex].done = newDone;
    return newTasks;
  })
}

const numberComplete = tasks.filter(t => t.done).length;
const numberTotal = tasks.length;

function getMessage() {
  const percentage = numberComplete/numberTotal*100;
  if(percentage === 0){
    return 'Try to do at least one!';
  }
  
  return 'Keep it going'
}

  function renameTask(index,newName){
      setTasks(prev => {
        const newTasks = [...prev];
        newTasks[index].name = newName;
        return newTasks;
      })
  }


  return (
    <main>
      <h1>{numberComplete}/{numberTotal} Complete</h1>
      <h2>{getMessage()}</h2>
      <TaskForm onAdd={addTask} />
      {tasks.map((task, index) => (
  <Task key={index} {...task} 
    onRename={newName => renameTask(index,newName)}
    onTrash={() => removeTask(index)}
    onToggle={done => updateTaskDone(index, done)} />
      ))}
    </main>
  );
}

export default App;

