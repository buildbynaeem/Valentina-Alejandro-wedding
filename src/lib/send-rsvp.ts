import { createServerFn } from "@tanstack/react-start";
import nodemailer from "nodemailer";
import { z } from "zod";

const RsvpSchema = z.object({
  guestName: z.string().min(1),
  email: z.string().email(),
  attendance: z.enum(["yes", "no"]),
  dietary: z.string().optional().default(""),
  resopon: z.enum(["sweet", "salty"]).nullable().optional(),
  language: z.enum(["ES", "DE", "EN"]).default("EN"),
});

export type RsvpPayload = z.infer<typeof RsvpSchema>;

export const sendRsvp = createServerFn({ method: "POST" })
  .validator((data: unknown) => RsvpSchema.parse(data))
  .handler(async ({ data }) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const attendingLabel = data.attendance === "yes" ? "Attending ✅" : "Not Attending ❌";

    const resoponLabel = data.resopon
      ? data.resopon === "sweet"
        ? "🍰 Sweet"
        : "🧂 Salty"
      : "Not specified";

    const langLabels: Record<string, string> = {
      ES: "Spanish 🇪🇸",
      DE: "German 🇩🇪",
      EN: "English 🇬🇧",
    };

    await transporter.sendMail({
      from: `"Golden Hour Invites" <${process.env.SMTP_USER}>`,
      to: "zyloinvites@gmail.com",
      subject: `New RSVP: ${data.guestName} — ${attendingLabel}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #faf8f4; padding: 40px 36px; border-radius: 4px; color: #1a1a1a;">
          
          <h1 style="font-style: italic; color: #C5A880; margin: 0 0 4px; font-size: 28px;">New RSVP</h1>
          <p style="margin: 0 0 24px; color: #888; font-size: 14px;">Miriam &amp; Michael · 02.10.2027 · Valencia, Spain</p>
          <hr style="border: none; border-top: 1px solid #C5A880; opacity: 0.35; margin-bottom: 28px;" />

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; color: #999; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; width: 150px; vertical-align: top;">Guest Name</td>
              <td style="padding: 12px 0; font-size: 16px;"><strong>${data.guestName}</strong></td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 12px 0; color: #999; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Email</td>
              <td style="padding: 12px 0;">${data.email}</td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 12px 0; color: #999; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Attendance</td>
              <td style="padding: 12px 0; font-size: 16px;">${attendingLabel}</td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 12px 0; color: #999; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Dietary Needs</td>
              <td style="padding: 12px 0;">${data.dietary || "None"}</td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 12px 0; color: #999; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Resopón Choice</td>
              <td style="padding: 12px 0;">${resoponLabel}</td>
            </tr>
            <tr style="border-top: 1px solid #eee;">
              <td style="padding: 12px 0; color: #999; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; vertical-align: top;">Language</td>
              <td style="padding: 12px 0;">${langLabels[data.language] ?? data.language}</td>
            </tr>
          </table>

          <hr style="border: none; border-top: 1px solid #C5A880; opacity: 0.2; margin: 28px 0 20px;" />
          <p style="color: #bbb; font-size: 11px; margin: 0;">Sent automatically from the Golden Hour Invites wedding site.</p>
        </div>
      `,
    });

    return { ok: true };
  });
