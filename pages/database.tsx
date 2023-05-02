import React from 'react'
import { useSession, getSession, signOut } from 'next-auth/react'

const database = () => {
    const { data: session, status } = useSession({ required: true })

    if (status === 'authenticated') {
        return (
            <div>
                {session && session.user ?
                    <p>Hello ${session.user.name}</p>
                    :
                    <p></p>}
                <button onClick={() => signOut()}>Sign Out</button>
            </div>
        )
    }
    else {
        return (
            <div>
                <p>You are not signed in.</p>
            </div>
        )
    }
}

export default database;


export const getServerSideProps = async (context: any) => {
    const session = await getSession(context)
    if (!session) {
        return {
            redirect: {
                destination: '/login'
            }
        }
    }
    else {
        return {
            props: { session }
        }
    }
}