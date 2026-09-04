/**
 * Genera el CV en PDF a partir de scripts/cv-data.js
 *
 *   node scripts/generate-cv.js
 *
 * Requiere pdfkit:  npm install --no-save pdfkit
 * Salida:           public/resume/CV-Bryan-Escobar.pdf
 */

const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const cv = require("./cv-data");

// Paleta alineada con el portafolio, pero pensada para leerse e imprimirse.
const INK = "#18181B";
const BODY = "#3F3F46";
const MUTED = "#71717A";
const ACCENT = "#2563EB";
const RULE = "#D4D4D8";

const MARGIN = 48;
const PAGE_W = 612; // Carta
const CONTENT_W = PAGE_W - MARGIN * 2;

const out = path.join(__dirname, "..", "public", "resume", "CV-Bryan-Escobar.pdf");
fs.mkdirSync(path.dirname(out), { recursive: true });

const doc = new PDFDocument({
  size: "LETTER",
  margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
  info: {
    Title: "CV — Bryan Escobar",
    Author: "Bryan Escobar",
    Subject: "Desarrollador de Software · Aplicaciones Web y Automatización",
    Keywords:
      "desarrollador de software, full stack, React, Next.js, Node.js, SQL, El Salvador",
  },
});

doc.pipe(fs.createWriteStream(out));

/** Título de sección con línea inferior. */
function sectionTitle(text) {
  doc.moveDown(0.9);
  const y = doc.y;
  doc
    .font("Helvetica-Bold")
    .fontSize(9.5)
    .fillColor(ACCENT)
    .text(text.toUpperCase(), MARGIN, y, { characterSpacing: 1.4 });
  doc
    .moveTo(MARGIN, doc.y + 3)
    .lineTo(PAGE_W - MARGIN, doc.y + 3)
    .lineWidth(0.6)
    .strokeColor(RULE)
    .stroke();
  doc.moveDown(0.65);
}

/** Viñeta con sangría francesa. */
function bullet(text) {
  const y = doc.y;
  doc.font("Helvetica").fontSize(9).fillColor(ACCENT).text("•", MARGIN + 4, y);
  doc
    .font("Helvetica")
    .fontSize(9)
    .fillColor(BODY)
    .text(text, MARGIN + 14, y, {
      width: CONTENT_W - 14,
      align: "left",
      lineGap: 1.2,
    });
  doc.moveDown(0.18);
}

// ---------------------------------------------------------------- Encabezado
doc
  .font("Helvetica-Bold")
  .fontSize(26)
  .fillColor(INK)
  .text(cv.nombre, MARGIN, MARGIN, { characterSpacing: 0.6 });

doc
  .font("Helvetica")
  .fontSize(10.5)
  .fillColor(ACCENT)
  .text(cv.titulo, { lineGap: 0 });

doc.moveDown(0.5);

const c = cv.contacto;
const linea1 = [c.ubicacion, c.email, c.telefono].filter(Boolean).join("   |   ");
const linea2 = [c.web, c.github, c.linkedin].filter(Boolean).join("   |   ");

doc.font("Helvetica").fontSize(8.8).fillColor(MUTED).text(linea1);
doc.fillColor(MUTED).text(linea2);

doc
  .moveTo(MARGIN, doc.y + 8)
  .lineTo(PAGE_W - MARGIN, doc.y + 8)
  .lineWidth(1.1)
  .strokeColor(INK)
  .stroke();
doc.moveDown(0.9);

// -------------------------------------------------------------------- Perfil
sectionTitle("Perfil profesional");
doc
  .font("Helvetica")
  .fontSize(9.2)
  .fillColor(BODY)
  .text(cv.perfil, MARGIN, doc.y, { width: CONTENT_W, align: "justify", lineGap: 1.4 });

// -------------------------------------------------- Experiencia y proyectos
sectionTitle("Experiencia y proyectos");

cv.experiencia.forEach((job, index) => {
  if (index > 0) doc.moveDown(0.55);

  const y = doc.y;
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(INK)
    .text(job.titulo, MARGIN, y, { width: CONTENT_W - 130, continued: false });

  doc
    .font("Helvetica")
    .fontSize(8.6)
    .fillColor(MUTED)
    .text(job.periodo, PAGE_W - MARGIN - 130, y + 1.5, {
      width: 130,
      align: "right",
    });

  doc.y = Math.max(doc.y, y + 12);
  doc.font("Helvetica-Oblique").fontSize(8.8).fillColor(MUTED).text(job.contexto, MARGIN);
  doc.moveDown(0.3);

  job.logros.forEach(bullet);

  doc.moveDown(0.12);
  doc
    .font("Helvetica-Bold")
    .fontSize(8.4)
    .fillColor(INK)
    .text("Stack:  ", MARGIN + 14, doc.y, { continued: true })
    .font("Helvetica")
    .fillColor(MUTED)
    .text(job.stack);
});

// ----------------------------------------------------------------- Educación
sectionTitle("Educación");

cv.educacion.forEach((edu, index) => {
  if (index > 0) doc.moveDown(0.35);
  const y = doc.y;
  doc
    .font("Helvetica-Bold")
    .fontSize(9.5)
    .fillColor(INK)
    .text(edu.titulo, MARGIN, y, { width: CONTENT_W - 150 });

  if (edu.detalle) {
    doc
      .font("Helvetica")
      .fontSize(8.6)
      .fillColor(MUTED)
      .text(edu.detalle, PAGE_W - MARGIN - 150, y + 1, {
        width: 150,
        align: "right",
      });
    doc.y = Math.max(doc.y, y + 11);
  }

  doc.font("Helvetica").fontSize(8.8).fillColor(BODY).text(edu.institucion, MARGIN);
});

// -------------------------------------------------------------- Habilidades
sectionTitle("Habilidades técnicas");

cv.habilidades.forEach((group) => {
  doc
    .font("Helvetica-Bold")
    .fontSize(8.8)
    .fillColor(INK)
    .text(`${group.area}:  `, MARGIN, doc.y, { continued: true })
    .font("Helvetica")
    .fillColor(BODY)
    .text(group.items, { width: CONTENT_W });
  doc.moveDown(0.18);
});

// ------------------------------------------------------------------ Idiomas
sectionTitle("Idiomas");
doc.font("Helvetica").fontSize(9).fillColor(BODY).text(cv.idiomas, MARGIN, doc.y);

doc.end();
console.log("CV generado en:", out);
