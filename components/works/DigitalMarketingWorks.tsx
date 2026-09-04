"use client";

import { useCallback, useEffect, useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import {
  LoadingImage,
  PageHeader,
  WorksEmpty,
  WorksFrame,
  WorksLoading,
  styles,
  useWorksContent,
} from "./WorksShared";

const MAX_VISIBLE_PROJECTS = 6;

function ProjectModal({
  clientName,
  images,
  activeIndex,
  onChange,
  onClose,
}: {
  clientName: string;
  images: string[];
  activeIndex: number;
  onChange: (index: number) => void;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft" && images.length > 1) {
        onChange((activeIndex - 1 + images.length) % images.length);
      }
      if (event.key === "ArrowRight" && images.length > 1) {
        onChange((activeIndex + 1) % images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images.length, onChange, onClose]);

  const imageUrl = images[activeIndex];
  if (!imageUrl) return null;

  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-label={`${clientName} project ${activeIndex + 1}`}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.modalPanel}>
        <button type="button" className={styles.modalClose} onClick={onClose} aria-label="Close image">×</button>
        <LoadingImage
          src={imageUrl}
          alt={`${clientName} digital marketing project ${activeIndex + 1}`}
          fit="contain"
          priority
          style={{ width: "100%", height: "100%", background: "transparent" }}
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              className={`${styles.modalNav} ${styles.modalPrevious}`}
              onClick={() => onChange((activeIndex - 1 + images.length) % images.length)}
              aria-label="Previous project image"
            >
              ←
            </button>
            <button
              type="button"
              className={`${styles.modalNav} ${styles.modalNext}`}
              onClick={() => onChange((activeIndex + 1) % images.length)}
              aria-label="Next project image"
            >
              →
            </button>
          </>
        )}
        <div className={styles.modalCaption}>
          <strong>{clientName}</strong>
          <span>{activeIndex + 1} / {images.length}</span>
        </div>
      </div>
    </div>
  );
}

export default function DigitalMarketingWorks() {
  const content = useWorksContent();
  const [selectedClientIndex, setSelectedClientIndex] = useState<number | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState<number | null>(null);
  const closeModal = useCallback(() => setModalImageIndex(null), []);
  const changeModalImage = useCallback((index: number) => setModalImageIndex(index), []);

  if (!content) {
    return <WorksFrame><WorksLoading /></WorksFrame>;
  }

  const section = content.digital_marketing;
  const selectedClient = selectedClientIndex === null
    ? null
    : section.clients[selectedClientIndex] || null;
  const selectedImages = selectedClient?.work_image_urls || [];
  const visibleImages = selectedImages.slice(0, MAX_VISIBLE_PROJECTS);
  const socialLinks = [
    {
      name: "Facebook",
      href: selectedClient?.facebook_url || "",
      icon: FaFacebookF,
      className: styles.facebookLink,
    },
    {
      name: "Instagram",
      href: selectedClient?.instagram_url || "",
      icon: FaInstagram,
      className: styles.instagramLink,
    },
  ].filter(({ href }) => href);

  return (
    <WorksFrame>
      <PageHeader
        eyebrow={content.home.eyebrow}
        title={section.title}
        subtitle={section.subtitle}
      />

      <section className={styles.digitalClients}>
        <div className={styles.sectionHeading}>
          <p>Our clients</p>
          <h2>Select a client to view their projects</h2>
        </div>
        {section.clients.length ? (
          <div className={styles.clientSelectorGrid}>
            {section.clients.map((client, index) => (
              <button
                key={`${client.client_id || client.name}-${index}`}
                type="button"
                className={`${styles.clientSelector} ${selectedClientIndex === index ? styles.clientSelectorSelected : ""}`}
                onClick={() => {
                  setSelectedClientIndex(index);
                  setModalImageIndex(null);
                }}
                aria-pressed={selectedClientIndex === index}
              >
                <LoadingImage
                  src={client.logo_url}
                  alt={`${client.name} logo`}
                  fit="contain"
                  className={styles.clientLogoSmall}
                  priority={index < 6}
                />
                <span className={styles.clientSelectorCopy}>
                  <strong>{client.name}</strong>
                  <span>{client.work_image_urls.length} {client.work_image_urls.length === 1 ? "project" : "projects"}</span>
                </span>
                <span className={styles.clientArrow}>→</span>
              </button>
            ))}
          </div>
        ) : (
          <WorksEmpty label="No clients or project images available" />
        )}
      </section>

      {selectedClient && (
        <section className={styles.digitalProjects} aria-live="polite">
          <div className={styles.sectionHeading}>
            <p>{selectedClient.name}</p>
            <h2>Digital marketing projects</h2>
          </div>
          {selectedImages.length ? (
            <div className={styles.workGrid}>
              {visibleImages.map((imageUrl, index) => (
                <button
                  type="button"
                  className={styles.workCard}
                  key={`${imageUrl}-${index}`}
                  onClick={() => setModalImageIndex(index)}
                >
                  <LoadingImage
                    src={imageUrl}
                    alt={`${selectedClient.name} project ${index + 1}`}
                    fit="contain"
                    className={styles.workMedia}
                    priority={index < 6}
                  />
                  <span className={styles.workLabel}>Project {String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>
          ) : (
            <WorksEmpty label={`No images available for ${selectedClient.name}`} />
          )}
          {socialLinks.length > 0 && (
            <div className={styles.socialLinks}>
              <p>View all of {selectedClient.name}&apos;s work</p>
              <div>
                {socialLinks.map(({ name, href, icon: Icon, className }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.socialLink} ${className}`}
                    aria-label={`View all ${selectedClient.name} projects on ${name}`}
                  >
                    <Icon aria-hidden="true" />
                    View all on {name}
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {selectedClient && modalImageIndex !== null && visibleImages[modalImageIndex] && (
        <ProjectModal
          clientName={selectedClient.name}
          images={visibleImages}
          activeIndex={modalImageIndex}
          onChange={changeModalImage}
          onClose={closeModal}
        />
      )}
    </WorksFrame>
  );
}
