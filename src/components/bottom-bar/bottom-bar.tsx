import { Database } from '@/lib/database.types'
import { User } from '@/lib/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import BottomBarClientComponent from './bottom-bar-client'

const BottomBar = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  let user: User | undefined = undefined

  if (session) {
    const firstName = session?.user.user_metadata.firstName
    const lastName = session?.user.user_metadata.lastName
    const email = session?.user.email
    user = { firstName, lastName, email }
  }

  return <BottomBarClientComponent user={user} />
}

export default BottomBar
