import { useEffect, useRef, useState } from "react";
import { BrowserRouter, NavLink, Route, Routes, useLocation } from "react-router-dom";
import {
  ArrowRight, BookOpen, CalendarBlank, Check, EnvelopeSimple, FacebookLogo,
  GlobeHemisphereWest, InstagramLogo, List, MapPin, Package, PaintBrush,
  Microphone, PaperPlaneTilt, Phone, Printer, Quotes, ShoppingBag, Sparkle, Storefront,
  Student, X
} from "@phosphor-icons/react";

const basePath = import.meta.env.BASE_URL === "/" ? "" : import.meta.env.BASE_URL.replace(/\/$/, "");
const A = `${import.meta.env.BASE_URL}assets/`;
const contactEndpoint = `${basePath}/contact.php`;
const whatsapp = "https://wa.me/919899284296?text=Hello%20Javed%20Press%2C%20I%20would%20like%20a%20printing%20quote.";
const address = "2096 Rodgran Lal Kuan Delhi - 110006";
const businessHours = "10:00 AM - 7:00 PM";
const mapSrc = "https://www.google.com/maps?q=2096%20Rodgran%2C%20Lal%20Kuan%2C%20Delhi%20110006&z=17&output=embed";

const services = [
  ["Offset Printing", "High-volume, colour-accurate printing for premium commercial jobs.", "machine-offset.jpg", Printer],
  ["Digital Printing", "Fast, vibrant short-run printing with dependable turnaround.", "machine-digital.jpg", Printer],
  ["Custom Packaging", "Folding cartons, rigid boxes and tailored product packaging.", "service-packaging.png", Package],
  ["Business Cards", "Foil, textured, laminated and edge-finished visiting cards.", "service-business-cards.png", Sparkle],
  ["Brochures & Flyers", "Crisp promotional literature in every practical size and fold.", "service-brochures.png", PaperPlaneTilt],
  ["Books & Magazines", "Publishing-quality printing, binding and finishing for every run.", "service-books.png", BookOpen],
  ["Book Printing & Binding", "Sharp book interiors, strong covers and neat binding for every edition.", "service-book-binding.png", BookOpen],
  ["Notebook & Diary Printing", "Custom notebooks, planners, diaries and writing pads for brands and offices.", "service-notebooks-diaries.png", CalendarBlank],
  ["Bill Books & NCR Pads", "Invoice books, receipt pads, challans and carbonless business forms.", "service-bill-books.png", PaperPlaneTilt],
  ["Wedding Invitations", "Elegant invitation suites with foil, embossing and fine papers.", "service-wedding.png", EnvelopeSimple],
  ["Stickers & Labels", "Roll labels, sheets, die-cuts and durable product stickers.", "service-stickers.png", Sparkle],
  ["Banners & Signage", "Indoor displays, event graphics and large-format signage.", "service-banners.png", Storefront],
  ["Poster & Flex Printing", "Bold posters, flex banners, vinyl graphics and display prints.", "service-posters-flex.png", Storefront],
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

function FaviconSync() {
  useEffect(() => {
    const setIcon = (rel, href, sizes) => {
      let link = document.querySelector(`link[rel="${rel}"]`);
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
      if (sizes) link.sizes = sizes;
      link.type = "image/png";
    };
    setIcon("icon", `${A}favicon-64.png`, "64x64");
    setIcon("apple-touch-icon", `${A}apple-touch-icon.png`);
  }, []);
  return null;
}

function HoverSound() {
  const audioRef = useRef(null);
  const lastToneRef = useRef(0);

  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const interactiveSelector = "a, button, input, select, textarea, .service-card, .process-grid > div, .why-grid > div, .journey-grid article, .video-card, .location-card, .chatbot-launch";

    const playTone = (frequency, duration = 0.055, volume = 0.024) => {
      const now = performance.now();
      if (now - lastToneRef.current < 42) return;
      lastToneRef.current = now;

      const context = audioRef.current || new AudioContext();
      audioRef.current = context;
      if (context.state === "suspended") context.resume();

      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, context.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.18, context.currentTime + duration);
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(volume, context.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + duration + 0.02);
    };

    const onPointerOver = (event) => {
      const target = event.target instanceof Element ? event.target.closest(interactiveSelector) : null;
      const related = event.relatedTarget instanceof Node ? event.relatedTarget : null;
      if (!target || target === related || target.contains(related)) return;
      playTone(540);
    };

    const onPointerDown = (event) => {
      const target = event.target instanceof Element ? event.target.closest(interactiveSelector) : null;
      if (!target) return;
      playTone(320, 0.075, 0.032);
    };

    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => {
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("pointerdown", onPointerDown, true);
      if (audioRef.current?.state !== "closed") audioRef.current?.close();
    };
  }, []);

  return null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [["/", "Home"], ["/about", "About Us"], ["/services", "Services"], ["/contact", "Contact"]];
  return <>
    <div className="topbar"><div className="shell topbar-inner"><span><MapPin size={15}/> {address}</span><span><EnvelopeSimple size={15}/> javedpress@gmail.com</span></div></div>
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
      <div><h3>Explore</h3><NavLink to="/about">Our story</NavLink><NavLink to="/services">All services</NavLink><NavLink to="/contact">Request a quote</NavLink></div>
      <div><h3>Contact</h3><a href="tel:+918700838758">+91 87008 38758</a><a href="tel:+919899284296">+91 98992 84296</a><a href="mailto:javedpress@gmail.com">javedpress@gmail.com</a><p>{address}</p></div>
      <div><h3>Working Hours</h3><p>Monday-Saturday<br/>{businessHours}</p><div className="socials"><a href="https://www.instagram.com/javedpress?igsh=MWpidmhlNnNyY3hlZg==" target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramLogo/></a><a href="https://www.facebook.com/mohdjaved.javed.9" target="_blank" rel="noreferrer" aria-label="Facebook"><FacebookLogo/></a></div></div>
    </div>
    <div className="copyright"><div className="shell copyright-inner"><span>© {new Date().getFullYear()} Javed Press. Crafted for print, packaging and digital.</span><span className="creator-credit">Created by Shariqa</span></div></div>
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

function VideoShowcase() {
  const videos = [
    ["Print floor in motion", "javedpress-video-1.mp4", "video-thumb-print-floor.jpg"],
    ["Design and production", "javedpress-video-2.mp4", "video-thumb-design-production.jpg"],
    ["Javed Press showcase", "javedpress-video-3.mp4", "video-thumb-showcase.jpg"],
  ];
  return <section className="section video-showcase">
    <div className="shell">
      <div className="section-head">
        <div><span className="eyebrow pink">Watch the work</span><h2>Printing, design and digital craft in motion.</h2><p>Play, pause and resume each video whenever you like.</p></div>
      </div>
      <div className="video-grid">
        {videos.map(([title, file, poster]) => <article className="video-card" key={file}>
          <video controls playsInline preload="metadata" poster={`${A}${poster}`}>
            <source src={`${A}${file}`} type="video/mp4"/>
          </video>
          <h3>{title}</h3>
        </article>)}
      </div>
    </div>
  </section>;
}

function LocationShowcase() {
  return <section className="section location-showcase">
    <div className="shell location-grid">
      <div className="location-copy">
        <span className="eyebrow yellow">Visit Javed Press</span>
        <h2>Find us inside Rodgran, Lal Kuan.</h2>
        <p>{address}</p>
        <div className="location-pills"><span>{businessHours}</span><span>Call: 87008 38758</span><span>WhatsApp: 98992 84296</span></div>
      </div>
      <div className="location-card">
        <iframe title="Javed Press Lal Kuan map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={mapSrc}/>
      </div>
    </div>
  </section>;
}

function ServiceGrid({ limit }) {
  const list = limit ? services.slice(0, limit) : services;
  return <div className="service-grid">{list.map(([name, desc, image, Icon], i) => <article className="service-card reveal" key={name} style={{"--delay": `${(i%4)*70}ms`}}>
    <div className="service-image"><img src={`${A}${image}`} alt={`${name} by Javed Press`} loading="lazy"/><span>{String(i + 1).padStart(2, "0")}</span></div>
    <div className="service-copy"><div className="service-icon"><Icon size={22}/></div><h3>{name}</h3><p>{desc}</p><NavLink to="/contact">Ask for a quote <ArrowRight/></NavLink></div>
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
    <section className="section services-home"><div className="shell"><div className="section-head"><div><span className="eyebrow pink">Our services</span><h2>Complete print & digital solutions</h2><p>Everything your business needs, under one roof.</p></div><NavLink className="text-link" to="/services">View all <ArrowRight/></NavLink></div><ServiceGrid limit={8}/></div></section>
    <VideoShowcase/>
    <section className="section story-band"><div className="shell story-grid"><div className="story-image"><img src={`${A}machine-offset.jpg`} alt="Javed Press printing production floor"/></div><div><span className="eyebrow">Built one job at a time</span><h2>From a small shop to a full creative partner.</h2><p>Javed Press began with a simple commitment: treat every print job with care. Today that same practical spirit connects printing, packaging, graphic design, websites and e-commerce under one roof.</p><p>We also share real professional knowledge with students at no fee, helping them understand how actual client work moves from brief to finished result.</p><NavLink className="button dark" to="/about">Read our story <ArrowRight/></NavLink></div></div></section>
    <section className="section process"><div className="shell"><div className="section-head centered"><div><span className="eyebrow pink">How it works</span><h2>Clear from brief to delivery</h2></div></div><div className="process-grid">{[["01","Tell us what you need"],["02","Approve design & estimate"],["03","We print and quality-check"],["04","Collect or receive delivery"]].map(([n,t])=><div key={n}><b>{n}</b><h3>{t}</h3></div>)}</div></div></section>
    <LocationShowcase/>
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
  return <><PageHero eyebrow="Services. One dependable team." title="From the press floor to the browser." text="Explore printing, packaging, design and digital services tailored to real business needs."/><section className="section"><div className="shell"><ServiceGrid/></div></section><QuoteBand/></>;
}

function ContactForm({ compact=false }) {
  return <form className={compact ? "quote-form compact" : "quote-form"} action={contactEndpoint} method="POST" encType="multipart/form-data">
    <input type="hidden" name="_subject" value="New website enquiry for Javed Press"/>
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
  return <><PageHero eyebrow="Request a quote" title="Tell us what you want to create." text="Share the product, quantity, finish and deadline. We’ll help shape the rest."/><section className="section"><div className="shell contact-grid"><div><span className="eyebrow pink">Project details</span><h2>A better estimate starts with a clear brief.</h2><ContactForm/></div><aside className="contact-aside"><div><Phone/><h3>Call or WhatsApp</h3><a href="tel:+918700838758">+91 87008 38758</a><a href="tel:+919899284296">+91 98992 84296</a></div><div><EnvelopeSimple/><h3>Email</h3><a href="mailto:javedpress@gmail.com">javedpress@gmail.com</a></div><div><MapPin/><h3>Visit the press</h3><p>Javed Press<br/>{address}</p></div><div><h3>Working Hours</h3><p>{businessHours}</p></div><iframe title="Javed Press location map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={mapSrc}/></aside></div></section></>;
}

function QuoteBand() {
  return <section className="quote-band"><div className="shell quote-grid"><div><Quotes/><span className="eyebrow yellow">Have a project in mind?</span><h2>Let’s make something worth holding onto.</h2><p>Send the details now or speak directly with our team.</p><div className="hero-actions"><NavLink className="button light" to="/contact">Start your enquiry <ArrowRight/></NavLink><a className="button ghost" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp us</a></div></div><ContactForm compact/></div></section>;
}

function IntroSplash() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 3900);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;
  return <div className="intro-splash" aria-label="Javed Press opening animation">
    <div className="intro-stage">
      <img className="intro-logo" src={`${A}javed-press-logo.png`} alt="Javed Press"/>
      <img className="intro-mascot" src={`${A}javed-intro-mascot-desk.png`} alt="Javed Press founder character at design table"/>
      <div className="intro-flash"/>
    </div>
  </div>;
}

const websiteFacts = {
  name: "Javed Press",
  domain: "javedpress.com",
  creator: "Shariqa",
  founder: "Mohd. Javed",
  nextGeneration: "Junaid Khan",
  started: "1989",
  address,
  hours: businessHours,
  days: "Monday-Saturday",
  email: "javedpress@gmail.com",
  call: "+91 87008 38758",
  whatsapp: "+91 98992 84296",
  services: services.map(([name]) => name).join(", "),
};

function detectReplyStyle(text) {
  if (/[\u0600-\u06FF]/.test(text)) return "urdu";
  if (/[\u0900-\u097F]/.test(text)) return "hindi";
  if (/\b(kisne|banayi|banaya|kaun|kahan|kahaan|kya|batao|puch|pooch|timing|kitna|address|number|mail|website|service|kaam)\b/i.test(text)) return "hinglish";
  return "english";
}

function formatAnswer(style, key) {
  const answers = {
    creator: {
      english: `This website was created by ${websiteFacts.creator}.`,
      hinglish: `Ye website ${websiteFacts.creator} ne banayi hai.`,
      hindi: `यह वेबसाइट ${websiteFacts.creator} ने बनाई है।`,
      urdu: `یہ ویب سائٹ ${websiteFacts.creator} نے بنائی ہے۔`,
    },
    address: {
      english: `Javed Press is at ${websiteFacts.address}. The map on the website is set to the Rodgran, Lal Kuan, Delhi location.`,
      hinglish: `Javed Press ka address hai: ${websiteFacts.address}. Website ka map Rodgran, Lal Kuan, Delhi wali location par set hai.`,
      hindi: `Javed Press का पता है: ${websiteFacts.address}. वेबसाइट में map इसी Rodgran, Lal Kuan, Delhi location पर लगा है।`,
      urdu: `Javed Press کا پتہ ہے: ${websiteFacts.address}. ویب سائٹ کا map Rodgran, Lal Kuan, Delhi location پر لگا ہے۔`,
    },
    hours: {
      english: `Working hours are ${websiteFacts.days}, ${websiteFacts.hours}. It is best to call or WhatsApp before visiting.`,
      hinglish: `Timing ${websiteFacts.days}, ${websiteFacts.hours} hai. Aane se pehle call ya WhatsApp karna best rahega.`,
      hindi: `समय ${websiteFacts.days}, ${websiteFacts.hours} है। आने से पहले call या WhatsApp कर लेना बेहतर रहेगा।`,
      urdu: `Timing ${websiteFacts.days}, ${websiteFacts.hours} ہے۔ آنے سے پہلے call یا WhatsApp کرنا بہتر رہے گا۔`,
    },
    contact: {
      english: `Call ${websiteFacts.call}, WhatsApp ${websiteFacts.whatsapp}, or email ${websiteFacts.email}.`,
      hinglish: `Call: ${websiteFacts.call}. WhatsApp: ${websiteFacts.whatsapp}. Email: ${websiteFacts.email}.`,
      hindi: `Call: ${websiteFacts.call}. WhatsApp: ${websiteFacts.whatsapp}. Email: ${websiteFacts.email}.`,
      urdu: `Call: ${websiteFacts.call}. WhatsApp: ${websiteFacts.whatsapp}. Email: ${websiteFacts.email}.`,
    },
    services: {
      english: `Javed Press offers ${websiteFacts.services}. It covers print, packaging, design, web, e-commerce and social media creative work.`,
      hinglish: `Javed Press ye services karta hai: ${websiteFacts.services}. Yahan printing, packaging, design, website, e-commerce aur social media creatives ka kaam hota hai.`,
      hindi: `Javed Press ये services करता है: ${websiteFacts.services}. यहाँ printing, packaging, design, website, e-commerce और social media creatives का काम होता है।`,
      urdu: `Javed Press یہ services کرتا ہے: ${websiteFacts.services}. یہاں printing, packaging, design, website, e-commerce اور social media creatives کا کام ہوتا ہے۔`,
    },
    quote: {
      english: "For a quote, share product type, quantity, paper or size, finishing and deadline through the contact form or WhatsApp.",
      hinglish: "Quote ke liye product type, quantity, paper/size, finishing aur deadline bhej dein. Contact form ya WhatsApp dono use kar sakte hain.",
      hindi: "Quote के लिए product type, quantity, paper/size, finishing और deadline भेज दें। Contact form या WhatsApp दोनों use कर सकते हैं।",
      urdu: "Quote کے لیے product type, quantity, paper/size, finishing اور deadline بھیج دیں۔ Contact form یا WhatsApp دونوں use کر سکتے ہیں۔",
    },
    founder: {
      english: `${websiteFacts.founder} founded Javed Press in ${websiteFacts.started}. ${websiteFacts.nextGeneration} is carrying the next generation forward.`,
      hinglish: `${websiteFacts.founder} ne Javed Press ko ${websiteFacts.started} mein start kiya tha. ${websiteFacts.nextGeneration} next generation ke roop mein kaam seekh aur aage badha rahe hain.`,
      hindi: `${websiteFacts.founder} ने Javed Press को ${websiteFacts.started} में शुरू किया था। ${websiteFacts.nextGeneration} next generation के रूप में काम आगे बढ़ा रहे हैं।`,
      urdu: `${websiteFacts.founder} نے Javed Press کو ${websiteFacts.started} میں شروع کیا تھا۔ ${websiteFacts.nextGeneration} next generation کے طور پر کام آگے بڑھا رہے ہیں۔`,
    },
    training: {
      english: "Javed Press also mentors students and aspiring designers/developers with practical industry guidance at no cost.",
      hinglish: "Javed Press students, designers aur developers ko practical industry guidance free mein deta hai.",
      hindi: "Javed Press students, designers और developers को practical industry guidance free में देता है।",
      urdu: "Javed Press students, designers اور developers کو practical industry guidance free میں دیتا ہے۔",
    },
    fallback: {
      english: `I can answer about Javed Press services, address, timing, contact, quote, founder, website creator, map, delivery and design/printing work. This site is ${websiteFacts.domain}.`,
      hinglish: `Main Javed Press website ke baare mein answer de sakta hoon: services, address, timing, contact, quote, founder, website kisne banayi, map, delivery aur printing/design work. Website: ${websiteFacts.domain}.`,
      hindi: `मैं Javed Press website के बारे में answer दे सकता हूँ: services, address, timing, contact, quote, founder, website किसने बनाई, map, delivery और printing/design work. Website: ${websiteFacts.domain}.`,
      urdu: `میں Javed Press website کے بارے میں answer دے سکتا ہوں: services, address, timing, contact, quote, founder, website کس نے بنائی، map, delivery اور printing/design work. Website: ${websiteFacts.domain}.`,
    },
  };
  return answers[key][style] || answers[key].english;
}

function getBotAnswer(rawQuestion) {
  const question = rawQuestion.toLowerCase();
  const style = detectReplyStyle(rawQuestion);
  if (question.includes("kisne") || question.includes("banayi") || question.includes("banaya") || question.includes("created") || question.includes("creator") || question.includes("developer") || question.includes("designer") || question.includes("किसने") || question.includes("بنائی")) return formatAnswer(style, "creator");
  if (question.includes("address") || question.includes("location") || question.includes("map") || question.includes("kahan") || question.includes("kahaan") || question.includes("पता") || question.includes("کہاں")) return formatAnswer(style, "address");
  if (question.includes("time") || question.includes("timing") || question.includes("open") || question.includes("band") || question.includes("hours") || question.includes("समय") || question.includes("وقت")) return formatAnswer(style, "hours");
  if (question.includes("phone") || question.includes("number") || question.includes("call") || question.includes("whatsapp") || question.includes("email") || question.includes("mail") || question.includes("contact") || question.includes("नंबर") || question.includes("رابط")) return formatAnswer(style, "contact");
  if (question.includes("service") || question.includes("printing") || question.includes("design") || question.includes("website") || question.includes("packaging") || question.includes("book") || question.includes("card") || question.includes("banner") || question.includes("poster") || question.includes("काम") || question.includes("سروس")) return formatAnswer(style, "services");
  if (question.includes("quote") || question.includes("rate") || question.includes("price") || question.includes("cost") || question.includes("estimate") || question.includes("kitna") || question.includes("कीमत") || question.includes("قیمت")) return formatAnswer(style, "quote");
  if (question.includes("founder") || question.includes("owner") || question.includes("javed") || question.includes("junaid") || question.includes("founded") || question.includes("start") || question.includes("शुरू") || question.includes("مالک")) return formatAnswer(style, "founder");
  if (question.includes("student") || question.includes("training") || question.includes("mentor") || question.includes("learn") || question.includes("सीख") || question.includes("تعلیم")) return formatAnswer(style, "training");
  return formatAnswer(style, "fallback");
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Assalamualaikum! Javed Press ke baare mein kuch bhi poochiye." }
  ]);

  const addQuestion = (text) => {
    setMessages((current) => [...current, { from: "user", text }, { from: "bot", text: getBotAnswer(text) }]);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const text = input.trim();
    if (!text) return;
    addQuestion(text);
    setInput("");
  };

  const startVoice = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceStatus("Mic is browser mein supported nahin hai. Please Chrome use karein.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "hi-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => {
      setListening(true);
      setVoiceStatus("Listening...");
    };
    recognition.onerror = () => {
      setListening(false);
      setVoiceStatus("Mic se awaaz clear nahin mili. Dobara try karein.");
    };
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const text = event.results?.[0]?.[0]?.transcript?.trim();
      if (!text) return;
      setInput("");
      setVoiceStatus("");
      addQuestion(text);
    };
    recognition.start();
  };

  return <div className={open ? "chatbot open" : "chatbot"}>
    {open && <section className="chatbot-panel" aria-label="Javed Press chatbot">
      <div className="chatbot-head">
        <div><b>Javed Press Assistant</b><span>Type ya mic se poochiye</span></div>
        <button type="button" aria-label="Close chatbot" onClick={() => setOpen(false)}><X/></button>
      </div>
      <div className="chatbot-messages">
        {messages.map((message, index) => <p className={message.from} key={`${message.from}-${index}`}>{message.text}</p>)}
      </div>
      <form className="chatbot-form" onSubmit={sendMessage}>
        <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Address, timing, website creator..." />
        <button className={listening ? "mic listening" : "mic"} type="button" aria-label="Ask with microphone" onClick={startVoice}><Microphone/></button>
        <button type="submit" aria-label="Send message"><PaperPlaneTilt/></button>
      </form>
      {voiceStatus && <p className="chatbot-status">{voiceStatus}</p>}
    </section>}
    <button className="chatbot-launch" type="button" onClick={() => setOpen(!open)} aria-label="Open Javed Press chatbot">
      <img src={`${A}javed-chatbot-mascot.png`} alt="Javed Press chatbot assistant"/>
      <span>Ask me</span>
    </button>
  </div>;
}

function AppLayout() {
  return <div><FaviconSync/><IntroSplash/><HoverSound/><ScrollTop/><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<AboutRich/>}/><Route path="/services" element={<Services/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<Home/>}/></Routes></main><Chatbot/><a className="whatsapp-float" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Chat with Javed Press on WhatsApp"><Phone weight="fill"/></a><Footer/></div>;
}

export function App() { return <BrowserRouter basename={basePath}><AppLayout/></BrowserRouter>; }
