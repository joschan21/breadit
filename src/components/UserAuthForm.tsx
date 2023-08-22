import { FC } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'


const UserAuthForm = () => {
    return (
        <div className='flex justify-center'>
            <Button size='sm' className='w-full'>Google</Button>

        </div>

    )
}

export default UserAuthForm