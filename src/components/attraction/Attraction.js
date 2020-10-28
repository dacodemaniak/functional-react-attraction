import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Attraction = ({attraction, onCheck}) => {
    const [attractionItem, setAttractionItem] = useState(attraction)

    useEffect(() => {
        setAttractionItem(attraction)
    }, [attraction])

    useEffect(() => {
        onCheck(attractionItem)
    }, [attractionItem])

    const handleCheck = (ev) => {
        setAttractionItem({...attraction, isChecked: ev.target.checked})
    }

    const difficulty = () => {
        if (attractionItem.difficulty === '1') {
            return 'Facile'
        }

        if (attractionItem.difficulty === '2') {
            return 'Moyen'
        }

        return 'Difficile'
    }
    return (
        <tr>
            <td>
                <input type="checkbox" className="selectItem" checked={attractionItem.isChecked} onChange={handleCheck} />
            </td>
            <td>
                { attractionItem.name }
            </td>
            <td>
                { attractionItem.description }
            </td>
            <td>
                { difficulty() }
            </td>
            <td>&nbsp;</td>
        </tr>
    )
}
Attraction.propTypes = {
        attraction: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        difficulty: PropTypes.number.isRequired,
        isChecked: PropTypes.bool.isRequired
    }).isRequired
}

export default Attraction