import type { NextRequest } from "next/server"
import {NextResponse } from  "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { name, email, feedback } = await request.json()

    if (!feedback) {
      return NextResponse.json({ error: "Feedback is required" }, { status: 400 })
    }

    const emailContent = `
      <h2>New Feedback Received</h2>
      <p><strong>Name:</strong> ${name || "Anonymous"}</p>
      <p><strong>Email:</strong> ${email || "Not provided"}</p>
      <p><strong>Feedback:</strong></p>
      <p style="white-space: pre-wrap;">${feedback}</p>
      <hr>
      <p><small>Sent from Stock SaaS</small></p>
    `

    const data = await resend.emails.send({
      from: "Stock SaaS <onboarding@resend.dev>",
      to: process.env.YOUR_EMAIL || "your-email@example.com",
      subject: "New Feedback from Stock SaaS",
      html: emailContent,
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error sending feedback email:", error)
    return NextResponse.json({ error: "Failed to send feedback" }, { status: 500 })
  }
}
