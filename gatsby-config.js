/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Irwin Hecker | Portfolio`,
    description: `Irwin Hecker : données, code et science. Projets, publications scientifiques et contact.`,
    author: `@ihecker`,
    siteUrl: `https://irwinhecker.com`,
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Irwin Hecker | Portfolio`,
        short_name: `Irwin Hecker`,
        start_url: `/`,
        background_color: `#1b263b`,
        theme_color: `#1b263b`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
