import * as React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import "../styles/style.css"

// Gatsby builds a single 404 page and serves it for every unknown URL,
// in both languages. Its content must not depend on the URL (the server
// HTML and the browser render would disagree), so it speaks both.
const NotFoundPage = () => (
  <Layout>
    <section className="hero notFound">
      <h1>Oups, cette page n’existe pas</h1>
      <p className="hero-tagline">
        Le lien est peut-être ancien, ou l’adresse contient une faute de
        frappe.
      </p>
      <p className="hero-tagline" lang="en">
        Oops, this page doesn’t exist. The link may be outdated, or the
        address may contain a typo.
      </p>
      <div className="contactSection">
        <Link to="/" className="contactButton">
          Retour à l’accueil
        </Link>
        <Link
          to="/en/"
          lang="en"
          className="contactButton contactButton--secondary"
        >
          Back to the home page
        </Link>
      </div>
    </section>
  </Layout>
)

export const Head = () => <Seo title="Page introuvable · Page not found" />

export default NotFoundPage
