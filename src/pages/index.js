import * as React from "react";
import { useState, useEffect } from "react";
import Layout from "../components/layout";
import Seo from "../components/seo";
import "../styles/style.css";
import { FaLinkedin, FaGithub, FaFileAlt, FaOrcid, FaRegNewspaper, FaRegFile} from "react-icons/fa";

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
    url: "/CV_EN.pdf", // Use the path relative to the public folder
    icon: <FaFileAlt />,
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

  // Fetch ORCID publications and other available data
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const response = await fetch('https://pub.orcid.org/v3.0/0000-0002-5707-2799/works', {
          headers: { Accept: 'application/json' }
        });
        const data = await response.json();

        const works = data.group.map(group => {
          const work = group['work-summary'][0];

          return {
            title: work.title.title.value,
            journal: work['journal-title']?.value || 'Unknown',
            year: work['publication-date']?.year?.value || 'Unknown',
            doi: work['url']?.value || 'Unknown', 
          };
        });

        setPublications(works); 
      } catch (error) {
        console.error('Error fetching publications:', error);
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
                 < FaOrcid />
              </a>
            </h2>
            <div className="publications">
              <ul>
                {publications.length > 0 ? (
                  publications.map((pub, index) => (
                    <li key={index}>
                      <a href={pub.doi}>
                      <FaRegFile style={{ marginRight: '8px' }} /> {/* Use FaRegFile as bullet */}
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
