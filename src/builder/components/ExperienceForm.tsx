import { useState } from 'react'
import { useBuilder } from '../context/BuilderContext'
import './FormStyles.css'

export default function ExperienceForm() {
  const { config, addExperience, removeExperience, updateExperience } = useBuilder()
  const [isAdding, setIsAdding] = useState(false)
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  })

  const handleAdd = () => {
    if (newExperience.company.trim() && newExperience.position.trim()) {
      addExperience({
        company: newExperience.company.trim(),
        position: newExperience.position.trim(),
        location: newExperience.location.trim(),
        startDate: newExperience.startDate.trim(),
        endDate: newExperience.endDate.trim() || 'Present',
        description: newExperience.description.trim()
      })
      setNewExperience({
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        description: ''
      })
      setIsAdding(false)
    }
  }

  return (
    <div className="form-section">
      <h2>Work Experience</h2>
      
      {config.experience.map((exp, index) => (
        <div key={index} className="experience-card-form">
          <div className="experience-header">
            <div className="experience-title">
              <input
                type="text"
                value={exp.position}
                onChange={(e) => updateExperience(index, { position: e.target.value })}
                placeholder="Job Title"
                className="experience-input-title"
              />
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(index, { company: e.target.value })}
                placeholder="Company Name"
                className="experience-input-company"
              />
            </div>
            <button
              type="button"
              className="btn-remove"
              onClick={() => removeExperience(index)}
              aria-label="Remove experience"
            >
              ×
            </button>
          </div>
          
          <div className="experience-meta">
            <input
              type="text"
              value={exp.location}
              onChange={(e) => updateExperience(index, { location: e.target.value })}
              placeholder="Location"
              className="experience-input-meta"
            />
            <div className="experience-dates">
              <input
                type="text"
                value={exp.startDate}
                onChange={(e) => updateExperience(index, { startDate: e.target.value })}
                placeholder="Start Date"
                className="experience-input-date"
              />
              <span>to</span>
              <input
                type="text"
                value={exp.endDate}
                onChange={(e) => updateExperience(index, { endDate: e.target.value })}
                placeholder="End Date"
                className="experience-input-date"
              />
            </div>
          </div>
          
          <textarea
            value={exp.description}
            onChange={(e) => updateExperience(index, { description: e.target.value })}
            placeholder="Describe your responsibilities and achievements..."
            className="experience-textarea"
            rows={3}
          />
        </div>
      ))}

      {isAdding ? (
        <div className="add-experience-form">
          <h4>Add Work Experience</h4>
          <input
            type="text"
            value={newExperience.position}
            onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
            placeholder="Job Title"
          />
          <input
            type="text"
            value={newExperience.company}
            onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
            placeholder="Company Name"
          />
          <input
            type="text"
            value={newExperience.location}
            onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
            placeholder="Location"
          />
          <div className="experience-dates-row">
            <input
              type="text"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
              placeholder="Start Date (e.g., Jan 2022)"
            />
            <input
              type="text"
              value={newExperience.endDate}
              onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
              placeholder="End Date (e.g., Present)"
            />
          </div>
          <textarea
            value={newExperience.description}
            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
            placeholder="Describe your responsibilities and achievements..."
            rows={3}
          />
          <div className="form-actions">
            <button type="button" className="btn-add" onClick={handleAdd}>
              Add Experience
            </button>
            <button type="button" className="btn-cancel" onClick={() => setIsAdding(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button type="button" className="btn-primary" onClick={() => setIsAdding(true)}>
          + Add Work Experience
        </button>
      )}
    </div>
  )
}
