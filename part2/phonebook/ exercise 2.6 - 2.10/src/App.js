import { useState } from 'react'


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


const Persons =({search, filterList, persons})=>{
  return (
    <div>
      <h2>Conatct list</h2>
      <div>
        {search ? 
        <ul>
          {filterList.map((e) => {
            return (
              <li key={e.id}>{e.namePerson} {e.phoneNumber}</li>
            )
          })}
        </ul>:        
        <ul>
          {persons.map((e) => {
            return (
              <li key={e.id}>{e.namePerson} {e.phoneNumber}</li>
            )
          })}
        </ul>}
      </div>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { namePerson: 'Arto Hellas', id: 1 , phoneNumber: '040-1234567'},
    { namePerson: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { namePerson: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { namePerson: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [number, setNewNumber] = useState('')
  const [input, setInput] = useState('')
  const [filterList, setFilterList] = useState([])
  const [search, setSearch ] = useState(false)

  const addPerson =(event)=> {
    event.preventDefault()
    const personObj = {
      namePerson: newName,
      phoneNumber: number,
      id: persons.length + 1,
    }
    let duplicate = persons.filter((e) => e.namePerson === personObj.namePerson )
    if (duplicate.length == 0) setPersons(persons.concat(personObj))
    if (duplicate.length > 0) alert(`${personObj.namePerson} is already added to phonebook`)
    setNewName('')
    setNewNumber('')
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
    let val = persons.filter((p) => p.namePerson.toLowerCase() === input.toLowerCase())
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
      < Persons search={search} filterList={filterList} persons={persons} />
    </div>
  )
}

export default App;