/**
 * Genera el CV en PDF, en español y en inglés, a partir de scripts/cv-data.js
 *
 *   npm run cv          → los dos idiomas
 *   npm run cv -- en    → solo uno
 *
 * Requiere pdfkit:  npm install --no-save pdfkit
 * Salida:           public/resume/CV-Bryan-Escobar.pdf
 *                   public/resume/CV-Bryan-Escobar-EN.pdf
 */

const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const data = require("./cv-data");

// Paleta alineada con el portafolio, pero pensada para leerse e imprimirse.
const INK = "#18181B";
const BODY = "#3F3F46";
const MUTED = "#71717A";
const ACCENT = "#2563EB";
const RULE = "#D4D4D8";

const MARGIN = 48;
const PAGE_W = 612; // Carta
const CONTENT_W = PAGE_W - MARGIN * 2;

const OUT_DIR = path.join(__dirname, "..", "public", "resume");

/** Dibuja un CV completo. No sabe de idiomas: solo lee el objeto que recibe. */
function buildCv(cv) {
  const out = path.join(OUT_DIR, cv.archivo);
  const S = cv.secciones;

  const doc = new PDFDocument({
    size: "LETTER",
    margins: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
    info: {
      Title: cv.meta.title,
      Author: "Bryan Escobar",
      Subject: cv.meta.subject,
      Keywords: cv.meta.keywords,
    },
  });

  const stream = fs.createWriteStream(out);
  doc.pipe(stream);

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

  // -------------------------------------------------------------- Encabezado
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
  const linea1 = [c.ubicacion, c.email, c.telefono]
    .filter(Boolean)
    .join("   |   ");
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

  // ------------------------------------------------------------------ Perfil
  sectionTitle(S.perfil);
  doc
    .font("Helvetica")
    .fontSize(9.2)
    .fillColor(BODY)
    .text(cv.perfil, MARGIN, doc.y, {
      width: CONTENT_W,
      align: "justify",
      lineGap: 1.4,
    });

  // ------------------------------------------------ Experiencia y proyectos
  sectionTitle(S.experiencia);

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
    doc
      .font("Helvetica-Oblique")
      .fontSize(8.8)
      .fillColor(MUTED)
      .text(job.contexto, MARGIN);
    doc.moveDown(0.3);

    job.logros.forEach(bullet);

    doc.moveDown(0.12);
    doc
      .font("Helvetica-Bold")
      .fontSize(8.4)
      .fillColor(INK)
      .text(S.stack, MARGIN + 14, doc.y, { continued: true })
      .font("Helvetica")
      .fillColor(MUTED)
      .text(job.stack);
  });

  // --------------------------------------------------------------- Educación
  sectionTitle(S.educacion);

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

  // ------------------------------------------------------------ Habilidades
  sectionTitle(S.habilidades);

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

  // ---------------------------------------------------------------- Idiomas
  sectionTitle(S.idiomas);
  doc.font("Helvetica").fontSize(9).fillColor(BODY).text(cv.idiomas, MARGIN, doc.y);

  doc.end();

  return new Promise((resolve, reject) => {
    stream.on("finish", () => resolve(out));
    stream.on("error", reject);
  });
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const requested = process.argv.slice(2).filter((arg) => arg in data);
  const locales = requested.length ? requested : Object.keys(data);

  for (const locale of locales) {
    const file = await buildCv(data[locale]);
    console.log(`CV (${locale}) generado en:`, file);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
