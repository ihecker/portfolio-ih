import * as React from "react";
import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import "../../styles/style.css";
import {
  FaLinkedin,
  FaGithub,
  FaOrcid,
  FaRegFile,
  FaRegEnvelope,
  FaChevronLeft,
  FaChevronRight,
  FaRegClock,
  FaRegFolderOpen,
  FaRegNewspaper,
  FaHeart,
  FaRegImage,
  FaExternalLinkAlt,
  FaFileAlt,
} from "react-icons/fa";
import tableau_species_tracker_link from "../../images/tableau_species_tracker_link.png";
import powerbi_dashboard_link from "../../images/powerbi_dashboard_link.png";
import { Link, useStaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { useSiteImages } from "../../components/useSiteImages";
import ScrollSlider from "../../components/ScrollSlider";

// Carousel Component
const ImageCarousel = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Swipe: a mostly-horizontal drag of 40px or more changes photo;
  // vertical drags are left to the page scroll.
  const touchStart = React.useRef(null);
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    if (!touchStart.current || images.length < 2) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touchStart.current.x;
    const dy = t.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    if (dx < 0) goToNext();
    else goToPrevious();
  };

  const siteImages = useSiteImages();
  const current = siteImages[images[currentIndex]]?.photo;

  return (
    <div
      className="carousel-container"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {current && (
        <GatsbyImage
          key={images[currentIndex]}
          image={current}
          alt={
            images.length > 1
              ? `${alt}, photo ${currentIndex + 1} of ${images.length}`
              : alt
          }
          className="projectTopImage"
          objectFit="cover"
        />
      )}

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className="carousel-btn carousel-btn-left"
            aria-label={`Previous photo (${alt})`}
          >
            <FaChevronLeft aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={goToNext}
            className="carousel-btn carousel-btn-right"
            aria-label={`Next photo (${alt})`}
          >
            <FaChevronRight aria-hidden="true" />
          </button>

          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => goToSlide(index)}
                className={`carousel-dot ${
                  currentIndex === index ? "active" : ""
                }`}
                aria-label={`Show photo ${index + 1} of ${images.length}`}
                aria-current={currentIndex === index ? "true" : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Contact buttons (top and bottom of the page)
const ContactButtons = ({ label }) => (
  <div className="contactSection">
    <a href="mailto:contact@irwinhecker.com" className="contactButton">
      {label}
    </a>
    <a
      href="mailto:contact@irwinhecker.com"
      className="contactButton contactButton--secondary"
    >
      <FaRegEnvelope aria-hidden="true" /> contact@irwinhecker.com
    </a>
  </div>
);

// Links for professional resources
const links = [
  {
    text: "LinkedIn",
    url: "https://www.linkedin.com/in/ihecker",
    icon: <FaLinkedin />,
  },
  {
    text: "GitHub",
    url: "https://github.com/ihecker",
    icon: <FaGithub />,
  },
  {
    text: "ORCID",
    url: "https://orcid.org/0000-0002-5707-2799",
    icon: <FaOrcid />,
  },
];

const featured = [
  {
    name: "Portfolio",
    description: "The code behind this portfolio!",
    image: "portfolio_image.png",
    link: "https://github.com/ihecker/portfolio-ih",
    tags: ["Web dev", "React"],
  },
];

const projectsTop = [
  {
    name: "Youth Mental Health Workshop",
    description:
      "Harnessing collective intelligence to address mental health in a general and universal way",
    images: ["fresque_sante_mentale_image.jpg"],
    link: "https://www.nightline.fr/la-fresque-de-la-sante-mentale",
    tags: ["Training", "Workshop facilitation"],
  },
  {
    name: "JUMP IN TECH",
    description: "Reducing gender inequalities through computer programming",
    images: ["becomtech_image3.png", "becomtech_image2.jpg", "becomtech_image.png"],
    link: "https://becomtech.fr",
    tags: ["Training", "Workshop facilitation"],
  },
  {
    name: "My doctoral thesis",
    description:
      "Role of economic and social difficulties on mental health during the COVID-19 pandemic",
    images: ["these_image.jpg", "these_image2.jpg", "these_image3.jpg"],
    link: "https://theses.fr/2024SORUS387",
    tags: ["Research", "Biostatistics"],
  },
];

const projects = [
  {
    name: "lantrn",
    description: "R package: functions for more efficient analysis workflows",
    image: "lantrn_image.png",
    link: "https://github.com/ihecker/lantrn",
    tags: ["R dev"],
  },
  {
    name: "ShinyRtisan",
    description: "Shiny app to explore R/Shiny customizations",
    image: "rtisan_image.png",
    link: "https://ihecker.shinyapps.io/ShinyRtisan/",
    tags: ["R dev", "Shiny"],
  },
  {
    name: "RESPOND project",
    description:
      "Reducing mental health concerns resulting from the COVID-19 pandemic",
    image: "respond_image.png",
    link: "https://respond-project.eu/",
    tags: ["Data", "Coordination"],
  },
  {
    name: "COVerAGE database",
    description: "Global demographic database of COVID-19",
    image: "coverage_image.png",
    link: "https://www.coverage-db.org/",
    tags: ["Data", "Data management"],
  },
  {
    name: "Tableau dashboard: threatened species",
    description: "Screenshot: extinct and threatened species tracker",
    image: "tableau_species_tracker_image.png",
    link: tableau_species_tracker_link,
    screenshot: true,
    tags: ["Dataviz", "Tableau"],
  },
  {
    name: "Power BI dashboard: COVID-19",
    description: "Screenshot: top 10 countries by COVID-19 cases",
    image: "powerbi_dashboard_image.png",
    link: powerbi_dashboard_link,
    screenshot: true,
    tags: ["Dataviz", "Power BI"],
  },
];

// Turn one ORCID work summary into what the list needs.
// Returns null for malformed records instead of crashing the whole list.
const safeHttpUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.href
      : null;
  } catch {
    return null;
  }
};
// ORCID stores some journal names in capitals. Make them readable, keeping
// the usual lower-case words of titles.
const SMALL_WORDS = new Set(["of", "de", "du", "des", "la", "le", "les", "and", "et", "in", "on", "for", "the", "da", "di"]);
const titleCase = (text) => {
  if (!text || text !== text.toUpperCase()) return text;
  return text
    .toLowerCase()
    .split(" ")
    .map((word, i) =>
      i > 0 && SMALL_WORDS.has(word) ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};
const toPublication = (work) => {
  const title = work?.title?.title?.value?.trim();
  if (!title) return null;
  const doi = work["external-ids"]?.["external-id"]?.find(
    (id) => id["external-id-type"] === "doi"
  )?.["external-id-value"];
  return {
    title,
    journal: titleCase(work["journal-title"]?.value) || null,
    year: work["publication-date"]?.year?.value || null,
    url:
      safeHttpUrl(work.url?.value) ||
      (doi ? safeHttpUrl(`https://doi.org/${doi}`) : null),
  };
};

// Small icon by destination, so the repeated "Voir le projet" links are
// told apart at a glance. Decorative: the accessible name comes from the link.
const projectIcon = (project) => {
  if (project.screenshot) return <FaRegImage aria-hidden="true" />;
  if (project.link.includes("github.com")) return <FaGithub aria-hidden="true" />;
  if (project.link.includes("theses.fr")) return <FaFileAlt aria-hidden="true" />;
  return <FaExternalLinkAlt aria-hidden="true" />;
};

const IndexPage = () => {
  const siteImages = useSiteImages();
  // Build year comes from Gatsby's static data, so the server HTML and the
  // client render always agree (no hydration mismatch on New Year's Day).
  const { site } = useStaticQuery(graphql`
    query {
      site {
        buildTime(formatString: "YYYY")
      }
    }
  `);
  const [publications, setPublications] = useState([]);
  // "loading" | "ready" | "error"
  const [publicationsStatus, setPublicationsStatus] = useState("loading");

  useEffect(() => {
    // Abort on unmount, and give up after 8 s so the loading state
    // never hangs when ORCID is slow.
    const controller = new AbortController();
    let timedOut = false;
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, 8000);

    const fetchPublications = async () => {
      try {
        const response = await fetch(
          "https://pub.orcid.org/v3.0/0000-0002-5707-2799/works",
          {
            headers: { Accept: "application/json" },
            signal: controller.signal,
          }
        );
        if (!response.ok) throw new Error(`ORCID ${response.status}`);
        const data = await response.json();
        const works = (data.group || [])
          .map((group) => toPublication(group?.["work-summary"]?.[0]))
          .filter(Boolean)
          .sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0));
        setPublications(works);
        setPublicationsStatus("ready");
      } catch (error) {
        if (controller.signal.aborted && !timedOut) return; // unmounted
        console.error("Error fetching publications:", error);
        setPublicationsStatus("error");
      } finally {
        clearTimeout(timeout);
      }
    };
    fetchPublications();
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <Layout>
      <header className="header">
        <nav aria-label="Language">
          <Link to="/" hrefLang="fr" lang="fr"
            onClick={() => (document.documentElement.lang = "fr")}>
            FR
          </Link>
          <Link
            to="/en/"
            hrefLang="en" lang="en"
            onClick={() => (document.documentElement.lang = "en")}
            aria-current="page"
          >
            EN
          </Link>
        </nav>
      </header>
      <div className="main-content">
        <div className="textCenter">
          <section className="hero" aria-labelledby="hero-name">
            <GatsbyImage
              image={siteImages["me.jpeg"].avatar}
              alt=""
              className="profile-pic"
              loading="eager"
            />
            <h1 id="hero-name">Irwin Hecker</h1>
            <p className="hero-tagline">
              <span
                className="typing-effect"
                style={{ "--typing-steps": 31 }}
              >
                Data | Code | Science | Society
              </span>
            </p>
            <p className="hero-facts">Full-stack &amp; data developer · PhD in biostatistics · Based in Nantes</p>
            <p className="hero-intro">I make data and science understandable,<br />in workshops as in code.</p>

            <ContactButtons label="Contact me!" />

            <p className="hero-links">
              {links.map((link, i) => (
                <React.Fragment key={link.url}>
                  <a href={link.url} className="link">
                    {link.icon} {link.text}
                  </a>
                  {i !== links.length - 1 && <> · </>}
                </React.Fragment>
              ))}
            </p>
          </section>

          <section className="projectsTitle">
            <h2>
              <FaRegClock className="h2-icon" aria-hidden="true" />
              Ongoing projects
            </h2>

            <div className="featuredGrid">
              {featured.map((project, index) => (
                <div key={index} className="featuredCard">
                  <GatsbyImage
                    image={siteImages[project.image].wide}
                    alt=""
                    className="featuredImage"
                    objectFit="cover"
                    loading="eager"
                  />
                  <div className="featuredContent">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="featuredTags">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.cta || "View project"} ${project.name} (${project.screenshot ? "image, " : ""}opens in a new tab)`}
                      >
                        {projectIcon(project)}{" "}{project.cta || "View project"}
                      </a>
                    </div>
                    <div className="tagsContainer">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="featuredTag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="projectsTitle">
            <h2>
              <FaRegFolderOpen className="h2-icon" aria-hidden="true" />
              Projects
            </h2>

            <div className="projectsTopGrid">
              {projectsTop.map((project, index) => (
                <div key={index} className="projectTopCard">
                  <ImageCarousel images={project.images} alt={project.name} />
                  <div className="projectTopContent">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="projectTopTags">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.cta || "View project"} ${project.name} (${project.screenshot ? "image, " : ""}opens in a new tab)`}
                      >
                        {projectIcon(project)}{" "}{project.cta || "View project"}
                      </a>
                    </div>
                    <div className="tagsContainer">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="projectTag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="projectsGrid">
              {projects.map((project, index) => (
                <div key={index} className="projectCard">
                  <GatsbyImage
                    image={siteImages[project.image].card}
                    alt=""
                    className="projectImage"
                    objectFit="cover"
                  />
                  <div className="projectContent">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="projectTags">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.cta || "View project"} ${project.name} (${project.screenshot ? "image, " : ""}opens in a new tab)`}
                      >
                        {projectIcon(project)}{" "}{project.cta || "View project"}
                      </a>
                    </div>
                    <div className="tagsContainer">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="projectTag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="publicationsTitle">
            <h2>
              <FaRegNewspaper className="h2-icon" aria-hidden="true" />
              Scientific publications
            </h2>
            <p className="sr-only" role="status">
              {publicationsStatus === "error" && "Publications couldn’t be loaded from ORCID."}
              {publicationsStatus === "ready" &&
                `${publications.length} publications loaded from ORCID.`}
            </p>
            <div className="publications">
              <ScrollSlider
                label="Scientific publications, vertical scroll"
                prevLabel="Previous publications"
                nextLabel="Next publications"
                contentKey={`${publicationsStatus}-${publications.length}`}
              >
              <ul>
                {publicationsStatus === "loading" && (
                  <li className="publications-status">Loading publications from ORCID…</li>
                )}
                {publicationsStatus === "error" && (
                  <li className="publications-status">
                    Publications couldn’t be loaded from ORCID. You can browse
                    them directly on{" "}
                    <a
                      href="https://orcid.org/0000-0002-5707-2799"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      my ORCID profile
                    </a>
                    .
                  </li>
                )}
                {publicationsStatus === "ready" &&
                  publications.length === 0 && (
                    <li className="publications-status">No publications are listed on ORCID yet.</li>
                  )}
                {publicationsStatus === "ready" &&
                  publications.map((pub, index) => {
                    const details = [pub.year, pub.journal]
                      .filter(Boolean)
                      .join(" · ");
                    const title = (
                      <>
                        <FaRegFile
                          aria-hidden="true"
                          style={{ marginRight: "8px" }}
                        />{" "}
                        <strong>{pub.title}</strong>
                      </>
                    );
                    return (
                      <li
                        key={index}
                        className={[pub.url ? "publication--link" : null, index >= 8 ? "publication--extra" : null].filter(Boolean).join(" ") || undefined}
                      >
                        {pub.url ? (
                          <a
                            href={pub.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${pub.title} (opens in a new tab)`}
                          >
                            {title}
                          </a>
                        ) : (
                          title
                        )}
                        {details && <> {details}</>}
                      </li>
                    );
                  })}
              </ul>
              </ScrollSlider>
            <a
              href="https://orcid.org/0000-0002-5707-2799"
              target="_blank"
              rel="noopener noreferrer"
              className="publications-more"
              aria-label="See all publications on ORCID (opens in a new tab)"
            >
              See all publications on ORCID
            </a>
            </div>
          </section>

          <section className="closingContact" aria-labelledby="closing-title">
            <h2 id="closing-title" className="closingTitle">
              A data, tool or training project? Let’s talk.
            </h2>
            <ContactButtons label="Contact me!" />
          </section>
        </div>
      </div>

      <footer className="footer">
        <p>
          © {site.buildTime} Irwin Hecker. Built with{" "}
          <FaHeart className="footer-heart" role="img" aria-label="love" /> and{" "}
          <a href="https://www.gatsbyjs.com">Gatsby</a>.
        </p>
      </footer>
    </Layout>
  );
};

export const Head = () => (
  <Seo
    title="Home"
    description="Irwin Hecker, full-stack & data developer, PhD in biostatistics, based in Nantes. Projects, scientific publications and contact."
  />
);

export default IndexPage;
