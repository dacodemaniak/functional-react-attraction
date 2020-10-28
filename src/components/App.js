import React, {useEffect, useState} from 'react'
import Attraction from './attraction/Attraction'
import AttractionForm from './attraction/components/AttractionForm'

import './attraction/css/attraction.css'

const App = () => {
    const [parc, setParc] = useState(
        {
            name:'Mon Parc',
            description: 'Un super parc',
            attractions: []
        }
    )
    const [editMode, setEditMode] = useState(false)
    const [attraction, setAttraction] = useState({})
    const [isSelectAllChecked, setIsSelectAllChecked] = useState(false)
    

    const receiveAttraction = (obj) => {
        console.log(`Receive a brand new attraction : ${JSON.stringify(obj)}`)
        // Update the attraction list from parc state
        const { attractions } = parc
        const nextId = attractions[attractions.length - 1].id + 1
        obj.id = nextId
        obj.isChecked = false
        attractions.push(obj)
        setParc({
            name: parc.name,
            description: parc.description,
            attractions
        })
    }

    const updateAttractionState = (obj) => {
        const { attractions } = parc
        attractions[attractions.findIndex((o) => o.id === obj.id)] = obj
        setParc((parc) => ({...parc, attractions}))
        console.log(`After attraction was checked or uncheckeed, Parc was updated : ${JSON.stringify(attractions)}`)
        setIsSelectAllChecked(parc.attractions.filter((obj) => obj.isChecked).length === parc.attractions.length)
    }

    // Handle editForm state
    const toggleEditState = () => {
        setEditMode(!editMode)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(`Form was submitted`)
        setEditMode(false)
    }

    const handleChange = (event) => {
        event.persist()
        setParc((parc) => ({...parc, [event.target.name]: event.target.value}))
    }

    // Make a set of "Attractions"
    const listAttractions = () => {
        console.log(`Redraw attraction list with ${JSON.stringify(parc.attractions)}`)
        return parc.attractions.map((attraction) => {
            return <Attraction attraction={attraction} key={attraction.id} onCheck={updateAttractionState} />
        })
    }

    const toggleCheckbox = (event) => {
        console.log(`${event.target.checked ? 'Check all' : 'Uncheck all'}`)
        const checkAttractions = parc.attractions.map((attraction) => ({...attraction, isChecked: event.target.checked}))
        console.log(`${JSON.stringify(checkAttractions)}`)
        setParc({
            name: parc.name,
            description: parc.description,
            attractions: checkAttractions
        })
        setIsSelectAllChecked(true)
    }


    const parcEdit = () => {
        return editMode ?
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    value={parc.name}
                    onChange={handleChange} 
                />
                <textarea 
                    name="description" 
                    value={parc.description}
                    onChange={handleChange} 
                />
                <button type="submit">Mettre à jour</button>
            </form>
            :
            <span className="icon-pencil" onClick={toggleEditState}></span>
    }

    const removeIconClass = () => [
        'icon-cross',
        parc.attractions.filter((o) => o.isChecked).length ? 'active' : 'disabled'
    ].join(' ')

    const removeCheckedAttractions = (ev) => {
        console.log(`Removing checked attractions`)
        setParc((parc) => ({...parc, attractions: parc.attractions.filter((o) => !o.isChecked)}))
    }

    const removeIcon = () => (
        <span className={removeIconClass()} onClick={removeCheckedAttractions}></span>
    )

    return (
        <div>
            <header>
                <h1>{parc.name}</h1>
            </header>
            <blockquote>
                {parc.description}
            </blockquote>

            { /* If editMode : edit form goes here */}
            { parcEdit() }

            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <input 
                                type="checkbox" 
                                disabled={parc.attractions.length === 0} 
                                name="toggleCheckboxes"
                                checked={isSelectAllChecked}
                                onChange={toggleCheckbox}
                            />
                        </th>
                        <th>
                            Nom
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            Difficulté
                        </th>
                        <th>
                            { removeIcon() }
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { listAttractions() }
                </tbody>

                <tfoot>
                </tfoot>
            </table>
            { /* Add / update attraction form */ }
            <AttractionForm attraction={attraction} callback={receiveAttraction} />
        </div>
    )
}

export default App