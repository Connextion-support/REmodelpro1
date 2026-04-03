import { createAdminClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

// POST /api/webhook
// GHL sends contact data here when a contact is assigned/updated
export async function POST(request) {
  try {
    const body = await request.json()
    
    // Verify webhook secret (optional but recommended)
    const authHeader = request.headers.get('x-webhook-secret')
    if (process.env.GHL_WEBHOOK_SECRET && authHeader !== process.env.GHL_WEBHOOK_SECRET) {
      // Don't enforce yet - GHL may not send this header
      console.log('Webhook secret mismatch (not enforced)')
    }

    // Extract contact data from GHL payload
    // GHL webhook payloads vary by trigger type - handle common formats
    const contact = body.contact || body
    const name = contact.name || contact.contactName || 
                 ((contact.firstName || '') + ' ' + (contact.lastName || '')).trim() ||
                 contact.full_name || 'Unknown'
    const email = contact.email || contact.contactEmail || ''
    const phone = contact.phone || contact.contactPhone || contact.phoneNumber || ''
    const address = contact.address || contact.contactAddress || 
                    [contact.address1, contact.city, contact.state, contact.postalCode]
                      .filter(Boolean).join(', ') || ''
    const ghlContactId = contact.id || contact.contactId || contact.contact_id || ''
    const ghlUserId = contact.assignedTo || contact.assigned_to || 
                      contact.userId || contact.user_id || ''

    if (!name || name === 'Unknown') {
      return NextResponse.json({ error: 'No contact name provided' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Find the rep by GHL user ID
    let repId = null
    if (ghlUserId) {
      const { data: rep } = await supabase
        .from('profiles')
        .select('id')
        .eq('ghl_user_id', ghlUserId)
        .single()
      if (rep) repId = rep.id
    }

    // Check if customer already exists (by GHL contact ID or email)
    let existingCustomer = null
    if (ghlContactId) {
      const { data } = await supabase
        .from('customers')
        .select('id')
        .eq('ghl_contact_id', ghlContactId)
        .single()
      existingCustomer = data
    }
    if (!existingCustomer && email) {
      const { data } = await supabase
        .from('customers')
        .select('id')
        .eq('email', email)
        .single()
      existingCustomer = data
    }

    if (existingCustomer) {
      // Update existing customer
      const { error } = await supabase
        .from('customers')
        .update({
          name,
          email,
          phone,
          address,
          ghl_contact_id: ghlContactId || undefined,
          assigned_rep_id: repId || undefined,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingCustomer.id)

      if (error) throw error
      return NextResponse.json({ success: true, action: 'updated', customerId: existingCustomer.id })
    } else {
      // Create new customer
      const { data: newCustomer, error } = await supabase
        .from('customers')
        .insert({
          name,
          email,
          phone,
          address,
          ghl_contact_id: ghlContactId,
          assigned_rep_id: repId,
        })
        .select('id')
        .single()

      if (error) throw error
      return NextResponse.json({ success: true, action: 'created', customerId: newCustomer.id })
    }
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET for webhook verification (some services ping GET first)
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'RemodelPro Webhook' })
}
