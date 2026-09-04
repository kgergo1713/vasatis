import './vasatis.css'
import './theme.css'
import hu from './i18n/hu.json'
import en from './i18n/en.json'

const requestedRoute = new URLSearchParams(location.search).get('route')
const sitePath = requestedRoute || location.pathname.replace(import.meta.env.BASE_URL.replace(/\/$/, ''), '') || '/'

if (sitePath === '/') {
  await import('./app.js')
} else {
  const locales = { hu, en }
  const language = localStorage.getItem('vasatis.language') || 'hu'
  const theme = localStorage.getItem('vasatis.theme') || 'light'
  const text = locales[language]
  const description = document.querySelector('meta[name="description"]')
  const canonical = document.querySelector('link[rel="canonical"]')
  const openGraph = {
    title: document.querySelector('meta[property="og:title"]'),
    description: document.querySelector('meta[property="og:description"]'),
    url: document.querySelector('meta[property="og:url"]')
  }
  const pageKey = sitePath.split('/').filter(Boolean)[0]
  const pages = {
    maganszemelyeknek: language === 'hu' ? ['Magánszemélyeknek', 'Kerítések, kapuk, korlátok, lépcsők és egyedi fémszerkezetek otthonokhoz.', ['Kerítések és kapuk', 'Korlátok és lépcsők', 'Előtetők és árnyékolók', 'Egyedi fémszerkezetek', 'Bővítések és átalakítások', 'Javítás és karbantartás']] : ['For residents', 'Fences, gates, railings, stairs and bespoke metal structures for homes.', ['Fences and gates', 'Railings and stairs', 'Canopies and shades', 'Bespoke metalwork', 'Extensions and alterations', 'Repairs and maintenance']],
    vallalatoknak: language === 'hu' ? ['Vállalati megoldások', 'Tartós és nagy teherbírású fémszerkezeti megoldások ipari és üzleti környezetbe.', ['Ipari kerítések és kordonok', 'Ipari kapuk és tolókapuk', 'Ipari lépcsők és járóhidak', 'Egyedi ipari fémszerkezetek', 'Egyedi megoldások', 'Átlátható árazás', 'Megbízható kivitelezés', 'Minőségi anyaghasználat']] : ['Business solutions', 'Durable, high-load metal structures for industrial and business environments.', ['Industrial fences and barriers', 'Industrial gates', 'Industrial stairs and walkways', 'Bespoke industrial structures', 'Custom solutions', 'Transparent pricing', 'Reliable execution', 'Quality materials']],
    projektek: language === 'hu' ? ['Referenciáink', 'Megvalósult ipari és lakossági fémszerkezeti munkáink válogatása.', ['Ipari kerítés', 'Ipari lépcső és átjáró', 'Lézervágott feliratok', 'Kültéri tároló', 'Fém raklap', 'Trapézlemez kerítés', 'Kovácsoltvas jellegű kapu', 'Korlátok és felüljárók']] : ['Our projects', 'A selection of completed residential and industrial metalworking projects.', ['Industrial fence', 'Industrial stairs and walkway', 'Laser-cut signs', 'Outdoor storage', 'Metal pallets', 'Trapezoidal sheet fencing', 'Forged-style gates', 'Railings and walkways']],
    'aluminium-kerites': language === 'hu' ? ['Alumínium kerítések', 'Modern, elegáns és hosszú távon karbantartásmentes kerítések és kapuk.', ['Alumínium kerítések', 'Anyag és kivitel', 'Automatizálás', 'Komplett kivitelezés', 'Miért alumínium kerítés?']] : ['Aluminium fences', 'Modern, elegant and low-maintenance fences and gates for the long term.', ['Aluminium fences', 'Material and construction', 'Automation', 'Complete delivery', 'Why aluminium fencing?']],
    'gyakori-kerdesek': language === 'hu' ? ['Gyakori kérdések', 'Válaszok a kapukkal, kerítésekkel és egyedi fémszerkezetekkel kapcsolatos fontos kérdésekre.', ['Milyen kaput érdemes választani?', 'Mennyi idő alatt készül el egy egyedi kapu vagy kerítés?', 'Hol készülnek a kapuk és kerítések?', 'Milyen kerítés a legjobb hosszú távra?', 'Alumínium, acél vagy fa és kő kerítés, melyik a jobb?', 'Mitől függ egy kerítés vagy kapu ára?', 'Hogyan történik a szállítás és telepítés?', 'Hogyan kell karbantartani a fém kerítéseket és kapukat?', 'Tud segíteni a VasAtis bővítésben vagy átalakításban?', 'Vállalja-e a VasAtis a kapuk eseti javítását?']] : ['Frequently asked questions', 'Answers to common questions about gates, fences and bespoke metal structures.', ['Which gate should I choose?', 'How long does a custom gate or fence take?', 'Where are gates and fences made?', 'What fence is best for the long term?', 'Aluminium, steel, wood or stone fence: which is best?', 'What does a gate or fence price depend on?', 'How do delivery and installation work?', 'How should metal fences and gates be maintained?', 'Can VasAtis help extend or alter existing metalwork?', 'Does VasAtis undertake occasional gate repairs?']],
    'adatvedelmi-tajekoztato': language === 'hu' ? ['Adatvédelmi tájékoztató', 'A VasAtis Kft. személyesadat-kezelésével kapcsolatos tájékoztatás.', ['E-mailes megkeresések adatai', 'Az adatkezelés célja és jogalapja', 'Megőrzési idő és adattovábbítás', 'Az érintettek jogai és kapcsolat']] : ['Privacy notice', 'Information on how VasAtis Ltd. processes personal data.', ['Data from email inquiries', 'Purpose and legal basis', 'Retention and data sharing', 'Your rights and contact']],
    kapcsolat: []
  }
  const contact = language === 'hu' ? ['VasAtis elérhetőségek', 'Lépjen kapcsolatba velünk műszaki egyeztetéshez és ajánlatkéréshez.'] : ['Contact VasAtis', 'Contact us for a technical consultation and a quote.']
  const faqAnswers = language === 'hu' ? [
    ['Milyen kaput érdemes választani?', 'A választásnál a használat gyakorisága, a nyílás mérete, az automatika, a biztonság és az ingatlan stílusa is számít. Családi házakhoz gyakran az egyedi méretre gyártott acél vagy alumínium kapu a jó megoldás.'],
    ['Mennyi idő alatt készül el egy egyedi kapu vagy kerítés?', 'A gyártási és kivitelezési idő a projekt méretétől, bonyolultságától, anyagválasztásától és a jelenlegi kapacitástól függ. Pontos határidőt minden esetben a helyszíni felmérés után tudunk adni.'],
    ['Hol készülnek a kapuk és kerítések?', 'Kisebb szerkezeteink a saját műhelyünkben készülnek, a nagyobb szerkezeteket pedig a helyszínen telepítjük.'],
    ['Milyen kerítés a legjobb hosszú távra?', 'Az alumínium kerítés különösen jó választás a tartóssága, időjárásállósága és minimális karbantartási igénye miatt. A végleges megoldást mindig a helyszín és az elvárt funkció alapján választjuk ki.'],
    ['Alumínium, acél vagy fa és kő kerítés, melyik a jobb?', 'A fém kerítés előnye a tartósság, a stabil szerkezet, a pontos méretre gyártás és az alacsonyabb karbantartási igény. Az ideális anyagot a kívánt megjelenés, a terhelés és a költségkeret alapján egyeztetjük.'],
    ['Mitől függ egy kerítés vagy kapu ára?', 'Az árat elsősorban a méret, az anyaghasználat, a felületkezelés, a szerkezeti kialakítás és a telepítési körülmények befolyásolják. Automatika és egyedi beépített elemek is módosíthatják a műszaki tartalmat.'],
    ['Hogyan történik a szállítás és telepítés?', 'A kész szerkezeteket a projekt jellegéhez igazodva szállítjuk ki, majd előre egyeztetett időpontban szereljük be a helyszínen.'],
    ['Hogyan kell karbantartani a fém kerítéseket és kapukat?', 'Az acél- és alumíniumszerkezeteknél a rendszeres tisztítás és a mozgó alkatrészek időszakos ellenőrzése javasolt. Kapuknál a zsanérokat és az automatikát is érdemes felülvizsgálni.'],
    ['Tud segíteni a VasAtis bővítésben vagy átalakításban?', 'Igen. Vállalunk meglévő fémszerkezetek bővítését, átalakítását, javítását és szükség esetén megerősítését is.'],
    ['Vállalja-e a VasAtis a kapuk eseti javítását?', 'Az esetleges javítási igényekre is igyekszünk megoldást adni, különösen sérülés vagy nagyobb külső behatás utáni helyreállítás esetén.']
  ] : [
    ['Which gate should I choose?', 'The right choice depends on use frequency, opening size, automation, safety and the property style. Custom-made steel or aluminium gates are often a good fit for homes.'],
    ['How long does a custom gate or fence take?', 'Production and installation time depend on project size, complexity, material selection and current capacity. We provide an accurate estimate after the site survey.'],
    ['Where are gates and fences made?', 'Smaller structures are produced in our workshop, while larger structures are installed on site.'],
    ['What fence is best for the long term?', 'Aluminium fencing is especially durable, weather-resistant and low-maintenance. The final solution is selected for the site and required function.'],
    ['Aluminium, steel, wood or stone fence: which is best?', 'Metal fencing offers durability, structural stability, exact sizing and lower maintenance. The ideal material is selected according to appearance, load and budget.'],
    ['What does a gate or fence price depend on?', 'Price is primarily influenced by dimensions, materials, surface treatment, structure and installation conditions. Automation and bespoke components can also affect the scope.'],
    ['How do delivery and installation work?', 'Completed structures are delivered for the specific project and installed on site at a pre-agreed time.'],
    ['How should metal fences and gates be maintained?', 'Regular cleaning and periodic checking of moving parts is recommended. For gates, hinges and automation should also be reviewed.'],
    ['Can VasAtis help extend or alter existing metalwork?', 'Yes. We undertake extensions, alterations, repairs and reinforcement of existing metal structures.'],
    ['Does VasAtis undertake occasional gate repairs?', 'We aim to help with repair needs, especially after damage or significant external impact.']
  ]
  const data = pageKey === 'kapcsolat' ? contact : (pages[pageKey] || (language === 'hu' ? ['Az oldal átalakítás alatt', 'Hamarosan elérhető.', []] : ['This page is being migrated', 'Available soon.', []]))
  const metadata = {
    maganszemelyeknek: ['Fémipari szolgáltatások magánszemélyeknek | VasAtis Kft.', 'Kerítések, kapuk, korlátok, lépcsők és egyedi fémszerkezetek lakossági kivitelezéshez.'],
    vallalatoknak: ['Fémipari megoldások vállalatoknak | VasAtis Kft.', 'Egyedi fémipari gyártás és kivitelezés vállalatoknak: ipari szerkezetek, kerítések és korlátok nagy projektekhez.'],
    projektek: ['Referenciák és fémipari projektek | VasAtis Kft.', 'VasAtis referenciák és elkészült munkák: egyedi kerítések, korlátok és acélszerkezetek lakossági és ipari projektekhez.'],
    'aluminium-kerites': ['Alumínium kerítés gyártás és kivitelezés | VasAtis Kft.', 'Egyedi alumínium kerítések és kapuk pontos tervezéssel, gyártással és kivitelezéssel.'],
    'gyakori-kerdesek': ['Gyakori kérdések | VasAtis Kft.', 'Válaszok kapukkal, kerítésekkel és egyedi fémszerkezetekkel kapcsolatos gyakori kérdésekre.'],
    kapcsolat: ['Kapcsolat, ajánlatkérés és elérhetőség | VasAtis Kft.', 'Vegye fel a kapcsolatot a VasAtis Kft.-vel fémipari műszaki egyeztetéshez és ajánlatkéréshez.'],
    'adatvedelmi-tajekoztato': ['Adatvédelmi tájékoztató | VasAtis Kft.', 'A VasAtis Kft. személyesadat-kezelésével kapcsolatos tájékoztatás.']
  }[pageKey] || [data[0], data[1]]
  const referenceImages = [
    'Vasatis_ipari_femszerkezetek_magyar_epitoipar_gyarberendezes_gyartosor.jpg',
    'Vasatis_ipari_lepcso_walkway_magyar_vas_kek_festett_2026.jpg',
    'Vasatis_lezervagott_inscript_feliratozas_Teller_pince_.jpg',
    'Vasatis_kulteri_tartolo_garazs_raktar_2026.jpeg',
    'Vasatis_vas_paletta_metal_fem_raklap_magyar_2026.jpeg',
    'Vasatis_trapez_kerites_fem_kerites_magyar_2026.jpg',
    'Vasatis_vaskapu_kovacsolt_kapu_magyarkapu_magyarorszag_2026.jpg',
    'Vasatis_pince_korlat_kovacsolt_vas_magyar_2026.jpg'
  ]
  document.documentElement.lang = language
  document.documentElement.dataset.theme = theme
  document.title = metadata[0]
  description.content = metadata[1]
  canonical.href = `https://vasatis.com/${pageKey ? `${pageKey}/` : ''}`
  openGraph.title.content = metadata[0]
  openGraph.description.content = metadata[1]
  openGraph.url.content = canonical.href
  const content = pageKey === 'kapcsolat'
    ? `<section class="page-content contact-details"><div><h2>${language === 'hu' ? 'Elérhetőségek' : 'Contact details'}</h2><a href="tel:+36209807743">+36 20 980 7743</a><a href="tel:+36203799048">+36 20 379 9048</a><a href="mailto:vasatis@vasatis.com">vasatis@vasatis.com</a></div><div><h2>${language === 'hu' ? 'Ajánlatkérés' : 'Request a quote'}</h2><p>${text.contact.copy}</p><a class="button" href="mailto:vasatis@vasatis.com?subject=${encodeURIComponent(text.contact.emailSubject)}&body=${text.contact.emailBody}">${text.contact.button}</a></div></section>`
    : pageKey === 'gyakori-kerdesek'
      ? `<section class="page-content faq-list">${faqAnswers.map(([question, answer], index) => `<details><summary><span>${String(index + 1).padStart(2, '0')}</span>${question}</summary><p>${answer}</p></details>`).join('')}</section>`
      : `<section class="page-content page-grid ${pageKey === 'projektek' ? 'project-grid' : ''}">${data[2].map((item, index) => `<article>${pageKey === 'projektek' ? `<img src="/assets/${referenceImages[index]}" alt="${item}">` : ''}<div><p class="eyebrow">0${index + 1}</p><h2>${item}</h2><p>${data[1]}</p></div></article>`).join('')}</section>`
  document.querySelector('#app').innerHTML = `<header class="site-header"><a class="brand" href="/" aria-label="VasAtis"><img src="/assets/vasatis-logo.svg" alt="VasAtis"></a><nav>${text.navigation.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}</nav></header><main><section class="page-hero"><p class="eyebrow">VASATIS KFT.</p><h1>${data[0]}</h1><p>${data[1]}</p></section>${content}</main><footer><p>${text.footer.summary}</p><p>${text.footer.address}</p></footer>`
  document.querySelectorAll('a[href^="/"], img[src^="/assets/"]').forEach((element) => { const attribute = element.tagName === 'IMG' ? 'src' : 'href'; element.setAttribute(attribute, `${import.meta.env.BASE_URL}${element.getAttribute(attribute).slice(1)}`) })
  document.querySelector('.site-header').insertAdjacentHTML('beforeend', `<div class="header-controls"><button class="theme" type="button" aria-label="${text.controls.theme}" title="${text.controls.theme}">${theme === 'light' ? 'D' : 'L'}</button><button class="language" type="button" aria-label="${text.controls.language}">${language === 'hu' ? 'EN' : 'HU'}</button></div>`)
  document.querySelector('.language').addEventListener('click', () => { localStorage.setItem('vasatis.language', language === 'hu' ? 'en' : 'hu'); location.reload() })
  document.querySelector('.theme').addEventListener('click', () => { localStorage.setItem('vasatis.theme', theme === 'light' ? 'dark' : 'light'); location.reload() })
}