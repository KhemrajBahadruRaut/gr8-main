"use client";

import {
  LoadingImage,
  PageHeader,
  WorksEmpty,
  WorksFrame,
  WorksLoading,
  styles,
  useWorksContent,
} from "./WorksShared";

export default function VirtualAssistanceWorks() {
  const content = useWorksContent();

  if (!content) {
    return <WorksFrame><WorksLoading /></WorksFrame>;
  }

  const section = content.virtual_assistance;
  const hasPublishedContent = section.clients.length > 0
    || section.handle_items.length > 0
    || section.steps.length > 0;

  return (
    <WorksFrame>
      <PageHeader
        eyebrow={content.home.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />

      {!hasPublishedContent ? (
        <WorksEmpty label="No virtual assistance content available" />
      ) : (
        <div className={styles.virtualContent}>
          {section.clients.length > 0 && (
            <div className={styles.clientGrid}>
              {section.clients.map((client, index) => (
                <article
                  key={`${client.client_id || client.name}-${index}`}
                  className={`${styles.clientCard} ${client.highlighted ? styles.clientCardHighlighted : ""}`}
                >
                  <LoadingImage
                    src={client.logo_url}
                    alt={`${client.name} logo`}
                    fit="contain"
                    className={styles.clientLogo}
                    priority={index < 4}
                  />
                  {client.name && <h3>{client.name}</h3>}
                </article>
              ))}
            </div>
          )}

          {section.handle_items.length > 0 && (
            <section className={styles.virtualBlock}>
              {section.handle_title && (
                <div className={styles.sectionHeading}>
                  <p>Services</p>
                  <h2>{section.handle_title}</h2>
                </div>
              )}
              <div className={styles.handleGrid}>
                {section.handle_items.map((item, index) => (
                  <article className={styles.handleCard} key={`${item.title}-${index}`}>
                    {item.icon && <div className={styles.handleIcon}>{item.icon}</div>}
                    {item.title && <h3>{item.title}</h3>}
                    {item.description && <p>{item.description}</p>}
                  </article>
                ))}
              </div>
            </section>
          )}

          {section.steps.length > 0 && (
            <section className={styles.virtualBlock}>
              {section.steps_title && (
                <div className={styles.sectionHeading}>
                  <p>Process</p>
                  <h2>{section.steps_title}</h2>
                </div>
              )}
              <div className={styles.steps}>
                {section.steps.map((step, index) => (
                  <article className={styles.step} key={`${step.number}-${index}`}>
                    <span className={styles.stepNumber}>{step.number}</span>
                    <div>
                      {step.title && <h3>{step.title}</h3>}
                      {step.description && <p>{step.description}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </WorksFrame>
  );
}
