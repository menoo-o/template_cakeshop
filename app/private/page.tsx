
import { redirect } from 'next/navigation'
import { signOut } from './action';
import { createClient } from '@/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = await createClient()
 

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <>
      <p>Hello {data.user.email}</p>
      <br /><br />
      <form action={signOut}>
        <button type="submit">Sign Out</button>
      </form>
    </>
  
  )
}

