import './vasatis.css'
import './theme.css'
import hu from './i18n/hu.json'
import en from './i18n/en.json'

const locales = { hu, en }
const app = document.querySelector('#app')
const description = document.querySelector('meta[name="description"]')
const canonical = document.querySelector('link[rel="canonical"]')
const openGraph = {
  title: document.querySelector('meta[property="og:title"]'),
  description: document.querySelector('meta[property="og:description"]'),
  url: document.querySelector('meta[property="og:url"]')
}
let language = localStorage.getItem('vasatis.language') || (navigator.language.startsWith('hu') ? 'hu' : 'en')
let theme = localStorage.getItem('vasatis.theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')

function emailLink(text) {
  return `mailto:vasatis@vasatis.com?subject=${encodeURIComponent(text.contact.emailSubject)}&body=${text.contact.emailBody}`
}

function render() {
  const text = locales[language]
  document.documentElement.lang = language
  document.documentElement.dataset.theme = theme
  document.title = text.meta.title
  description.content = text.meta.description
  canonical.href = 'https://vasatis.com/'
  openGraph.title.content = text.meta.title
  openGraph.description.content = text.meta.description
  openGraph.url.content = canonical.href
  app.innerHTML = `<header class="site-header"><a class="brand" href="/" aria-label="VasAtis"><img src="/assets/vasatis-logo.svg" alt="VasAtis"></a><nav>${text.navigation.map((item) => `<a href="${item.href}">${item.label}</a>`).join('')}</nav><div class="header-controls"><button class="theme" type="button" aria-label="${text.controls.theme}" title="${text.controls.theme}">${theme === 'light' ? 'D' : 'L'}</button><button class="language" type="button" aria-label="${text.controls.language}">${language === 'hu' ? 'EN' : 'HU'}</button></div></header><main><section class="hero"><div class="hero-copy"><p class="eyebrow">${text.hero.eyebrow}</p><h1>${text.hero.title}</h1><p>${text.hero.intro}</p><div class="actions"><a class="button" href="${emailLink(text)}">${text.hero.quote}</a><a class="text-link" href="#services">${text.hero.work}</a></div></div><div class="hero-image"><img src="/assets/team.jpg" alt="${text.hero.imageAlt}"></div></section><section class="about"><div><p class="eyebrow">${text.about.eyebrow}</p><h2>${text.about.title}</h2></div><p>${text.about.copy}</p></section><section class="services" id="services"><h2>${text.services.title}</h2><div class="service-grid"><article><img src="/assets/residential.jpg" alt="${text.services.residential.imageAlt}"><div><p class="eyebrow">01</p><h3>${text.services.residential.title}</h3><p>${text.services.residential.copy}</p><a href="/maganszemelyeknek/">${text.services.details}</a></div></article><article><img src="/assets/industrial.jpg" alt="${text.services.industrial.imageAlt}"><div><p class="eyebrow">02</p><h3>${text.services.industrial.title}</h3><p>${text.services.industrial.copy}</p><a href="/vallalatoknak/">${text.services.details}</a></div></article></div></section><section class="contact" id="contact"><p class="eyebrow">${text.contact.eyebrow}</p><h2>${text.contact.title}</h2><p>${text.contact.copy}</p><a class="button" href="${emailLink(text)}">${text.contact.button}</a><div class="contact-lines"><a href="tel:+36209807743">+36 20 980 7743</a><a href="tel:+36203799048">+36 20 379 9048</a><a href="mailto:vasatis@vasatis.com">vasatis@vasatis.com</a></div></section></main><footer><p>${text.footer.summary}</p><p>${text.footer.address}</p></footer>`
  app.querySelectorAll('a[href^="/"], img[src^="/assets/"]').forEach((element) => {
    const attribute = element.tagName === 'IMG' ? 'src' : 'href'
    element.setAttribute(attribute, `${import.meta.env.BASE_URL}${element.getAttribute(attribute).slice(1)}`)
  })
  document.querySelector('.language').addEventListener('click', () => { language = language === 'hu' ? 'en' : 'hu'; localStorage.setItem('vasatis.language', language); render() })
  document.querySelector('.theme').addEventListener('click', () => { theme = theme === 'light' ? 'dark' : 'light'; localStorage.setItem('vasatis.theme', theme); render() })
}

render()