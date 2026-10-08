import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function stripHeaderInjection(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ ok: false, error: "Solicitud inválida." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  if (typeof body !== "object" || body === null) {
    return new Response(
      JSON.stringify({ ok: false, error: "Solicitud inválida." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    !name.trim() ||
    !email.trim() ||
    !message.trim()
  ) {
    return new Response(
      JSON.stringify({ ok: false, error: "Completá todos los campos." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!EMAIL_RE.test(email.trim())) {
    return new Response(
      JSON.stringify({ ok: false, error: "El email no es válido." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const gmailUser = import.meta.env.GMAIL_USER;
  const gmailAppPassword = import.meta.env.GMAIL_APP_PASSWORD;
  const contactTo = import.meta.env.CONTACT_TO_EMAIL || gmailUser;

  if (!gmailUser || !gmailAppPassword) {
    console.error(
      "Faltan GMAIL_USER / GMAIL_APP_PASSWORD en las variables de entorno.",
    );
    return new Response(
      JSON.stringify({
        ok: false,
        error: "El formulario no está disponible en este momento.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const safeName = stripHeaderInjection(name);
  const safeEmail = stripHeaderInjection(email);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Sitio Montenegro" <${gmailUser}>`,
      to: contactTo,
      replyTo: safeEmail,
      subject: `Consulta desde el sitio web — ${safeName}`,
      text: `${message}\n\n— ${safeName} (${safeEmail})`,
      html: `<p>${message.replace(/\n/g, "<br>")}</p><p>— ${safeName} (${safeEmail})</p>`,
    });
  } catch (error) {
    console.error("Error al enviar el email de contacto:", error);
    return new Response(
      JSON.stringify({
        ok: false,
        error: "No se pudo enviar la consulta. Probá de nuevo más tarde.",
      }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
