import React from 'react'

const SelectionDropdown = ({ label, options, value, onChange }) => {
    return (
        <div>
            <h2>{ label }:</h2>
            <select value={ value } onChange={ onChange }>
                <option disabled hidden value={ '' }>
                    Select { label }
                </option>
                { options.map((option) => (
                    <option key={ option } value={ option }>
                        { option }
                    </option>
                )) }
            </select>
        </div>
    )
}

export default SelectionDropdown