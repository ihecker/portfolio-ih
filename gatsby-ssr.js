/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ pathname, setHtmlAttributes }) => {
  const isEnglish = pathname === `/en` || pathname.startsWith(`/en/`)
  setHtmlAttributes({ lang: isEnglish ? `en` : `fr` })
}
