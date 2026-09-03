"use client";

import { useEffect, useState } from "react";
import type { WebProject } from "@/lib/works-content";
import {
  LoadingImage,
  PageHeader,
  WorksEmpty,
  WorksFrame,
  WorksLoading,
  styles,
  useWorksContent,
} from "./WorksShared";

function ProjectImage({ project, priority = false }: { project: WebProject; priority?: boolean }) {
  return (
    <LoadingImage
      src={project.image_url}
      alt={`${project.name} project preview`}
      fit="contain"
      naturalSize={Boolean(project.image_url)}
      priority={priority}
      className={styles.naturalImage}
      style={{ width: "100%", height: project.image_url ? undefined : "100%" }}
    />
  );
}

export default function WebDevelopmentWorks() {
  const content = useWorksContent();
  const [featuredIndex, setFeaturedIndex] = useState(0);

  useEffect(() => {
    if (content && featuredIndex >= content.web_development.projects.length) {
      setFeaturedIndex(0);
    }
  }, [content, featuredIndex]);

  if (!content) {
    return <WorksFrame><WorksLoading /></WorksFrame>;
  }

  const section = content.web_development;
  const project = section.projects[featuredIndex] || null;
  const otherProjects = section.projects
    .map((item, index) => ({ item, index }))
    .filter(({ index }) => index !== featuredIndex);

  const cycle = (direction: 1 | -1) => {
    if (section.projects.length < 2) return;
    setFeaturedIndex((current) =>
      (current + direction + section.projects.length) % section.projects.length,
    );
  };

  return (
    <WorksFrame>
      <PageHeader
        eyebrow={content.home.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />

      {!project ? (
        <WorksEmpty label="No web development projects available" />
      ) : (
        <div className={styles.webContent}>
          <div className={styles.featuredShell}>
            {section.projects.length > 1 && (
              <button type="button" className={styles.navArrow} onClick={() => cycle(-1)} aria-label="Previous project">←</button>
            )}
            <article className={styles.featuredCard}>
              <div className={styles.featuredImage}>
                <ProjectImage project={project} priority />
              </div>
              <div className={styles.featuredInfo}>
                {project.name && <h2>{project.name}</h2>}
                {project.description && <p>{project.description}</p>}
                {project.services && (
                  <>
                    <div className={styles.detailLabel}>Services</div>
                    <div className={styles.detailValue}>{project.services}</div>
                  </>
                )}
                {project.stack && (
                  <>
                    <div className={styles.detailLabel}>Tech stack</div>
                    <div className={styles.detailValue}>{project.stack}</div>
                  </>
                )}
                {project.website_url && (
                  <a className={styles.websiteLink} href={project.website_url} target="_blank" rel="noreferrer">
                    View Website →
                  </a>
                )}
              </div>
            </article>
            {section.projects.length > 1 && (
              <button type="button" className={styles.navArrow} onClick={() => cycle(1)} aria-label="Next project">→</button>
            )}
          </div>

          {otherProjects.length > 0 && (
            <div className={styles.projectGrid}>
              {otherProjects.map(({ item, index }) => (
                <article
                  key={`${item.name}-${index}`}
                  className={styles.projectCard}
                  onClick={() => setFeaturedIndex(index)}
                >
                  <div className={styles.projectThumb}>
                    <ProjectImage project={item} />
                  </div>
                  <div className={styles.projectCardInfo}>
                    {item.name && <h3>{item.name}</h3>}
                    {item.services && <p>{item.services}</p>}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </WorksFrame>
  );
}
