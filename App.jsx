import { useState } from 'react'
import { ArrowUpRight, Menu, X, Palette, Brush, Scissors, Sparkles, Instagram, Facebook, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react'
import { supabase } from './supabase'

const courses = [
  { no: '01', title: 'Drawing & Sketching', detail: 'Build confidence with lines, shapes, shading and observation.', age: 'Ages 6+' },
  { no: '02', title: 'Painting Studio', detail: 'Explore watercolour, acrylic, colour theory and expressive techniques.', age: 'Ages 8+' },
  { no: '03', title: 'Creative Craft', detail: 'Make beautiful things with paper, clay, fabric and found materials.', age: 'Ages 6+' },
  { no: '04', title: 'Kids Art Discovery', detail: 'Playful, guided sessions that turn curiosity into creative confidence.', age: 'Ages 4–7' },
]
const gallery = [
  { title: 'Colour in bloom', type: 'Painting', image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=900&q=85' },
  { title: 'A study in form', type: 'Drawing', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85' },
  { title: 'Handmade stories', type: 'Craft', image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=85' },
  { title: 'The art of detail', type: 'Mixed media', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=900&q=85' },
  { title: 'Creative process', type: 'Studio', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85' },
  { title: 'Made with imagination', type: 'Craft', image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=900&q=85' },
]
const initialForm = { student_name: '', parent_name: '', age: '', phone: '', email: '', course: '', message: '' }

function Header() {
  const [open, setOpen] = useState(false)
  const links = [['About', '#about'], ['Courses', '#courses'], ['Gallery', '#gallery'], ['Admissions', '#admissions']]
  return <header className="header">
    <a className="brand" href="#home" aria-label="Ratan Kala home"><span className="brand-mark">R<span>K</span></span><span className="brand-name">RATAN KALA<small>ART & CRAFT ACADEMY</small></span></a>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X/> : <Menu/>}</button>
    <nav className={open ? 'nav nav-open' : 'nav'}>{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-cta" href="#admissions" onClick={() => setOpen(false)}>Enquire now <ArrowUpRight size={15}/></a></nav>
  </header>
}

function AdmissionForm() {
  const [form, setForm] = useState(initialForm)
  const [state, setState] = useState({ loading: false, message: '', success: false })
  const update = e => setForm({ ...form, [e.target.name]: e.target.value })
  async function submit(e) {
    e.preventDefault()
    setState({ loading: true, message: '', success: false })
    if (!form.student_name || !form.parent_name || !form.phone || !form.course) {
      setState({ loading: false, message: 'Please complete all required fields.', success: false }); return
    }
    if (!supabase) {
      setState({ loading: false, message: 'The admission form is ready, but online submission is not configured yet. Please connect Supabase using the setup guide, or contact the academy directly.', success: false }); return
    }
    const { error } = await supabase.from('admission_enquiries').insert([{
      ...form, age: form.age ? Number(form.age) : null
    }])
    if (error) {
      setState({ loading: false, message: 'We could not submit your enquiry. Please try again or contact the academy.', success: false })
    } else {
      setForm(initialForm)
      setState({ loading: false, message: 'Thank you! Your admission enquiry has been received. The academy will contact you soon.', success: true })
    }
  }
  return <form className="admission-form" onSubmit={submit}>
    <div className="form-grid">
      <label>Student's name *<input name="student_name" value={form.student_name} onChange={update} required placeholder="Enter student name"/></label>
      <label>Parent / guardian name *<input name="parent_name" value={form.parent_name} onChange={update} required placeholder="Enter parent name"/></label>
      <label>Student age<input name="age" type="number" min="3" max="100" value={form.age} onChange={update} placeholder="Age"/></label>
      <label>Phone number *<input name="phone" type="tel" value={form.phone} onChange={update} required placeholder="Your contact number"/></label>
      <label>Email address<input name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com"/></label>
      <label>Interested course *<select name="course" value={form.course} onChange={update} required><option value="">Select a course</option>{courses.map(c => <option key={c.title}>{c.title}</option>)}</select></label>
      <label className="full">Anything you'd like us to know?<textarea name="message" rows="3" value={form.message} onChange={update} placeholder="Previous experience, preferred timings, questions..."/></label>
    </div>
    <button className="button button-dark submit-button" disabled={state.loading}>{state.loading ? 'Submitting…' : 'Submit admission enquiry'} <ArrowUpRight size={17}/></button>
    {state.message && <p className={state.success ? 'form-message success' : 'form-message'}>{state.success && <CheckCircle2 size={17}/>} {state.message}</p>}
    <p className="privacy-note">Your details are used only to respond to this enquiry.</p>
  </form>
}

function App() {
  return <>
    <Header/>
    <main>
      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow"><span/> A PLACE TO MAKE, PLAY & IMAGINE</p>
          <h1>Where creativity<br/>finds <em>its colour.</em></h1>
          <p className="hero-text">A welcoming space for curious minds and creative hands. Discover the joy of art, craft and making something uniquely yours.</p>
          <div className="hero-actions"><a className="button button-dark" href="#courses">Explore our courses <ArrowUpRight size={17}/></a><a className="text-link" href="#about">Discover Ratan Kala <span>↗</span></a></div>
          <div className="hero-note"><span className="note-line"/> LEARN • CREATE • GROW</div>
        </div>
        <div className="hero-art">
          <img src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=90" alt="Colourful art studio with paintings and creative materials"/>
          <div className="hero-stamp"><span>CREATE</span><b>with joy</b><span>EVERY DAY</span></div>
          <div className="image-caption">A little imagination goes a long way.</div>
        </div>
        <div className="hero-index">01 / 04</div>
      </section>

      <section className="intro section-pad" id="about">
        <div className="section-kicker">01 — OUR PHILOSOPHY</div>
        <div className="intro-content"><h2>More than art.<br/><em>A way to see the world.</em></h2><div><p>At Ratan Kala Art & Craft Academy, we believe creativity is a skill that grows with encouragement, exploration and practice. Our studio is a space to experiment freely, learn new techniques and celebrate every original idea.</p><a className="under-link" href="#admissions">Come create with us <ArrowUpRight size={16}/></a></div></div>
        <div className="values"><div><Palette/><b>Explore</b><span>Discover colour, texture and new ideas.</span></div><div><Brush/><b>Learn</b><span>Build skills with thoughtful guidance.</span></div><div><Sparkles/><b>Express</b><span>Find your own voice through making.</span></div><div><Scissors/><b>Create</b><span>Turn imagination into something real.</span></div></div>
      </section>

      <section className="courses section-pad" id="courses">
        <div className="section-top"><div><div className="section-kicker">02 — FIND YOUR CREATIVE PATH</div><h2>Classes for every<br/><em>kind of imagination.</em></h2></div><p>From first marks to ambitious projects, there's room to explore at every stage.</p></div>
        <div className="course-list">{courses.map(c => <article className="course-row" key={c.no}><span className="course-no">{c.no}</span><div><h3>{c.title}</h3><p>{c.detail}</p></div><span className="course-age">{c.age}</span><a href="#admissions" aria-label={`Enquire about ${c.title}`}><ArrowUpRight/></a></article>)}</div>
      </section>

      <section className="gallery section-pad" id="gallery">
        <div className="section-top"><div><div className="section-kicker">03 — THE CREATIVE JOURNEY</div><h2>Made by hand.<br/><em>Made with heart.</em></h2></div><p>A glimpse into the colours, textures and ideas that come alive in our creative world.</p></div>
        <div className="gallery-grid">{gallery.map((item, i) => <article className={`gallery-item gallery-${i+1}`} key={item.title}><img src={item.image} alt={item.title}/><div className="gallery-label"><span>{item.type}</span><b>{item.title}</b></div></article>)}</div>
        <p className="gallery-disclaimer">Gallery imagery is illustrative. Replace these photographs with Ratan Kala student artwork and academy photographs before launch.</p>
      </section>

      <section className="quote-band"><span className="quote-mark">“</span><p>Every child is an artist.<br/><em>The joy is in discovering it.</em></p><span className="quote-credit">THE RATAN KALA SPIRIT</span></section>

      <section className="admissions section-pad" id="admissions">
        <div className="admission-copy"><div className="section-kicker">04 — BEGIN YOUR JOURNEY</div><h2>Let's make<br/><em>something wonderful.</em></h2><p>Tell us a little about the learner and the classes you're interested in. Our team will get in touch with you about the next steps.</p><div className="contact-lines"><div><Phone size={17}/><span>Academy phone<br/><b>Add your phone number</b></span></div><div><Mail size={17}/><span>Email<br/><b>Add your email address</b></span></div><div><MapPin size={17}/><span>Visit us<br/><b>Add academy address</b></span></div></div></div>
        <div className="form-card"><div className="form-heading"><span>ADMISSIONS / ENQUIRY</span><h3>Start with a hello.</h3><p>Fields marked * are required.</p></div><AdmissionForm/></div>
      </section>
    </main>
    <footer className="footer"><a className="brand footer-brand" href="#home"><span className="brand-mark">R<span>K</span></span><span className="brand-name">RATAN KALA<small>ART & CRAFT ACADEMY</small></span></a><p>Creativity has a place here.</p><div className="socials"><a href="#contact" aria-label="Instagram"><Instagram/></a><a href="#contact" aria-label="Facebook"><Facebook/></a></div><span className="copyright">© {new Date().getFullYear()} Ratan Kala Art & Craft Academy</span></footer>
  </>
}

export default App
