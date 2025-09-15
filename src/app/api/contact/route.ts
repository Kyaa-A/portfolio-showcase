import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_ADDRESS = process.env.RESEND_FROM || "Portfolio Contact <onboarding@resend.dev>";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      company,
      projectType,
      contactedCompanies,
      reason,
      budget,
      message,
    } = body || {};

    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields: name and email" },
        { status: 400 }
      );
    }

    const text = `New contact form submission\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || "—"}\n` +
      `Company: ${company || "—"}\n` +
      `Project Type: ${projectType || "—"}\n` +
      `Contacted Companies: ${contactedCompanies ?? "—"}\n` +
      `Budget: ${budget || "—"}\n\n` +
      `Reason:\n${reason || "—"}\n\n` +
      `Message:\n${message || "—"}`;

    const { data, error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: "asnaripacalna@gmail.com",
      replyTo: email,
      subject: `New inquiry from ${name}${projectType ? ` - ${projectType}` : ""}`,
      text,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}


