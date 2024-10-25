import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface PaletteColor {
    darker?: string
    lighter?: string
  }
  interface SimplePaletteColorOptions {
    darker?: string
    lighter?: string
  }
}
