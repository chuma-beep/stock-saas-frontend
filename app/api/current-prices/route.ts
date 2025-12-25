import { NextRequest, NextResponse } from 'next/server'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/current-prices`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      console.error('Backend error:', res.status, res.statusText)
      return NextResponse.json({ error: 'Failed to fetch prices' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}