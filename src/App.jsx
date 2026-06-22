import { useEffect, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes, useLocation } from "react-router-dom";
import {
  ArrowRight, BookOpen, CalendarBlank, Check, EnvelopeSimple, FacebookLogo,
  GlobeHemisphereWest, InstagramLogo, List, MapPin, Package, PaintBrush,
  PaperPlaneTilt, Phone, Printer, Quotes, ShoppingBag, Sparkle, Storefront,
  Student, X
} from "@phosphor-icons/react";

const basePath = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");
const A = `${import.meta.env.BASE_URL}assets/`;
const whatsapp = "https://wa.me/919899284296?text=Hello%20Javed%20Press%2C%20I%20would%20like%20a%20printing%20quote.";

const services = [
  ["Offset Printing", "High-volume, colour-accurate printing for premium commercial jobs.", "machine-offset.jpg", Printer],
  ["Digital Printing", "Fast, vibrant short-run printing with dependable turnaround.", "machine-digital.jpg", Printer],
  ["Custom Packaging", "Folding cartons, rigid boxes and tailored product packaging.", "service-packaging.png", Package],
  ["Business Cards", "Foil, textured, laminated and edge-finished visiting cards.", "service-business-cards.png", Sparkle],
  ["Brochures & Flyers", "Crisp promotional literature in every practical size and fold.", "service-brochures.png", PaperPlaneTilt],
  ["Books & Magazines", "Publishing-quality printing, binding and finishing for every run.", "service-books.png", BookOpen],
  ["Wedding Invitations", "Elegant invitation suites with foil, embossing and fine papers.", "service-wedding.png", EnvelopeSimple],
  ["Stickers & Labels", "Roll labels, sheets, die-cuts and durable product stickers.", "service-stickers.png", Sparkle],
  ["Banners & Signage", "Indoor displays, event graphics and large-format signage.", "service-banners.png", Storefront],
  ["Calendars & Diaries", "Corporate calendars, planners and premium bound diaries.", "service-calendars.png", CalendarBlank],
  ["Catalogues", "Beautifully structured product catalogues that make selling easier.", "service-catalogues.png", BookOpen],
  ["Menu Cards", "Durable restaurant menus in booklet, folded and table formats.", "service-menu-cards.png", BookOpen],
  ["Certificates", "Professional certificates on fine stock with special finishes.", "service-certificates.png", Sparkle],
  ["Paper Bags", "Custom retail bags with strong handles and premium print quality.", "service-paper-bags.png", ShoppingBag],
  ["Corporate Stationery", "Letterheads, envelopes, folders, notepads and office sets.", "service-stationery.png", PaperPlaneTilt],
  ["Invitation Cards", "Modern cards for launches, events, birthdays and celebrations.", "service-invitations.png", EnvelopeSimple],
  ["Promotional Merchandise", "Thoughtful branded gifts, totes, mugs and presentation kits.", "service-merchandise.png", ShoppingBag],
  ["Graphic Design", "Brand identities and print-ready artwork crafted with precision.", "service-graphic-design.png", PaintBrush],
  ["Web & E-commerce", "Modern websites and online stores designed to help brands grow.", "service-web-ecommerce.png", GlobeHemisphereWest],
  ["Social Media Creatives", "Coherent digital campaigns and conversion-ready content.", "service-social-media.png", PaintBrush],
];

function ScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [["/", "Home"], ["/about", "About Us"], ["/services", "Services"], ["/gallery", "Gallery"], ["/contact", "Contact"]];
  return <>
    <div className="topbar"><div className="shell topbar-inner"><span><MapPin size={15}/> 2096, Rodgran, Lal Kuan, Ansari Road, Delhi – 110006</span><span><EnvelopeSimple size={15}/> javedpress@gmail.com</span></div></div>
    <header className="header">
      <div className="shell nav-wrap">
        <NavLink to="/" className="logo-link" aria-label="Javed Press home"><img src={`${A}javed-press-logo.png`} alt="Javed Press"/></NavLink>
        <nav className={open ? "nav open" : "nav"} aria-label="Main navigation">
          {links.map(([to, label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)} className={({isActive}) => isActive ? "active" : ""}>{label}</NavLink>)}
          <a className="mobile-call" href="tel:+919899284296"><Phone/> +91 98992 84296</a>
        </nav>
        <div className="nav-actions">
          <a className="phone-link" href="tel:+919899284296"><Phone weight="fill"/><span>+91 98992 84296</span></a>
          <a className="button green small" href={whatsapp} target="_blank" rel="noreferrer">Get a Quote</a>
          <button className="menu-btn" aria-label="Toggle menu" onClick={() => setOpen(!open)}>{open ? <X/> : <List/>}</button>
        </div>
      </div>
    </header>
  </>;
}

function Footer() {
  return <footer>
    <div className="shell footer-grid">
      <div className="footer-brand"><img src={`${A}javed-press-logo.png`} alt="Javed Press"/><p>Quality printing, thoughtful design and practical digital solutions from the heart of Old Delhi.</p></div>
      <div><h3>Explore</h3><NavLink to="/about">Our story</NavLink><NavLink to="/services">All services</NavLink><NavLink to="/gallery">Work gallery</NavLink><NavLink to="/contact">Request a quote</NavLink></div>
      <div><h3>Contact</h3><a href="tel:+919899284296">+91 98992 84296</a><a href="mailto:javedpress@gmail.com">javedpress@gmail.com</a><p>2096, Rodgran, Lal Kuan,<br/>Ansari Road, Delhi – 110006</p></div>
      <div><h3>Working Hours</h3><p>Monday–Saturday<br/>10:00 AM–7:30 PM</p><div className="socials"><a href="https://www.instagram.com/javedpress?igsh=MWpidmhlNnNyY3hlZg==" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramLogo/></a><a href="https://www.facebook.com/mohdjaved.javed.9" target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookLogo/></a></div></div>
    </div>
    <div className="copyright"><div className="shell">© {new Date().getFullYear()} Javed Press. Crafted for print, packaging and digital.</div></div>
  </footer>;
}

function PageHero({ eyebrow, title, text }) {
  return <section className="page-hero"><div className="shell"><div className="cmyk-line"/><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div></section>;
}

function TrustStrip() {
  return <div className="trust-strip"><div className="shell trust-grid">
    {["Professional experience", "Print-to-digital expertise", "Quality checked", "On-time support"].map((x) => <div key={x}><Check weight="bold"/><span>{x}</span></div>)}
  </div></div>;
}

function ServiceGrid({ limit }) {
  const list = limit ? services.slice(0, limit) : services;
  return <div className="service-grid">{list.map(([name, desc, image, Icon], i) => <article className="service-card reveal" key={name} style={{"--delay": `${(i%4)*70}ms`}}>
    <div className="service-image"><img src={`${A}${image}`} alt={`${name} by Javed Press`} loading="lazy"/></div>
    <div className="service-copy"><Icon size={23}/><h3>{name}</h3><p>{desc}</p><NavLink to="/contact">Ask for a quote <ArrowRight/></NavLink></div>
  </article>)}</div>;
}

function Home() {
  return <>
    <section className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <div className="cmyk-line"/><span className="eyebrow">Delhi's print & digital partner</span>
          <h1>Premium printing.<br/>Powerful digital solutions.<br/><em>All in Delhi.</em></h1>
          <p>From offset and digital printing to packaging, graphic design and e-commerce solutions—we help ideas look sharp, communicate clearly and grow.</p>
          <div className="hero-actions"><a className="button green" href={whatsapp} target="_blank" rel="noreferrer">Get a Quote on WhatsApp <ArrowRight/></a><a className="button outline" href="tel:+919899284296"><Phone/> Call now</a></div>
        </div>
        <div className="hero-media"><img src={`${A}machine-digital.jpg`} alt="Javed Press digital printing machine"/><div className="image-note"><span>Print</span><span>Packaging</span><span>Digital</span></div></div>
      </div>
    </section>
    <TrustStrip/>
    <section className="section services-home"><div className="shell"><div className="section-head"><div><span className="eyebrow pink">Our services</span><h2>Complete print & digital solutions</h2><p>Everything your business needs, under one roof.</p></div><NavLink className="text-link" to="/services">View all 20 services <ArrowRight/></NavLink></div><ServiceGrid limit={8}/></div></section>
    <section className="section story-band"><div className="shell story-grid"><div className="story-image"><img src={`${A}machine-offset.jpg`} alt="Javed Press printing production floor"/></div><div><span className="eyebrow">Built one job at a time</span><h2>From a small shop to a full creative partner.</h2><p>Javed Press began with a simple commitment: treat every print job with care. Today that same practical spirit connects printing, packaging, graphic design, websites and e-commerce under one roof.</p><p>We also share real professional knowledge with students at no fee, helping them understand how actual client work moves from brief to finished result.</p><NavLink className="button dark" to="/about">Read our story <ArrowRight/></NavLink></div></div></section>
    <section className="section process"><div className="shell"><div className="section-head centered"><div><span className="eyebrow pink">How it works</span><h2>Clear from brief to delivery</h2></div></div><div className="process-grid">{[["01","Tell us what you need"],["02","Approve design & estimate"],["03","We print and quality-check"],["04","Collect or receive delivery"]].map(([n,t])=><div key={n}><b>{n}</b><h3>{t}</h3></div>)}</div></div></section>
    <QuoteBand/>
  </>;
}

function About() {
  return <>
    <PageHero eyebrow="About Javed Press" title="A local press with a wider creative world." text="Rooted in Old Delhi, growing through craft, technology and generous knowledge-sharing."/>
    <section className="section"><div className="shell about-intro"><div><span className="eyebrow pink">Our beginning</span><h2>It started with a small shop and serious attention to detail.</h2></div><div><p>Javed Press grew from a modest printing shop into a complete production and creative studio. The work expanded naturally—from dependable printing to custom packaging, graphic design, e-commerce and web development.</p><p>Our team combines press-floor knowledge with modern design tools. That means artwork is created with the finished product in mind: the right paper, colour, fold, finish and digital experience—not just a pretty file on a screen.</p></div></div></section>
    <section className="section dark-section"><div className="shell split"><div><img src={`${A}service-graphic-design.png`} alt="Graphic design work at Javed Press"/></div><div><span className="eyebrow yellow">Print meets digital</span><h2>Designed here. Built for anywhere.</h2><p>Alongside our Delhi clients, our digital team has contributed to international-facing work connected with Japan and Germany. We approach every web, e-commerce and design project with the same production discipline used in print.</p><div className="feature-list"><div><PaintBrush/><span><b>Graphic design</b>Brand identity and print-ready artwork</span></div><div><GlobeHemisphereWest/><span><b>Web & e-commerce</b>Responsive sites and online stores</span></div><div><Student/><span><b>Student mentoring</b>Real professional guidance shared free of charge</span></div></div></div></div></section>
    <section className="section"><div className="shell values"><div><span className="eyebrow pink">What guides us</span><h2>Craft, clarity and honest partnership.</h2></div><div className="value-grid">{[["01","Listen first","Every project starts with the real requirement, not a standard package."],["02","Make it practical","We recommend materials and methods that suit the purpose and budget."],["03","Share knowledge","Clients and students understand the process, not just the final invoice."]].map(([n,t,p])=><article key={n}><b>{n}</b><h3>{t}</h3><p>{p}</p></article>)}</div></div></section>
    <QuoteBand/>
  </>;
}

function AboutRich() {
  const journey = [
    ["1989", "Started as a small printing unit in Old Delhi with a vision to provide high-quality printing services."],
    ["1994", "Adopted computer technology, digital publishing, and modern graphic design workflows to stay ahead of the industry."],
    ["35+ Years of Excellence", "More than three decades of trusted service in printing, packaging, graphic designing, website development, digital solutions, and brand building."]
  ];
  const whyChoose = [
    "35+ Years of Industry Experience",
    "Modern Printing Technology",
    "Professional Graphic Designing",
    "Website & E-commerce Development",
    "Complete Branding Solutions",
    "Premium Packaging Design",
    "Fast Turnaround Time",
    "Affordable Pricing",
    "Personalized Customer Support",
    "Practical Training & Student Mentorship",
    "Quality Assurance on Every Project",
    "Trusted by Businesses Across India"
  ];

  return <>
    <PageHero eyebrow="About Us – Javed Press" title="Crafting Quality. Building Trust. Inspiring the Next Generation." text="From a small Old Delhi printing unit to a complete print, branding and digital solutions company."/>
    <section className="section about-story-section">
      <div className="shell about-story-grid">
        <div className="about-story-title">
          <span className="eyebrow pink">Our story</span>
          <h2>Founded in 1989 with quality, honesty and a love for learning.</h2>
          <div className="about-stamp"><b>35+</b><span>Years of excellence</span></div>
        </div>
        <div className="about-rich-copy">
          <p>Founded in 1989, Mohd. Javed established Javed Press as a small printing unit in the heart of Old Delhi after completing his B.Com from Zakir Husain Delhi College. What began as a modest setup with a vision for quality and honesty has grown into one of Delhi's trusted names in commercial printing, digital printing, packaging, publishing, branding, and creative design solutions.</p>
          <p>Driven by a passion for learning and innovation, Mohd. Javed embraced computer technology in 1994, beginning with DOS-based systems and later mastering Windows-based publishing and graphic design software through professional training and continuous self-learning. This commitment to staying ahead of technology has helped Javed Press evolve with every generation of the printing industry.</p>
          <p>Today, Javed Press is not only a printing press but also a complete creative and digital solutions company. Along with premium printing services, we provide Graphic Designing, Branding, Packaging Design, Publishing Solutions, eBook Formatting, Website Development, E-commerce Website Development, UI/UX Design, Digital Marketing Creatives, Product Photography, and Professional Business Identity Design — helping businesses build a powerful brand from concept to completion.</p>
        </div>
      </div>
    </section>
    <section className="section dark-section about-capabilities">
      <div className="shell split">
        <div><img src={`${A}service-graphic-design.png`} alt="Graphic design and digital solutions by Javed Press"/></div>
        <div>
          <span className="eyebrow yellow">Print, design & digital</span>
          <h2>A complete creative partner for modern businesses.</h2>
          <p>One of our greatest strengths is our commitment to sharing knowledge. We proudly mentor students, aspiring designers, and developers by providing practical industry experience, real client projects, and professional guidance at no cost. We believe that knowledge grows when it is shared, and we are dedicated to helping the next generation build successful careers in design, printing, and technology.</p>
          <p>Our experience extends beyond traditional printing. Through years of continuous learning and professional collaborations, we have gained valuable exposure to international-quality workflows, modern publishing standards, advanced graphic production techniques, e-commerce development, and global design practices inspired by international markets, enabling us to deliver solutions that meet today's business expectations.</p>
          <p>Now, the next generation, Junaid Khan, is actively learning every aspect of the business, carrying forward the legacy of innovation, quality, customer satisfaction, and trust that has been built over more than three decades.</p>
          <div className="feature-list">
            <div><PaintBrush/><span><b>Creative design</b>Branding, packaging, publishing and business identity</span></div>
            <div><GlobeHemisphereWest/><span><b>Web & e-commerce</b>Websites, UI/UX and online business solutions</span></div>
            <div><Student/><span><b>Student mentorship</b>Practical industry experience shared at no cost</span></div>
          </div>
        </div>
      </div>
    </section>
    <section className="section about-products">
      <div className="shell about-highlight">
        <span className="eyebrow pink">What we deliver</span>
        <h2>From a single business card to large-scale commercial printing.</h2>
        <p>Whether you need Books, Magazines, Catalogues, Brochures, Business Cards, Packaging Boxes, Labels, Stickers, Corporate Stationery, Wedding Cards, Promotional Material, Large Format Printing, Custom Printing Solutions, Graphic Design, or Professional Website Development, Javed Press is your trusted partner for delivering premium quality with precision and on-time service.</p>
        <p>Every project we undertake reflects our commitment to excellence, creativity, attention to detail, and customer satisfaction. From a single business card to large-scale commercial printing, our goal remains the same — to transform your ideas into outstanding products that leave a lasting impression.</p>
      </div>
    </section>
    <section className="section journey-section">
      <div className="shell">
        <div className="section-head centered"><div><span className="eyebrow pink">Our Journey</span><h2>Built step by step, decade by decade.</h2></div></div>
        <div className="journey-grid">{journey.map(([year, text]) => <article key={year}><b>{year}</b><p>{text}</p></article>)}</div>
      </div>
    </section>
    <section className="section mission-section">
      <div className="shell mission-grid">
        <article><span className="eyebrow pink">Our Mission</span><h2>Deliver quality and empower learning.</h2><p>To deliver premium-quality printing and creative solutions while empowering businesses with modern branding and helping aspiring professionals gain practical industry experience through mentorship and real-world learning.</p></article>
        <article><span className="eyebrow yellow">Our Vision</span><h2>Traditional craft, modern technology.</h2><p>To become one of India's most trusted printing and creative solution companies by combining traditional craftsmanship with modern technology, innovation, and continuous learning.</p></article>
      </div>
    </section>
    <section className="section why-section">
      <div className="shell">
        <div className="section-head"><div><span className="eyebrow pink">Why Choose Javed Press?</span><h2>Reliable quality with complete support.</h2></div></div>
        <div className="why-grid">{whyChoose.map((item) => <div key={item}><Check weight="bold"/><span>{item}</span></div>)}</div>
      </div>
    </section>
    <QuoteBand/>
  </>;
}

function Services() {
  return <><PageHero eyebrow="20 services. One dependable team." title="From the press floor to the browser." text="Explore printing, packaging, design and digital services tailored to real business needs."/><section className="section"><div className="shell"><ServiceGrid/></div></section><QuoteBand/></>;
}

function Gallery() {
  const [selected, setSelected] = useState(null);
  const gallery = services.map(s => [s[0], s[2]]);
  return <><PageHero eyebrow="Selected work" title="Details you can see. Quality you can feel." text="A closer look at the machines, papers, finishes and digital craft behind our work."/><section className="section"><div className="shell gallery-grid">{gallery.map(([name,img])=><button onClick={()=>setSelected([name,img])} key={name}><img src={`${A}${img}`} alt={name} loading="lazy"/><span>{name}</span></button>)}</div></section>{selected&&<div className="lightbox" role="dialog" aria-modal="true" onClick={()=>setSelected(null)}><button aria-label="Close"><X/></button><img src={`${A}${selected[1]}`} alt={selected[0]}/><p>{selected[0]}</p></div>}</>;
}

function ContactForm({ compact=false }) {
  return <form className={compact ? "quote-form compact" : "quote-form"} action="https://formsubmit.co/javedpress@gmail.com" method="POST" encType="multipart/form-data">
    <input type="hidden" name="_subject" value="New website enquiry for Javed Press"/><input type="hidden" name="_template" value="table"/><input type="hidden" name="_captcha" value="false"/>
    <label>Full name<input name="Name" required placeholder="Your name"/></label>
    <label>Phone number<input name="Phone" required inputMode="tel" placeholder="+91"/></label>
    {!compact&&<label>Email<input type="email" name="Email" required placeholder="you@example.com"/></label>}
    <label>What do you need?<select name="Service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map(s=><option key={s[0]}>{s[0]}</option>)}</select></label>
    {!compact&&<><label>Quantity<input type="number" name="Quantity" min="1" placeholder="e.g. 500"/></label><label>Paper / size<input name="Paper and size" placeholder="e.g. A4, 300 GSM"/></label><label>Finishing<select name="Finishing"><option>Not sure — please advise</option><option>Matte lamination</option><option>Gloss lamination</option><option>Foil / embossing</option><option>Spot UV</option><option>Binding</option></select></label><label>Required by<input type="date" name="Deadline"/></label><label className="full">Project details<textarea name="Project details" required placeholder="Tell us what you want printed, designed or built…"/></label><label className="full file">Attach artwork or reference<input type="file" name="attachment" accept=".pdf,.jpg,.jpeg,.png,.ai,.psd,.doc,.docx"/></label></>}
    <button className="button dark full" type="submit">Send enquiry <PaperPlaneTilt/></button>
    <p className="form-note full">Your enquiry will be emailed securely to javedpress@gmail.com.</p>
  </form>;
}

function Contact() {
  return <><PageHero eyebrow="Request a quote" title="Tell us what you want to create." text="Share the product, quantity, finish and deadline. We’ll help shape the rest."/><section className="section"><div className="shell contact-grid"><div><span className="eyebrow pink">Project details</span><h2>A better estimate starts with a clear brief.</h2><ContactForm/></div><aside className="contact-aside"><div><Phone/><h3>Call or WhatsApp</h3><a href="tel:+919899284296">+91 98992 84296</a></div><div><EnvelopeSimple/><h3>Email</h3><a href="mailto:javedpress@gmail.com">javedpress@gmail.com</a></div><div><MapPin/><h3>Visit the press</h3><p>Javed Press<br/>2096, Rodgran, Lal Kuan,<br/>Ansari Road, Delhi – 110006</p></div><iframe title="Javed Press location map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=2096%20Rodgran%20Lal%20Kuan%20Ansari%20Road%20Delhi%20110006&output=embed"/></aside></div></section></>;
}

function QuoteBand() {
  return <section className="quote-band"><div className="shell quote-grid"><div><Quotes/><span className="eyebrow yellow">Have a project in mind?</span><h2>Let’s make something worth holding onto.</h2><p>Send the details now or speak directly with our team.</p><div className="hero-actions"><NavLink className="button light" to="/contact">Start your enquiry <ArrowRight/></NavLink><a className="button ghost" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp us</a></div></div><ContactForm compact/></div></section>;
}

function AppLayout() {
  return <div><ScrollTop/><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<AboutRich/>}/><Route path="/services" element={<Services/>}/><Route path="/gallery" element={<Gallery/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<Home/>}/></Routes></main><a className="whatsapp-float" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Chat with Javed Press on WhatsApp"><Phone weight="fill"/></a><Footer/></div>;
}

export function App() { return <BrowserRouter basename={basePath}><AppLayout/></BrowserRouter>; }
