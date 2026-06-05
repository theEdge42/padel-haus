import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, phone, availability, skillLevel } = await req.json();

  if (!name || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "filip.marian.badea@gmail.com",
      subject: `Cerere partener de joc — ${name}`,
      text: `Nume: ${name}\nTelefon: ${phone}\nDisponibilitate: ${availability}\nNivel: ${skillLevel}`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
