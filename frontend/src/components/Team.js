import React from "react";
import "../styles/Team.css";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

const teamMembers = [
  {
    name: "Souvik Saha",
    role: "Web Developer",
    image: "https://media.licdn.com/dms/image/v2/D5603AQHEHblGYQKznA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718300740018?e=1745452800&v=beta&t=WpthqngwQjHW9s3zeYYbWP-zKMGRgUXNaH-dG4TD9Ks",
    linkedin: "https://www.linkedin.com/in/souvik-saha-613503226/",
    twitter: "https://twitter.com/alicejohnson",
    github: "https://github.com/souvik4133x",
  },
  {
    name: "Suman Khan",
    role: "UI/UX Designer",
    image: "https://media.licdn.com/dms/image/v2/D4D35AQFam-nIhNFoyg/profile-framedphoto-shrink_800_800/B4DZT4jJvaGcAg-/0/1739336752411?e=1740272400&v=beta&t=LGo2hME4mfi1QezX8jGl0uRj5DTvacynyl3X6H22z24",
    linkedin: "https://www.linkedin.com/in/suman-khan-5957a3227/",
    twitter: "https://x.com/sumankhan24649",
    github: "https://github.com/Khan-Suman",
  },
  {
    name: "Suruchi Kumari",
    role: "Backend Engineer",
    image: "https://media.licdn.com/dms/image/v2/C5603AQFyCpOH1ZDM3w/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1650601278953?e=2147483647&v=beta&t=XZd9xtjEMZVrftttOcYVzP2-DSlHf6CITYM__E5vQAM",
    linkedin: "https://www.linkedin.com/in/suruchi-kumari-5b3445230/",
    twitter: "https://x.com/Suruchi18591098",
    github: "https://github.com/coder12git",
  },
  {
    name: "Soumyajit Kundu",
    role: "designing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT604qVQ9gLUy9Oj5qp0hFG3P2Uca8ZsZ6NpA&s",
    linkedin: "https://www.linkedin.com/in/soumyajit-kundu-b46672268/",
    twitter: "https://x.com/SoumyajitK125",
    github: "https://github.com/soumyajitkundu05",
  },
];

const Team = () => {
  return (
    <section className="team-section" id="Team">
      <h2 className="team-title">Meet Our Team</h2>
      <p className="team-subtitle">Dedicated professionals building a better future.</p>
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div className="team-card" key={index}>
            <img src={member.image} alt={member.name} className="team-image" />
            <h3 className="team-name">{member.name}</h3>
            <p className="team-role">{member.role}</p>
            <div className="social-links">
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="social-icon linkedin" />
              </a>
              <a href={member.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter className="social-icon twitter" />
              </a>
              <a href={member.github} target="_blank" rel="noopener noreferrer">
                <FaGithub className="social-icon github" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
