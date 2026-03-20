import { useState } from 'react'
import { BuilderProvider } from './context/BuilderContext'
import BasicInfoForm from './components/BasicInfoForm'
import AboutForm from './components/AboutForm'
import ExperienceForm from './components/ExperienceForm'
import SkillsForm from './components/SkillsForm'
import ProjectsForm from './components/ProjectsForm'
import Preview from './components/Preview'
import Toast from './components/Toast'
import { downloadAsPDF } from './utils/export'
import { useBuilder } from './context/BuilderContext'
import './BuilderApp.css'

function BuilderContent() {
  const { config } = useBuilder()
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  
  const showToast = (message: string) => {
    setToastMessage(message)
  }
  
  const handleDownloadPDF = async () => {
    showToast('Generating PDF...')
    try {
      await downloadAsPDF(config, `${config.name.replace(/\s+/g, '_')}_Portfolio`)
      showToast('PDF downloaded successfully!')
    } catch (error) {
      showToast(`Error generating PDF: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const handleDeploy = () => {
    showToast('Coming Soon! GitHub deployment will be available in a future update.')
  }

  return (
    <div className="builder-app">
      <header className="builder-header">
        <div className="builder-header-content">
          <h1>Portfolio Builder</h1>
          <p>Create your professional portfolio in minutes</p>
        </div>
        <div className="builder-actions">
          <button className="btn-pdf" onClick={handleDownloadPDF}>
            Download PDF
          </button>
          <button className="btn-deploy" onClick={handleDeploy}>
            Deploy to GitHub
          </button>
        </div>
      </header>

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      <main className="builder-main">
        <div className="builder-forms">
          <BasicInfoForm />
          <AboutForm />
          <ExperienceForm />
          <SkillsForm />
          <ProjectsForm />
        </div>
        
        <aside className="builder-preview">
          <Preview />
        </aside>
      </main>
    </div>
  )
}

export default function BuilderApp() {
  return (
    <BuilderProvider>
      <BuilderContent />
    </BuilderProvider>
  )
}
