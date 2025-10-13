import * as React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import "../styles/style.css";
import {
  FaLinkedin,
  FaGithub,
  FaFileAlt,
  FaOrcid,
  FaRegNewspaper,
  FaRegFile,
  FaRegEnvelope,
} from "react-icons/fa";
import becomtech_image from "../images/becomtech_image.png";
import lantrn_image from "../images/lantrn_image.png";
import rtisan_image from "../images/rtisan_image.png";
import portfolio_image from "../images/portfolio_image.png";
import respond_image from "../images/respond_image.png";
import coverage_image from "../images/coverage_image.png";
import tableau_species_tracker_image from "../images/tableau_species_tracker_image.png";
import powerbi_dashboard_image from "../images/powerbi_dashboard_image.png";
import meImage from "../images/me.jpeg";
import { Link } from "gatsby";

// Liens pour ressources professionnelles
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
    text: "CV",
    url: "/CV_FR.pdf",
    icon: <FaFileAlt />,
  },
];

const featured = [
  {
    name: "lantrn",
    description: "Mon package R !",
    image: lantrn_image,
    link: "https://github.com/ihecker/lantrn",
    tags: ["R", "Développement"],
  },
  {
    name: "ShinyRtisan",
    description: "Mon application Shiny !",
    image: rtisan_image,
    link: "https://ihecker.shinyapps.io/ShinyRtisan/",
    tags: ["Shiny", "Développement"],
  },
];

const projects = [
  {
    name: "JUMP IN TECH",
    description:
      "Réduire les inégalités de genre grâce à la programmation informatique",
    image: becomtech_image,
    link: "https://becomtech.fr",
    tags: ["Formation", "Animation"],
  },
  {
    name: "Portfolio",
    description: "Le code derrière ce portfolio !",
    image: portfolio_image,
    link: "https://github.com/ihecker/portfolio-ih",
    tags: ["ReactJS", "Développement"],
  },
  {
    name: "Projet RESPOND",
    description:
      "Réduire les problèmes de santé mentale liés à la pandémie de COVID-19",
    image: respond_image,
    link: "https://respond-project.eu/",
    tags: ["R", "Coordination"],
  },
  {
    name: "Base de données COVerAGE",
    description: "Base de données démographique mondiale du COVID-19",
    image: coverage_image,
    link: "https://www.coverage-db.org/",
    tags: ["R", "Gestion de données"],
  },
  {
    name: "Exemple Dashboard Tableau",
    description: "Suivi des espèces menacées et éteintes",
    image: tableau_species_tracker_image,
    link: "public/tableau_species_tracker_image.png",
    tags: ["Tableau", "Visualisation"],
  },
  {
    name: "Exemple Dashboard PowerBI",
    description: "Top 10 des pays par cas de COVID-19",
    image: powerbi_dashboard_image,
    link: "public/powerbi_dashboard_image.png",
    tags: ["PowerBI", "Visualisation"],
  },
];

const IndexPage = () => {
  const [heights, setHeights] = useState([20, 20, 20, 20]);
  const [publications, setPublications] = useState([]);
  const [index, setIndex] = useState(0);
  const texts = [
    "Passionné de données",
    "Passionné de code",
    "Passionné de science",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newHeights = heights.map(() => Math.random() * 80 + 20);
      setHeights(newHeights);
    }, 3000);
    return () => clearInterval(interval);
  }, [heights]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch(
          "https://pub.orcid.org/v3.0/0000-0002-5707-2799/works",
          { headers: { Accept: "application/json" } }
        );
        const data = await response.json();
        const works = data.group.map((group) => {
          const work = group["work-summary"][0];
          return {
            title: work.title.title.value,
            journal: work["journal-title"]?.value || "Inconnu",
            year: work["publication-date"]?.year?.value || "Inconnu",
            doi: work["url"]?.value || "Inconnu",
          };
        });
        setPublications(works);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des publications :",
          error
        );
      }
    };
    fetchPublications();
  }, []);

  return (
    <Layout>
      <header className="header">
        <nav>
          <Link to="/">💬FR🥖</Link>
          <Link to="/en">💬EN🌍</Link>
        </nav>
      </header>
      <div className="main-content">
        <div className="textCenter">
          <div className="title-container">
            <h1 className="title">Portfolio</h1>
            <div className="bar-chart">
              {heights.map((height, index) => (
                <div
                  key={index}
                  className="bar"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>

          <p className="intro">
            <img src={meImage} alt="Irwin Hecker" className="profile-pic" />
            <h1>Irwin Hecker</h1>
            <p className="intro">
              <span className="typing-effect">Données | Code | Science</span>
            </p>
          </p>

          <p className="intro">
            {links.map((link, i) => (
              <React.Fragment key={link.url}>
                <a href={link.url} className="link">
                  {link.icon} {link.text}
                </a>
                {i !== links.length - 1 && <> · </>}
              </React.Fragment>
            ))}
          </p>

          <div className="contactSection">
            <a href="mailto:contact@irwinhecker.com" className="contactButton">
              Contactez moi !
            </a>
            <a href="mailto:contact@irwinhecker.com" className="contactButton">
              <FaRegEnvelope />
            </a>
          </div>

          <div className="projectsTitle">
            <h2>⏲️Projets en cours⏲️</h2>
            <div className="featuredGrid">
              {featured.map((project, index) => (
                <div key={index} className="featuredCard">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="featuredImage"
                  />
                  <div className="featuredContent">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="featuredTags">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Voir le projet
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
          </div>

          <div className="projectsTitle">
            <h2>🚀Projets🚀</h2>
            <div className="projectsGrid">
              {projects.map((project, index) => (
                <div key={index} className="projectCard">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="projectImage"
                  />
                  <div className="projectContent">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="projectTags">
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Voir le projet
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
          </div>

          <div className="publicationsTitle">
            <h2>
              📰Publications scientifiques📰
              <a
                href="https://orcid.org/0000-0002-5707-2799"
                target="_blank"
                rel="noopener noreferrer"
                className="orcid-logo"
              >
                <FaOrcid />
              </a>
            </h2>
            <div className="publications">
              <ul>
                {publications.length > 0 ? (
                  publications.map((pub, index) => (
                    <li key={index}>
                      <a href={pub.doi}>
                        <FaRegFile style={{ marginRight: "8px" }} />{" "}
                        <strong>{pub.title}</strong>
                      </a>{" "}
                      ({pub.year}) - {pub.journal}
                    </li>
                  ))
                ) : (
                  <li>Aucune publication trouvée.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Irwin Hecker. Fait avec ❤️ et{" "}
          <a href="https://www.gatsbyjs.com">Gatsby</a>.
        </p>
      </footer>
    </Layout>
  );
};

export const Head = () => <Seo title="Accueil" />;

export default IndexPage;
