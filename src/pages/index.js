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
} from "react-icons/fa";
import lantrn_image from "../images/lantrn_image.png";
import rtisan_image from "../images/rtisan_image.png";
import portfolio_image from "../images/portfolio_image.png";
import respond_image from "../images/respond_image.png";
import coverage_image from "../images/coverage_image.png";
import tableau_species_tracker_image from "../images/tableau_species_tracker_image.png";
import powerbi_dashboard_image from "../images/powerbi_dashboard_image.png";

// Array of links for professional resources
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
    url: "/CV_EN.pdf",
    icon: <FaFileAlt />,
  },
];

const featured = [
  {
    name: "lantrn",
    description: "My R package! Functions for workflow efficiency",
    image: lantrn_image,
    link: "https://github.com/ihecker/lantrn",
    tags: ["R", "Package"],
  },
  {
    name: "ShinyRtisan",
    description: "My Shiny app! Explore R/Shiny customizations",
    image: rtisan_image,
    link: "https://ihecker.shinyapps.io/ShinyRtisan/",
    tags: ["Shiny", "Web App"],
  },
];

const projects = [
  {
    name: "Porfolio",
    description: "The code behind this portfolio!",
    image: portfolio_image,
    link: "https://github.com/ihecker/portfolio-ih",
    tags: ["ReactJS", "Web App"],
  },
  {
    name: "RESPOND project",
    description:
      "Reduce mental health concerns resulting from the COVID-19 pandemic",
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
    link: tableau_species_tracker_image,
    tags: ["Tableau", "Data Visualization"],
  },
  {
    name: "PowerBI Dashboard Preview",
    description: "Top 10 Countries by COVID-19 Cases Overview",
    image: powerbi_dashboard_image,
    link: powerbi_dashboard_image,
    tags: ["PowerBI", "Data Visualization"],
  },
];

const IndexPage = () => {
  const [heights, setHeights] = useState([20, 20, 20, 20]);
  const [publications, setPublications] = useState([]);

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
          {
            headers: { Accept: "application/json" },
          }
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
      <div className="main-content">
        <div className="textCenter">
          {/* Title with animated bar background */}
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
            {links.map((link, i) => (
              <React.Fragment key={link.url}>
                <a href={link.url} className="link">
                  {link.icon} {link.text}
                </a>
                {i !== links.length - 1 && <> · </>}
              </React.Fragment>
            ))}
          </p>

          {/* Featured Section */}
          <div className="projectsTitle">
            <h2>Featured Projects in the Making</h2>
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

          {/* Publications Section */}
          <div className="publicationsTitle">
            <h2>
              <FaRegNewspaper /> Scientific publications
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
                        {/* Use FaRegFile as bullet */}
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

          {/* Projects Section */}
          <div className="projectsTitle">
            <h2>Projects</h2>
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
