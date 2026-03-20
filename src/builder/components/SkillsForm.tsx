import { useState } from 'react'
import { useBuilder } from '../context/BuilderContext'
import './FormStyles.css'

export default function SkillsForm() {
  const { config, addSkillCategory, removeSkillCategory, addSkill, removeSkill } = useBuilder()
  const [newSkill, setNewSkill] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [newCategory, setNewCategory] = useState('')

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      addSkill(selectedCategory, newSkill.trim())
      setNewSkill('')
    }
  }

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addSkillCategory(newCategory.trim())
      setNewCategory('')
      setSelectedCategory(config.skills.length)
    }
  }

  return (
    <div className="form-section">
      <h2>Skills</h2>
      
      {config.skills.map((category, catIndex) => (
        <div key={catIndex} className="skill-category-form">
          <div className="category-header">
            <h3>{category.title}</h3>
            <button
              type="button"
              className="btn-remove-category"
              onClick={() => removeSkillCategory(catIndex)}
              aria-label={`Remove ${category.title} category`}
            >
              ×
            </button>
          </div>
          <div className="skills-list-form">
            {category.skills.map((skill, skillIndex) => (
              <span key={skillIndex} className="skill-tag-form">
                {skill}
                <button
                  type="button"
                  className="btn-remove-skill"
                  onClick={() => removeSkill(catIndex, skillIndex)}
                  aria-label={`Remove ${skill}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      ))}

      <div className="add-category-form">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name (e.g., Languages, Design, Soft Skills)..."
          onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
        />
        <button type="button" className="btn-add" onClick={handleAddCategory}>
          Add Category
        </button>
      </div>

      {config.skills.length > 0 && (
        <div className="add-skill-form">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(Number(e.target.value))}
            className="category-select"
          >
            {config.skills.map((cat, index) => (
              <option key={index} value={index}>{cat.title}</option>
            ))}
          </select>
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill..."
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
          />
          <button type="button" className="btn-add" onClick={handleAddSkill}>
            Add Skill
          </button>
        </div>
      )}
    </div>
  )
}
