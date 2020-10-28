import React, {useState} from 'react'

import './css/form.css'

const AttractionForm = ({attraction, callback}) => {
    const [newAttraction, setNewAttraction] = useState(attraction || {id: 0, name: '', description: '', difficulty: 0})

    const onSubmit = (ev) => {
        ev.preventDefault()

        // Maps field into attraction object
        console.log(`Form contains : ${JSON.stringify(newAttraction)}`)

        // Callback invoke
        callback(newAttraction)

        // Clear inputs
        setNewAttraction({id: 0, name: '', description: '', difficulty: 0})
    }

    const handleChange = (ev) => {
        ev.persist()
        // Manage your own logic to handle fields
        setNewAttraction((newAttraction) => ({...newAttraction, [ev.target.name]: ev.target.value}))
    }

    return (
        <form onSubmit={onSubmit} autoComplete="off">
            <div className="form-group">
                <input 
                    type="text" 
                    name="name" 
                    value={newAttraction.name} 
                    placeholder="Nom de l'attraction"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <textarea
                    name="description" 
                    value={newAttraction.description}
                    placeholder="Description"
                    onChange={handleChange}
                />
            </div>
            <div className="form-group">
                <select name="difficulty" value={newAttraction.difficulty} onChange={handleChange}>
                    <option value={0}>Sélectionnez</option>
                    <option value={1}>Facile</option>
                    <option value={2}>Moyen</option>
                    <option value={3}>Difficile</option>
                </select>
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary">
                    Valider
                </button>
            </div>
        </form>
    )
}

export default AttractionForm