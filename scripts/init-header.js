function initHeader() {
  const root = document.querySelector(':root')
  const hideClass = 'hidden'

  // --- "toggle light / dark mode" listeners
  const toggleModeButtons = document.querySelectorAll('.light-mode-toggle')
  let darkMode = window.matchMedia?.('(prefers-color-scheme:light)').matches

  const toggleLightMode = () => root?.classList.toggle('light', (darkMode = !darkMode))

  toggleLightMode()
  toggleModeButtons.forEach(elem => elem.addEventListener('click', toggleLightMode))

  // --- add "hide" class to all menus
  const menus = document.querySelectorAll('.menu')
  menus.forEach(elem => elem.classList.add(hideClass))

  // --- "close menu" listeners
  const closeButtons = document.querySelectorAll('.close-menu-bttn')
  const hideParent = ev => ev.currentTarget?.parentElement?.classList.add(hideClass)

  closeButtons.forEach(elem => elem.addEventListener('click', hideParent))

  // --- "open mobile menu" listener
  const mobileMenuBttn = document.querySelector('#mobile-menu-bttn')
  const mobileMenu = document.querySelector('#mobile-menu')
  const openMobileMenu = () => mobileMenu?.classList.remove(hideClass)

  mobileMenuBttn?.addEventListener('click', openMobileMenu)

  // --- "go to event page" listeners
  const newEventButtons = document.querySelectorAll('.new-event-bttn')
  const goToEventPage = () => (window.location.href = '/event')

  newEventButtons.forEach(elem => elem.addEventListener('click', goToEventPage))

  // --- "export data (to pdf)" listeners
  const exportDataButtons = document.querySelectorAll('.export-data-bttn')

  function exportData() {
    const root = document.querySelector(':root')
    const wasDarkMode = !root.classList.contains('light')

    // pages will print with white background, so we enable light mode for a moment
    if (wasDarkMode) root.classList.add('light')

    window.print()

    // if the user was in dark mode before, turn off light mode now
    if (wasDarkMode) root.classList.remove('light')
  }

  exportDataButtons.forEach(elem => elem.addEventListener('click', exportData))
}

window.addEventListener('load', initHeader)
