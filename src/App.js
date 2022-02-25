import { useState } from "react"
import {initialWorkouts, generateWorkout} from "./Workouts.js"
import "./App.css"

function App() {
  const [workouts, setWorkouts] = useState(initialWorkouts)
  const [showCompletedOnly, setShowCompletedOnly] = useState(false)

  const addNewWorkout = () => {
    const newWorkout = generateWorkout()
    setWorkouts([...workouts, newWorkout])
  }

  const deleteWorkout = (workout) => {
    const updatedWorkouts = workouts.filter(wko => wko !== workout)
    setWorkouts(updatedWorkouts)
  }

  const completeWorkout = (workout) => {
    const updatedWorkouts = workouts.map(wko => wko === workout ? {...wko, done: true} : wko)
    setWorkouts(updatedWorkouts)
  }

  const replaceWorkout = (workout) => {
    const newWorkout = generateWorkout()
    const updatedWorkouts = workouts.map(wko => wko === workout ? newWorkout : wko)
    setWorkouts(updatedWorkouts)
  }

  const liElement = (workout, index) => {
    return <li key={index}>
    <p>
      {workout.sets}x sets of <strong>{workout.reps}x{workout.exercise}</strong> with {workout.rest} seconds rest
    </p>
    {!workout.done && 
      <button onClick={e=>completeWorkout(workout)}>Done</button>}
    {workout.done && 
     <p>✅</p>}
    <button onClick={e=>deleteWorkout(workout)}>Delete</button>
    <button onClick={e=>replaceWorkout(workout)}>Replace</button>
  </li>
  }

  return (
    <div className="App">
      <h1>🏋️‍♀️Workout Generator</h1>
      <button onClick={addNewWorkout}>Add New Workout</button>
      <br/><br/>
      <label>Show Completed Only</label>
      <input type="checkbox" defaultChecked={showCompletedOnly} onChange={() => setShowCompletedOnly(!showCompletedOnly)}/>
      <ul>
        {!showCompletedOnly && workouts.map((workout, index) => liElement(workout, index))}
        {showCompletedOnly && workouts.filter(workout => workout.done).map((workout, index) => liElement(workout, index))}
      </ul>
      
    </div>
  )
}

export default App
