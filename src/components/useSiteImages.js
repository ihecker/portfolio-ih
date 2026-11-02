import { useStaticQuery, graphql } from "gatsby"

/**
 * Every image in src/images, processed at build time by gatsby-plugin-image
 * into the sizes the home page actually displays (WebP + fallback, srcset,
 * lazy loading, placeholder). Keyed by file name, e.g. "these_image.jpg".
 *
 * Variants:
 * - avatar: the round portrait (displayed at 200px, 160px on phones)
 * - card:   small project cards (120px tall, ~240px wide)
 * - wide:   the featured card banner (120px tall, up to ~800px wide)
 * - photo:  carousel photos, cropped 4:3 (up to ~470px wide on desktop,
 *           full width on phones)
 */
export const useSiteImages = () => {
  const data = useStaticQuery(graphql`
    query SiteImages {
      allFile(
        filter: {
          sourceInstanceName: { eq: "images" }
          extension: { in: ["jpg", "jpeg", "png"] }
        }
      ) {
        nodes {
          relativePath
          childImageSharp {
            avatar: gatsbyImageData(
              width: 200
              aspectRatio: 1
              layout: CONSTRAINED
              placeholder: BLURRED
              transformOptions: { cropFocus: CENTER }
            )
            card: gatsbyImageData(
              width: 480
              layout: CONSTRAINED
              placeholder: DOMINANT_COLOR
            )
            wide: gatsbyImageData(
              width: 900
              layout: CONSTRAINED
              placeholder: DOMINANT_COLOR
            )
            photo: gatsbyImageData(
              width: 800
              aspectRatio: 1.3333
              layout: CONSTRAINED
              placeholder: BLURRED
              transformOptions: { cropFocus: CENTER }
            )
          }
        }
      }
    }
  `)

  return Object.fromEntries(
    data.allFile.nodes
      .filter(node => node.childImageSharp)
      .map(node => [node.relativePath, node.childImageSharp])
  )
}
