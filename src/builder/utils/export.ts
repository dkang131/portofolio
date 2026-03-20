import type { PortfolioConfig } from '../types/portfolio'
import JSZip from 'jszip'
import html2pdf from 'html2pdf.js'

export function generatePortfolioFiles(config: PortfolioConfig) {
  const files: Record<string, string> = {}
  
  // Generate Hero.tsx
  files['src/components/Hero.tsx'] = `import './Hero.css'

function Hero() {
  return (
    <section id="home" className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-greeting">Hello, I'm</p>
            <h1 className="hero-name">${config.name}</h1>
            <p className="hero-title">${config.title}</p>
            <p className="hero-description">${config.about.description}</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">View My Work</a>
              <a href="#contact" className="btn btn-secondary">Get In Touch</a>
            </div>
            <div className="hero-socials">
              <a href="${config.social.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="${config.social.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="mailto:${config.social.email}" aria-label="Email">
                <svg viewBox="0 0 24 24" fill="currentColor" className="social-icon">
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-avatar">
              <span>${config.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
`

  // Generate About.tsx
  files['src/components/About.tsx'] = `import './About.css'

function About() {
  return (
    <section id="about" className="about-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2>Get to know me</h2>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>${config.about.description}</p>
          </div>
          <div className="about-stats">
            ${config.about.stats.map(stat => `<div className="stat-item"><span className="stat-number">${stat.number}</span><span className="stat-label">${stat.label}</span></div>`).join('')}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
`

  // Generate Contact.tsx
  files['src/components/Contact.tsx'] = `import './Contact.css'

function Contact() {
  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Get In Touch</span>
          <h2>Let's work together</h2>
        </div>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Ready to start a project?</h3>
            <p>I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.</p>
            <div className="contact-details">
              <div className="contact-item">
                <svg viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>${config.social.email}</span>
              </div>
              <div className="contact-item">
                <svg viewBox="0 0 24 24" fill="currentColor" className="contact-icon">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>${config.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
`

  // Generate Projects.tsx
  const projectsArray = config.projects.map(p => `  {
    title: '${p.title.replace(/'/g, "\\'")}',
    description: '${p.description.replace(/'/g, "\\'")}',
    tags: [${p.tags.map(t => `'${t}'`).join(', ')}],${p.github ? `\n    github: '${p.github}',` : ''}${p.demo ? `\n    demo: '${p.demo}',` : ''}${p.isPaper ? '\n    isPaper: true,' : ''}
  }`).join(',\n')

  files['src/components/Projects.tsx'] = `import './Projects.css'

const projects = [
${projectsArray}
]

function Projects() {
  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">My Projects</span>
          <h2>Featured Work</h2>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <article key={index} className="project-card">
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="link-icon">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="link-icon">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <polyline points="10 9 9 9 8 9"/>
                      </svg>
                      {project.isPaper ? 'Paper' : 'Live Demo'}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
`

  // Generate Skills.tsx
  const skillsArray = config.skills.map(s => `  {
    title: '${s.title}',
    skills: [${s.skills.map(skill => `'${skill}'`).join(', ')}]
  }`).join(',\n')

  files['src/components/Skills.tsx'] = `import './Skills.css'

const skillCategories = [
${skillsArray}
]

function Skills() {
  return (
    <section id="skills" className="skills-section section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">My Skills</span>
          <h2>Technologies I work with</h2>
        </div>
        <div className="skills-grid">
          {skillCategories.map((category) => (
            <div key={category.title} className="skill-card">
              <h3>{category.title}</h3>
              <ul className="skill-list">
                {category.skills.map((skill) => (
                  <li key={skill} className="skill-item">
                    <span className="skill-dot"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
`

  // Generate App.tsx
  files['src/App.tsx'] = `import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Navigation from './components/Navigation'

function App() {
  return (
    <div className="portfolio">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} ${config.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
`

  // Generate package.json
  files['package.json'] = JSON.stringify({
    name: 'portfolio',
    private: true,
    version: '0.0.0',
    type: 'module',
    homepage: `https://github.com/${config.social.github.split('/').pop()}/portfolio`,
    scripts: {
      dev: 'vite',
      build: 'tsc -b && vite build',
      lint: 'eslint .',
      preview: 'vite preview',
      predeploy: 'npm run build',
      deploy: 'gh-pages -d dist'
    },
    dependencies: {
      react: '^19.2.4',
      'react-dom': '^19.2.4'
    },
    devDependencies: {
      '@eslint/js': '^9.39.4',
      '@types/node': '^24.12.0',
      '@types/react': '^19.2.14',
      '@types/react-dom': '^19.2.3',
      '@vitejs/plugin-react': '^6.0.1',
      eslint: '^9.39.4',
      'eslint-plugin-react-hooks': '^7.0.1',
      'eslint-plugin-react-refresh': '^0.5.2',
      'gh-pages': '^6.3.0',
      globals: '^17.4.0',
      typescript: '~5.9.3',
      'typescript-eslint': '^8.57.0',
      vite: '^8.0.1'
    }
  }, null, 2)

  // Generate vite.config.ts
  files['vite.config.ts'] = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/',
})
`

  // Generate index.html
  files['index.html'] = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${config.name} - ${config.title}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`

  // Generate main.tsx
  files['src/main.tsx'] = `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
`

  // Generate tsconfig files (simplified)
  files['tsconfig.json'] = JSON.stringify({
    files: [],
    references: [{ path: './tsconfig.app.json' }, { path: './tsconfig.node.json' }]
  }, null, 2)

  return files
}

export async function downloadAsZip(config: PortfolioConfig, filename: string) {
  const files = generatePortfolioFiles(config)
  const zip = new JSZip()
  
  // Add all files to ZIP
  Object.entries(files).forEach(([path, content]) => {
    zip.file(path, content)
  })
  
  // Generate and download
  const blob = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.zip`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// GitHub API integration for one-click deploy
export async function deployToGitHub(config: PortfolioConfig, token: string, repoName: string) {
  const files = generatePortfolioFiles(config)
  const username = config.social.github.split('/').pop() || 'user'
  
  // Step 1: Create repository
  const createRepoResponse = await fetch('https://api.github.com/user/repos', {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: repoName,
      description: `${config.name}'s Portfolio`,
      private: false,
      auto_init: true
    })
  })
  
  if (!createRepoResponse.ok) {
    throw new Error('Failed to create repository')
  }
  
  const repo = await createRepoResponse.json()
  
  // Step 2: Create files in the repository
  for (const [path, content] of Object.entries(files)) {
    await fetch(`https://api.github.com/repos/${username}/${repoName}/contents/${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: `Add ${path}`,
        content: btoa(unescape(encodeURIComponent(content)))
      })
    })
  }
  
  // Step 3: Enable GitHub Pages
  await fetch(`https://api.github.com/repos/${username}/${repoName}/pages`, {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      source: { branch: 'main', path: '/' }
    })
  })
  
  return {
    repoUrl: repo.html_url,
    pagesUrl: `https://${username}.github.io/${repoName}`
  }
}

// Generate PDF from portfolio configuration
export function generatePortfolioPDF(config: PortfolioConfig): string {
  const currentYear = new Date().getFullYear()
  
  // Build skills HTML - Tabular Card Layout
  const skillCols = config.skills.length === 4 ? 2 : 3
  const skillsHTML = config.skills.map(category => `
    <div class="skill-card">
      <h3>${category.title}</h3>
      <ul class="skill-list">
        ${category.skills.map(skill => `<li class="skill-item"><span class="skill-dot"></span>${skill}</li>`).join('')}
      </ul>
    </div>
  `).join('')

  // Build experience HTML
  const experienceHTML = config.experience.map(exp => `
    <div class="experience-item">
      <div class="experience-header">
        <h3>${exp.position}</h3>
        <span class="experience-date">${exp.startDate} - ${exp.endDate}</span>
      </div>
      <p class="experience-company">${exp.company} | ${exp.location}</p>
      <p class="experience-desc">${exp.description}</p>
    </div>
  `).join('')

  // Build projects HTML
  const projectsHTML = config.projects.map(project => `
    <div class="project-item">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-tags">
        ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      ${project.github ? `<p class="project-link">Code: ${project.github}</p>` : ''}
      ${project.demo ? `<p class="project-link">${project.isPaper ? 'Paper' : 'Demo'}: ${project.demo}</p>` : ''}
    </div>
  `).join('')

  // Build stats HTML
  const statsHTML = config.about.stats.map(stat => `
    <div class="stat-box">
      <div class="stat-number">${stat.number}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('')

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @page { 
      margin: 0; 
      size: A4;
    }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    * { box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.4;
      color: #333;
      margin: 0;
      padding: 0;
      background: white;
    }
    .page {
      width: 210mm;
      min-height: 297mm;
      padding: 8mm 12mm;
      margin: 0;
      background: white;
    }
    /* Header Section */
    .header {
      text-align: center;
      padding-bottom: 3px;
      border-bottom: 2px solid #6366f1;
      margin-bottom: 2px;
    }
    .header h1 {
      font-size: 28px;
      margin: 0 0 4px 0;
      color: #1f2937;
      font-weight: 700;
    }
    .header .title {
      font-size: 16px;
      color: #6366f1;
      margin-bottom: 4px;
      font-weight: 500;
    }
    .header .location {
      font-size: 12px;
      color: #6b7280;
      margin-bottom: 6px;
    }
    .contact-info {
      display: flex;
      justify-content: center;
      gap: 15px;
      flex-wrap: wrap;
      font-size: 11px;
    }
    .contact-info a {
      color: #4b5563;
      text-decoration: none;
    }
    /* Section Styling */
    .section {
      margin-bottom: 0;
      padding-bottom: 2px;
    }
    .section-title {
      font-size: 16px;
      color: #1f2937;
      margin-bottom: 1px;
      padding-bottom: 1px;
      border-bottom: 1px solid #e5e7eb;
      font-weight: 600;
    }
    /* About Section */
    .about-text {
      font-size: 13px;
      color: #4b5563;
      margin-bottom: 2px;
      line-height: 1.3;
    }
    .stats-container {
      display: flex;
      gap: 4px;
      justify-content: flex-start;
    }
    .stat-box {
      text-align: center;
      padding: 3px 8px;
      background: #f3f4f6;
      border-radius: 4px;
    }
    .stat-number {
      font-size: 18px;
      font-weight: 700;
      color: #6366f1;
    }
    .stat-label {
      font-size: 10px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    /* Skills Section - Tabular Card Layout */
    .skills-grid {
      display: grid;
      gap: 4px;
    }
    .skills-grid.cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }
    .skills-grid.cols-3 {
      grid-template-columns: repeat(3, 1fr);
    }
    .skill-card {
      background: #f9fafb;
      border-radius: 6px;
      padding: 8px;
      border: 1px solid #e5e7eb;
    }
    .skill-card h3 {
      font-size: 13px;
      color: #1f2937;
      margin: 0 0 4px 0;
      font-weight: 600;
      padding-bottom: 3px;
      border-bottom: 1px solid #e5e7eb;
    }
    .skill-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .skill-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 3px 0;
      color: #4b5563;
      font-size: 12px;
      border-bottom: 1px solid #f3f4f6;
    }
    .skill-item:last-child {
      border-bottom: none;
    }
    .skill-dot {
      width: 6px;
      height: 6px;
      background: #6366f1;
      border-radius: 50%;
      flex-shrink: 0;
    }
    /* Projects Section */
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3px;
    }
    .project-item {
      margin-bottom: 0;
      padding: 5px;
      border: 1px solid #e5e7eb;
      border-radius: 3px;
      background: #fafafa;
    }
    .project-item h3 {
      font-size: 14px;
      color: #1f2937;
      margin: 0 0 6px 0;
      font-weight: 600;
    }
    .project-item p {
      font-size: 11px;
      color: #4b5563;
      margin: 0 0 5px 0;
      line-height: 1.3;
    }
    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 3px;
      margin-bottom: 4px;
    }
    .tag {
      background: #e5e7eb;
      color: #4b5563;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 10px;
    }
    .project-link {
      font-size: 10px;
      color: #6366f1;
      margin: 1px 0;
      word-break: break-all;
    }
    /* Experience Section */
    .experience-item {
      margin-bottom: 4px;
      padding-bottom: 3px;
      border-bottom: 1px solid #e5e7eb;
    }
    .experience-item:last-child {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: 0;
    }
    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2px;
    }
    .experience-header h3 {
      font-size: 15px;
      color: #1f2937;
      margin: 0;
      font-weight: 600;
    }
    .experience-date {
      font-size: 12px;
      color: #6b7280;
    }
    .experience-company {
      font-size: 12px;
      color: #6366f1;
      margin: 0 0 4px 0;
      font-weight: 500;
    }
    .experience-desc {
      font-size: 12px;
      color: #4b5563;
      margin: 0;
      line-height: 1.35;
    }
    /* Footer */
    .footer {
      text-align: center;
      margin-top: 4px;
      padding-top: 3px;
      border-top: 1px solid #e5e7eb;
      font-size: 8px;
      color: #9ca3af;
      background: transparent;
    }
    .footer p {
      margin: 0;
      background: transparent;
      line-height: 1.2;
    }
  </style>
</head>
<body>
  <div class="page">
    <!-- Header -->
    <div class="header">
      <h1>${config.name}</h1>
      <div class="title">${config.title}</div>
      <div class="location">${config.location}</div>
      <div class="contact-info">
        <a href="mailto:${config.social.email}">${config.social.email}</a>
        <a href="${config.social.linkedin}">LinkedIn</a>
        <a href="${config.social.github}">GitHub</a>
      </div>
    </div>

    <!-- About Section -->
    <div class="section">
      <h2 class="section-title">About Me</h2>
      <p class="about-text">${config.about.description}</p>
      <div class="stats-container">
        ${statsHTML}
      </div>
    </div>

    <!-- Experience Section -->
    <div class="section">
      <h2 class="section-title">Work Experience</h2>
      ${experienceHTML}
    </div>

    <!-- Skills Section -->
    <div class="section">
      <h2 class="section-title">Skills</h2>
      <div class="skills-grid cols-${skillCols}">
        ${skillsHTML}
      </div>
    </div>

    <!-- Projects Section -->
    <div class="section">
      <h2 class="section-title">Featured Projects</h2>
      <div class="projects-grid">
        ${projectsHTML}
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>&copy; ${currentYear} ${config.name}. All rights reserved.</p>
      <p>Generated with Portfolio Builder</p>
    </div>
  </div>
</body>
</html>
  `
  
  return htmlContent
}

// Download portfolio as PDF
export async function downloadAsPDF(config: PortfolioConfig, filename: string) {
  const htmlContent = generatePortfolioPDF(config)
  
  // Create a temporary container
  const container = document.createElement('div')
  container.innerHTML = htmlContent
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  container.style.top = '0'
  document.body.appendChild(container)
  
  // Wait for styles to apply
  await new Promise(resolve => setTimeout(resolve, 100))
  
  const element = container.querySelector('.page') as HTMLElement
  
  const options = {
    margin: 0,
    filename: `${filename}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    },
    jsPDF: { 
      unit: 'mm' as const, 
      format: [210, Math.max(297, element.scrollHeight / 3.78)] as [number, number], 
      orientation: 'portrait' as const
    }
  }
  
  try {
    await html2pdf().set(options).from(element).save()
  } finally {
    document.body.removeChild(container)
  }
}
