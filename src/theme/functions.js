import { THEME_APP_ATTRIBUTE, THEME_STORAGE_KEY, themesEnum } from '@/theme'

export function isThemeValid(themeName) {
  const themes = Object.values(themesEnum)
  return themes.includes(themeName)
}

export function setTheme(themeName) {
  const theme = isThemeValid(themeName) ? themeName : themesEnum.LIGHT
  const app = document.querySelector('#app')

  app.setAttribute(THEME_APP_ATTRIBUTE, theme)
  storeTheme(theme)
}

export function storeTheme(themeName) {
  localStorage.setItem(THEME_STORAGE_KEY, themeName)
}

export function getStoredTheme() {
  return localStorage.getItem(THEME_STORAGE_KEY)
}

export function isUserSystemDarkThemeActive() {
  return window.matchMedia('prefers-color-scheme: dark').matches
}

export function initTheme() {
  const theme = getStoredTheme()
  const isThemeAlreadyStored = Boolean(theme)

  if (isThemeAlreadyStored) {
    setTheme(theme)
    return
  }

  if (isUserSystemDarkThemeActive()) {
    setTheme(themesEnum.DARK)
    return
  }

  setTheme(themesEnum.LIGHT)
}

export function getCurrentTheme() {
  return getStoredTheme() || themesEnum.LIGHT
}
