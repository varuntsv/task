import React, { useState } from 'react'
import { coursesList, feeStructure, levelsList } from '../Constants'
import SelectionDropdown from '../Components/SelectionDropdown'

const FeeDetail = () => {
    const [selections, setSelections] = useState({
        selectedFee: '',
        selectedNationality: '',
        selectedCourse: '',
        selectedLevel: '',
    })

    const handleSelection = (key, value) => {
        if (key === 'selectedCourse' && coursesList.includes(value)) {
            value = 'ALL_COURSES'
        }
        if (
            key === 'selectedLevel' &&
            levelsList.includes(value) &&
            selections.selectedFee !== 'Application Fee'
        ) {
            value = 'ALL_LEVEL'
        }
        if (key === 'selectedFee') {
            setSelections((prevSelections) => ({
                ...prevSelections,
                [key]: value,
                selectedNationality: '',
                selectedCourse: '',
                selectedLevel: '',
            }))
            return
        }
        setSelections((prevSelections) => ({
            ...prevSelections,
            [key]: value,
        }))
    }

    const calculateFee = () => {
        const { selectedFee, selectedNationality, selectedCourse, selectedLevel } =
            selections
        if (selectedFee && selectedNationality && selectedCourse && selectedLevel) {
            return (
                feeStructure[selectedFee]?.[selectedNationality]?.[selectedCourse]?.[
                    selectedLevel
                ]?.amount ?? null
            )
        }
        return null
    }

    const renderCourseOptions = () => {
        if (selections.selectedFee && selections.selectedNationality) {
            const courseOptions = Object.keys(
                feeStructure[selections.selectedFee]?.[
                selections.selectedNationality
                ] || [],
            )
            if (courseOptions.includes('ALL_COURSES')) {
                return coursesList
            } else {
                return courseOptions
            }
        }
        return null
    }

    const renderLevelOptions = () => {
        if (
            selections.selectedFee &&
            selections.selectedNationality &&
            selections.selectedCourse
        ) {
            const levelOptions = Object.keys(
                feeStructure[selections.selectedFee]?.[
                selections.selectedNationality
                ]?.[selections.selectedCourse] || [],
            )
            if (levelOptions.includes('ALL_LEVEL')) {
                return levelsList
            } else {
                return levelOptions
            }
        }
        return null
    }

    return (
        <div>
            <SelectionDropdown
                label="Fee"
                options={ Object.keys(feeStructure) }
                value={ selections.selectedFee }
                onChange={ (e) => handleSelection('selectedFee', e.target.value) }
            />

            { selections.selectedFee && (
                <div>
                    <SelectionDropdown
                        label="Nationality"
                        options={ Object.keys(feeStructure[selections.selectedFee]) }
                        value={ selections.selectedNationality }
                        onChange={ (e) =>
                            handleSelection('selectedNationality', e.target.value)
                        }
                    />
                </div>
            ) }

            { selections.selectedNationality && (
                <div>
                    <SelectionDropdown
                        label="Course"
                        options={ renderCourseOptions() }
                        value={ selections.selectedCourse }
                        onChange={ (e) => handleSelection('selectedCourse', e.target.value) }
                    />
                </div>
            ) }

            { selections.selectedCourse && (
                <div>
                    <SelectionDropdown
                        label="Level"
                        options={ renderLevelOptions() }
                        value={ selections.selectedLevel }
                        onChange={ (e) => handleSelection('selectedLevel', e.target.value) }
                    />
                </div>
            ) }

            { selections.selectedLevel && (
                <div>
                    <h2>Fee Amount:</h2>
                    <p>{ `$${calculateFee()}` }</p>
                </div>
            ) }
        </div>
    )
}

export default FeeDetail
