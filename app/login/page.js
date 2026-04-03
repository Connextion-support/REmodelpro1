'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase-browser'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState('password') // 'password' or 'magic'
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const supabase = createClient()

  const handlePasswordLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      window.location.href = '/'
    }
    setLoading(false)
  }

  const handleMagicLink = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithOtp({ 
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    })
    if (error) {
      setError(error.message)
    } else {
      setMessage('Check your email for a login link!')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight:'100vh',background:'#0B0D10',display:'flex',alignItems:'center',justifyContent:'center',
      fontFamily:"'DM Sans',sans-serif",color:'#e8eaf0'
    }}>
      <div style={{width:380,padding:32,background:'#131620',borderRadius:16,border:'1px solid #1d2130'}}>
        <div style={{fontFamily:"'Instrument Serif',serif",fontSize:28,marginBottom:4}}>
          Remodel<span style={{color:'#3b6df0'}}>Pro</span>
        </div>
        <div style={{fontSize:11,color:'#6b7186',marginBottom:24,letterSpacing:'.08em',textTransform:'uppercase'}}>
          Sales Rep Login
        </div>

        <div style={{display:'flex',gap:4,marginBottom:16}}>
          <button 
            onClick={()=>setMode('password')}
            style={{
              flex:1,padding:'8px',borderRadius:8,border:'1px solid '+(mode==='password'?'#3b6df0':'#1d2130'),
              background:mode==='password'?'rgba(59,109,240,.1)':'transparent',
              color:mode==='password'?'#5585f7':'#6b7186',
              fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit'
            }}>
            Password
          </button>
          <button 
            onClick={()=>setMode('magic')}
            style={{
              flex:1,padding:'8px',borderRadius:8,border:'1px solid '+(mode==='magic'?'#3b6df0':'#1d2130'),
              background:mode==='magic'?'rgba(59,109,240,.1)':'transparent',
              color:mode==='magic'?'#5585f7':'#6b7186',
              fontSize:12,fontWeight:600,cursor:'pointer',fontFamily:'inherit'
            }}>
            Magic Link
          </button>
        </div>

        <form onSubmit={mode==='password'?handlePasswordLogin:handleMagicLink}>
          <div style={{marginBottom:12}}>
            <label style={{display:'block',fontSize:10,fontWeight:600,color:'#6b7186',marginBottom:4,textTransform:'uppercase',letterSpacing:'.05em'}}>
              Email
            </label>
            <input 
              type="email" value={email} onChange={e=>setEmail(e.target.value)} required
              placeholder="you@renovationsnow.com"
              style={{
                width:'100%',padding:'10px 12px',borderRadius:8,border:'1px solid #1d2130',
                background:'#0e1017',color:'#e8eaf0',fontSize:13,fontFamily:'inherit',
                outline:'none',boxSizing:'border-box'
              }}
            />
          </div>

          {mode==='password' && (
            <div style={{marginBottom:16}}>
              <label style={{display:'block',fontSize:10,fontWeight:600,color:'#6b7186',marginBottom:4,textTransform:'uppercase',letterSpacing:'.05em'}}>
                Password
              </label>
              <input 
                type="password" value={password} onChange={e=>setPassword(e.target.value)} required
                style={{
                  width:'100%',padding:'10px 12px',borderRadius:8,border:'1px solid #1d2130',
                  background:'#0e1017',color:'#e8eaf0',fontSize:13,fontFamily:'inherit',
                  outline:'none',boxSizing:'border-box'
                }}
              />
            </div>
          )}

          <button 
            type="submit" disabled={loading}
            style={{
              width:'100%',padding:'10px',borderRadius:8,border:'none',
              background:'#3b6df0',color:'#fff',fontSize:13,fontWeight:600,
              cursor:loading?'not-allowed':'pointer',opacity:loading?.6:1,
              fontFamily:'inherit'
            }}>
            {loading ? 'Please wait...' : mode==='password' ? 'Sign In' : 'Send Magic Link'}
          </button>
        </form>

        {error && <div style={{marginTop:12,padding:8,borderRadius:6,background:'rgba(239,68,68,.1)',color:'#ef4444',fontSize:11,fontWeight:600}}>{error}</div>}
        {message && <div style={{marginTop:12,padding:8,borderRadius:6,background:'rgba(45,212,160,.1)',color:'#2dd4a0',fontSize:11,fontWeight:600}}>{message}</div>}
      </div>
    </div>
  )
}
