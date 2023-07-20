import { useState, useEffect } from 'react'
import personService from './services/Persons'


const Filter = ({ handleInput, input}) => {
  return (
    <div>
      search phonebook 
      <input 
        value = {input}
        onChange = {handleInput}
      />
    </div>
  )
}

const Buttons = ({handleFilter, setSearch, search}) => {

  return (
    <div>
      {search? 
        <button onClick={() => setSearch(false)}>show all contacts</button>:
        <button onClick={handleFilter}>search</button>
      }
    </div>
  )
}

const PersonForm=({addPerson, newName, handleChange, number, handleNumber})=>{
  return (
    <div>
      <h1>Add a new contact</h1>
      <form onSubmit={addPerson}>
        <div>
          <div>
            name: 
            <input
              value = {newName} 
              onChange={handleChange}
            />
          </div>
          <div>
            number:
            <input 
              value = {number}
              onChange={handleNumber}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
} 


const Persons =({search, filterList, persons, deletePerson})=>{
  return (
    <div>
      <h2>Conatct list</h2>
      <div>
        {search ? 
        <ul>
          {filterList && filterList.map((e) => {
            return (
              <li key={e.id}>{e.name} {e.number}</li>
            )
          })}
        </ul>:        
        <ul>
          {persons && persons.map((e) => {
            return (
                <li key={e.id}>{e.name} {e.content} {e.number}   <button onClick={() => deletePerson(e)}>delete</button> </li>
            )
          })}
        </ul>}
      </div>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [number, setNewNumber] = useState('')
  const [input, setInput] = useState('')
  const [filterList, setFilterList] = useState([])
  const [search, setSearch ] = useState(false)

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response)
    })
  }, [])

  const addPerson = event => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      number:number,
      important: Math.random() < 0.5,
    }

    let val = persons.filter((p) => p.name.toLowerCase() === newName.toLowerCase())

    if(val.length === 0 ) {
      personService
        .create(noteObject)
        .then(response => {
          setPersons(persons.concat(response))
      })

      setNewName('')
      setNewNumber('')
    } else {
      let x = window.confirm(`${val[0].name} is already added to phonebook, replace new number with old one?`)
      if(x){
        personService.update(val[0].id,noteObject)
        window.location.reload(true)
      }else{
        setNewName('')
        setNewNumber('')
      }
    }

  }


  const deletePerson = (person) => {
    let ans = window.confirm(`Delete ${person.name} ?`)
    if(ans){
      personService.deleteItem(person.id)
      window.location.reload(ans)
    } 
  }

  const handleChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleInput = (event) => {
    setInput(event.target.value)
  }

  const handleFilter = () => {
    let val = persons.filter((p) => p.name.toLowerCase() === input.toLowerCase())
    if(val.length === 0){ return alert(`No matching search result`)}
    setFilterList(val)
    setSearch(true)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleInput={handleInput} input={input}  />
      < Buttons handleFilter = {handleFilter} setSearch = {setSearch} search={search}/>
      < PersonForm addPerson={addPerson} newName={newName} handleChange={handleChange} number={number} handleNumber={handleNumber}/>
      < Persons search={search} filterList={filterList} persons={persons} deletePerson={deletePerson} />
    </div>
  )
}

export default App;