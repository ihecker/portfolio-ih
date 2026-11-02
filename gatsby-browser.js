/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// Self-hosted fonts (no request to Google): only the weights the CSS uses.
// Latin subset only; font-display: swap is the fontsource default.
import "@fontsource/poppins/latin-600.css"
import "@fontsource/poppins/latin-700.css"
import "@fontsource-variable/open-sans/wght.css"

// The server sets <html lang> on the first render only. Client-side
// navigation between the French and English pages would otherwise leave the
// previous language in place, which screen readers announce with the wrong
// pronunciation. Keep it in step with the page the visitor is on.
export const onRouteUpdate = ({ location }) => {
  const isEnglish = /^\/en(\/|$)/.test(location.pathname)
  document.documentElement.lang = isEnglish ? "en" : "fr"
}
