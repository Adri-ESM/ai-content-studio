import { useMemo, useState } from 'react'

type TabKey = 'linkedin' | 'email' | 'improve'
type Tone = 'Professional' | 'Friendly' | 'Technical'
type Language = 'Spanish' | 'English'
type Length = 'Short' | 'Medium' | 'Long'

export function ContentStudio () {
  const [activeTab, setActiveTab] = useState<TabKey>('linkedin')

  const title = useMemo(() => {
    switch (activeTab) {
      case 'linkedin':
        return 'LinkedIn Post'
      case 'email':
        return 'Email Draft'
      case 'improve':
        return 'Improve Text'
    }
  }, [activeTab])

  return (
    <div className='container'>
      <header className='header'>
        <h1>AI Content Studio</h1>
        <p>
          Create content faster: LinkedIn posts, emails, and text improvements.
        </p>
      </header>

      <nav className='tabs'>
        <TabButton
          active={activeTab === 'linkedin'}
          onClick={() => setActiveTab('linkedin')}
          label='LinkedIn'
        />
        <TabButton
          active={activeTab === 'email'}
          onClick={() => setActiveTab('email')}
          label='Email'
        />
        <TabButton
          active={activeTab === 'improve'}
          onClick={() => setActiveTab('improve')}
          label='Improve'
        />
      </nav>

      <main className='grid'>
        <section className='card'>
          <h2>{title}</h2>
          <GeneratorForm />
        </section>

        <section className='card'>
          <h2>Output</h2>
          <OutputPanel />
        </section>
      </main>

      <footer className='footer'>
        <small>Built with React + TypeScript</small>
      </footer>
    </div>
  )
}

function TabButton ({
  active,
  label,
  onClick
}: {
  active: boolean
  label: string
  onClick: () => void
}) {
  return (
    <button
      className={`tab ${active ? 'tabActive' : ''}`}
      onClick={onClick}
      type='button'
    >
      {label}
    </button>
  )
}

function GeneratorForm () {
  const [tone, setTone] = useState<Tone>('Professional')
  const [language, setLanguage] = useState<Language>('Spanish')
  const [length, setLength] = useState<Length>('Medium')
  const [input, setInput] = useState('')

  return (
    <form className='form' onSubmit={e => e.preventDefault()}>
      <label className='label'>
        Prompt / Notes
        <textarea
          className='textarea'
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder='Write what you want the AI to generate...'
          rows={8}
        />
      </label>

      <div className='row'>
        <Select
          label='Tone'
          value={tone}
          onChange={v => setTone(v as Tone)}
          options={['Professional', 'Friendly', 'Technical']}
        />
        <Select
          label='Language'
          value={language}
          onChange={v => setLanguage(v as Language)}
          options={['Spanish', 'English']}
        />
        <Select
          label='Length'
          value={length}
          onChange={v => setLength(v as Length)}
          options={['Short', 'Medium', 'Long']}
        />
      </div>

      <button className='primary' type='button'>
        Generate
      </button>

      <div className='hint'>
        <small>
          Next step: connect this button to a backend proxy (to keep API keys
          safe).
        </small>
      </div>
    </form>
  )
}

function Select ({
  label,
  value,
  options,
  onChange
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <label className='label'>
      {label}
      <select
        className='select'
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

function OutputPanel () {
  const output =
    'Your generated content will appear here.\n\n(Next: we’ll wire the Generate button.)'

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    alert('Copied!')
  }

  return (
    <div className='output'>
      <pre className='pre'>{output}</pre>
      <button className='secondary' type='button' onClick={copy}>
        Copy
      </button>
    </div>
  )
}
