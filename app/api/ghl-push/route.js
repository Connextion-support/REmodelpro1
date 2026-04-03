import { createAdminClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

// POST /api/ghl-push
// Sends finalized project data back to GHL
export async function POST(request) {
  try {
    const body = await request.json()
    const { customerId, projectId } = body

    const supabase = createAdminClient()

    // Get GHL settings
    const { data: settings } = await supabase
      .from('ghl_settings')
      .select('*')
      .single()

    if (!settings || !settings.enabled || !settings.webhook_url) {
      return NextResponse.json({ error: 'Integration not configured' }, { status: 400 })
    }

    // Get customer
    const { data: customer } = await supabase
      .from('customers')
      .select('*')
      .eq('id', customerId)
      .single()

    // Get project with builds
    const { data: project } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single()

    const { data: builds } = await supabase
      .from('builds')
      .select('*')
      .eq('project_id', projectId)

    // Calculate totals
    const calcBuildTotal = (b) => {
      const itemsTotal = (b.items || []).reduce((s, l) => s + l.qty * l.price + (l.customAmt || 0), 0)
      const extrasTotal = (b.extras || []).reduce((s, x) => s + (x.price || 0) * (x.qty || 1) + (x.customAmt || 0), 0)
      return itemsTotal + extrasTotal
    }

    const payload = {
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        ghl_contact_id: customer.ghl_contact_id,
      },
      project: {
        name: project.name,
        total: builds.reduce((s, b) => s + calcBuildTotal(b), 0),
        builds: builds.map(b => ({
          name: b.name,
          type: b.type,
          total: calcBuildTotal(b),
          items: (b.items || []).length,
          extras: (b.extras || []).length,
          payTerms: b.pay_terms,
        })),
      },
      timestamp: new Date().toISOString(),
    }

    // Send to GHL webhook
    const response = await fetch(settings.webhook_url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`GHL webhook returned ${response.status}`)
    }

    return NextResponse.json({ success: true, payload })
  } catch (error) {
    console.error('GHL push error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
