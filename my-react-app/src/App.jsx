import { useState, useEffect, useCallback, useRef } from 'react'
import styles from './App.module.css'

const CAT_API = 'https://api.thecatapi.com/v1/images/search'
const BATCH = 9

const SIGILS = ['✦', '◈', '⬡', '✧', '◉', '⟡', '✵', '⌬', '◇']
const EPITHETS = [
  'Summoner of Whiskers',
  'Oracle of the Purring Void',
  'Keeper of Midnight Tails',
  'Seer of Velvet Paws',
  'Conjurer of Feline Mysteries',
  'Warden of the Cat Dimension',
]

function StarField() {
  const stars = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    delay: Math.random() * 4,
    dur: Math.random() * 3 + 2,
  }))
  return (
    <div className={styles.starfield} aria-hidden="true">
      {stars.map(s => (
        <span
          key={s.id}
          className={styles.star}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  )
}

function OrnamentalBorder() {
  return (
    <div className={styles.ornamental} aria-hidden="true">
      <div className={styles.ornLine} />
      <div className={styles.ornCenter}>
        {SIGILS.slice(0, 5).map((s, i) => (
          <span key={i} className={styles.sigil}>{s}</span>
        ))}
      </div>
      <div className={styles.ornLine} />
    </div>
  )
}

function CatCard({ cat, index }) {
  const [loaded, setLoaded] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`${styles.catCard} ${loaded ? styles.catCardLoaded : ''}`}
      style={{ animationDelay: `${index * 0.07}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.cardInner}>
        <div className={styles.cardCorner} data-pos="tl" />
        <div className={styles.cardCorner} data-pos="tr" />
        <div className={styles.cardCorner} data-pos="bl" />
        <div className={styles.cardCorner} data-pos="br" />

        <div className={styles.imageWrapper}>
          {!loaded && (
            <div className={styles.skeleton}>
              <div className={styles.skeletonPulse} />
              <span className={styles.skeletonCat}>🐾</span>
            </div>
          )}
          <img
            src={cat.url}
            alt="A mystical cat"
            className={`${styles.catImage} ${loaded ? styles.catImageLoaded : ''}`}
            onLoad={() => setLoaded(true)}
            loading="lazy"
          />
        </div>

        <div className={`${styles.cardOverlay} ${hovered ? styles.cardOverlayVisible : ''}`}>
          <p className={styles.overlayText}>✦ Feline Vision ✦</p>
          <p className={styles.overlayDims}>
            {cat.width && cat.height ? `${cat.width} × ${cat.height}` : 'Mystical Proportions'}
          </p>
        </div>
      </div>
    </div>
  )
}

function LoadingRitual() {
  const [phase, setPhase] = useState(0)
  const phases = ['Consulting the void…', 'Summoning felines…', 'Weaving fur into pixels…', 'The cats are near…']
  useEffect(() => {
    const t = setInterval(() => setPhase(p => (p + 1) % phases.length), 600)
    return () => clearInterval(t)
  }, [])
  return (
    <div className={styles.loadingRitual}>
      <div className={styles.sigilSpin}>◈</div>
      <p>{phases[phase]}</p>
    </div>
  )
}

export default function App() {
  const [cats, setCats] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [summonCount, setSummonCount] = useState(0)
  const epithet = useRef(EPITHETS[Math.floor(Math.random() * EPITHETS.length)])

  const fetchCats = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${CAT_API}?limit=${BATCH}&size=med`)
      if (!res.ok) throw new Error('The oracle is silent')
      const data = await res.json()
      setCats(prev => [...prev, ...data])
      setSummonCount(c => c + data.length)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    setCats([])
    setSummonCount(0)
    try {
      const res = await fetch(`${CAT_API}?limit=${BATCH}&size=med`)
      if (!res.ok) throw new Error('The oracle is silent')
      const data = await res.json()
      setCats(data)
      setSummonCount(data.length)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCats()
  }, [])

  return (
    <div className={styles.app}>
      <StarField />

      {/* Ambient orbs */}
      <div className={styles.orb} data-orb="1" aria-hidden="true" />
      <div className={styles.orb} data-orb="2" aria-hidden="true" />
      <div className={styles.orb} data-orb="3" aria-hidden="true" />

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerGlyph} aria-hidden="true">
          <span>⟡</span>
        </div>
        <div className={styles.crown} aria-hidden="true">
          {['◇', '✦', '◈', '✦', '◇'].map((s, i) => (
            <span key={i} className={styles.crownGlyph} style={{ animationDelay: `${i * 0.2}s` }}>{s}</span>
          ))}
        </div>
        <h1 className={styles.title}>
          <span className={styles.titleThe}>The</span>
          <span className={styles.titleMain}>Cat Oracle</span>
        </h1>
        <p className={styles.subtitle}>{epithet.current}</p>
        <OrnamentalBorder />
        {summonCount > 0 && (
          <p className={styles.counter}>
            <span className={styles.counterNum}>{summonCount}</span>
            {' '}souls summoned from the feline dimension
          </p>
        )}
      </header>

      {/* Gallery */}
      <main className={styles.main}>
        {cats.length > 0 && (
          <div className={styles.grid}>
            {cats.map((cat, i) => (
              <CatCard key={`${cat.id}-${i}`} cat={cat} index={i % BATCH} />
            ))}
          </div>
        )}

        {loading && <LoadingRitual />}

        {error && (
          <div className={styles.error}>
            <span>⚠</span> {error}
          </div>
        )}

        {/* Controls */}
        <div className={styles.controls}>
          <button
            className={styles.btnSummon}
            onClick={fetchCats}
            disabled={loading}
          >
            <span className={styles.btnGlyph}>✦</span>
            {loading ? 'Summoning…' : 'Summon More Cats'}
            <span className={styles.btnGlyph}>✦</span>
          </button>

          {cats.length > 0 && (
            <button
              className={styles.btnRefresh}
              onClick={refreshAll}
              disabled={loading}
            >
              ◈ Begin Anew
            </button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <OrnamentalBorder />
        <p>Powered by <a href="https://thecatapi.com" target="_blank" rel="noreferrer" className={styles.footerLink}>The Cat API</a> · All cats are sacred ✦</p>
      </footer>
    </div>
  )
}
