import * as React from "react";
import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import Seo from "../../components/seo";
import "../../styles/style.css";
import {
  FaLinkedin,
  FaGithub,
  FaFileAlt,
  FaOrcid,
  FaRegNewspaper,
  FaRegFile,
  FaRegEnvelope,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import fresque_sante_mentale_image from "../../images/fresque_sante_mentale_image.jpg";
import becomtech_image from "../../images/becomtech_image.png";
import becomtech_image2 from "../../images/becomtech_image2.jpg";
import becomtech_image3 from "../../images/becomtech_image3.png";
import these_image from "../../images/these_image.jpg";
import these_image2 from "../../images/these_image2.jpg";
import these_image3 from "../../images/these_image3.jpg";
import lantrn_image from "../../images/lantrn_image.png";
import rtisan_image from "../../images/rtisan_image.png";
import portfolio_image from "../../images/portfolio_image.png";
import respond_image from "../../images/respond_image.png";
import coverage_image from "../../images/coverage_image.png";
import tableau_species_tracker_image from "../../images/tableau_species_tracker_image.png";
import powerbi_dashboard_image from "../../images/powerbi_dashboard_image.png";
import meImage from "../../images/me.jpeg";
import { Link } from "gatsby";

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

  return (
    <div className="carousel-container">
      <img
        src={images[currentIndex]}
        alt={`${alt} - ${currentIndex + 1}`}
        className="projectTopImage"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="carousel-btn carousel-btn-left"
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={goToNext}
            className="carousel-btn carousel-btn-right"
          >
            <FaChevronRight />
          </button>

          <div className="carousel-indicators">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`carousel-dot ${
                  currentIndex === index ? "active" : ""
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

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
];

const featured = [
  {
    name: "Portfolio",
    description: "The code behind this portfolio!",
    image: portfolio_image,
    link: "https://github.com/ihecker/portfolio-ih",
    tags: ["ReactJS", "Development"],
  },
];

const projectsTop = [
  {
    name: "Mental Health Fresk for Youth",
    description:
      "Harnessing collective intelligence to address mental health in a general and universal way",
    images: [fresque_sante_mentale_image],
    link: "https://www.nightline.fr/la-fresque-de-la-sante-mentale",
    tags: ["Training", "Facilitation"],
  },
  {
    name: "JUMP IN TECH",
    description: "Reducing gender inequalities through computer programming",
    images: [becomtech_image3, becomtech_image2, becomtech_image],
    link: "https://becomtech.fr",
    tags: ["Training", "Facilitation"],
  },
  {
    name: "My PhD",
    description:
      "Role of economic and social difficulties on mental health during the COVID-19 pandemic",
    images: [these_image, these_image2, these_image3],
    link: "https://theses.fr/2024SORUS387",
    tags: ["Thesis", "Doctorate"],
  },
];

const projects = [
  {
    name: "lantrn",
    description: "My R package! Functions for workflow efficiency",
    image: lantrn_image,
    link: "https://github.com/ihecker/lantrn",
    tags: ["R", "Development"],
  },
  {
    name: "ShinyRtisan",
    description: "My Shiny app! Explore R/Shiny customizations",
    image: rtisan_image,
    link: "https://ihecker.shinyapps.io/ShinyRtisan/",
    tags: ["Shiny", "Development"],
  },
  {
    name: "RESPOND project",
    description:
      "Reducing mental health concerns resulting from the COVID-19 pandemic",
    image: respond_image,
    link: "https://respond-project.eu/",
    tags: ["R", "Coordination"],
  },
  {
    name: "COVerAGE database",
    description: "Global demographic database of COVID-19",
    image: coverage_image,
    link: "https://www.coverage-db.org/",
    tags: ["R", "Data Management"],
  },
  {
    name: "Tableau Dashboard Preview",
    description: "Extinct and Threatened Species Tracker",
    image: tableau_species_tracker_image,
    link: "public/tableau_species_tracker_image.png",
    tags: ["Tableau", "Visualization"],
  },
  {
    name: "PowerBI Dashboard Preview",
    description: "Top 10 Countries by COVID-19 Cases Overview",
    image: powerbi_dashboard_image,
    link: "public/powerbi_dashboard_image.png",
    tags: ["PowerBI", "Visualization"],
  },
];

const IndexPage = () => {
  const [heights, setHeights] = useState([20, 20, 20, 20]);
  const [publications, setPublications] = useState([]);
  const [index, setIndex] = useState(0);
  const texts = ["Data Enthusiast", "Code Enthusiast", "Science Enthusiast"];

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
            journal: work["journal-title"]?.value || "Unknown",
            year: work["publication-date"]?.year?.value || "Unknown",
            doi: work["url"]?.value || "Unknown",
          };
        });
        setPublications(works);
      } catch (error) {
        console.error("Error fetching publications:", error);
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
              <span className="typing-effect">Data | Code | Science</span>
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
              Contact me!
            </a>
            <a href="mailto:contact@irwinhecker.com" className="contactButton">
              <FaRegEnvelope />
            </a>
          </div>

          <div className="projectsTitle">
            <h2>⏲️Featured Projects in the Making⏲️</h2>

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
                        View Project
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
            <h2>🚀Projects🚀</h2>

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
                      >
                        View Project
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
                        View Project
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
              📰Scientific Publications📰
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
                  <li>No publications found.</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} Irwin Hecker. Built with ❤️ and{" "}
          <a href="https://www.gatsbyjs.com">Gatsby</a>.
        </p>
      </footer>
    </Layout>
  );
};

export const Head = () => <Seo title="Home" />;

export default IndexPage;
