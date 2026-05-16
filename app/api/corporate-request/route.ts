import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, phone } = await req.json();

  if (!name || (!email && !phone)) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Padel Haus <noreply@padelhaus.ro>",
      to: "contact@padelhaus.ro",
      subject: `Cerere eveniment corporate — ${name}`,
      text: `Nume: ${name}\nEmail: ${email || "—"}\nTelefon: ${phone || "—"}`,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
