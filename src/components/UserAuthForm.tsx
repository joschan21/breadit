"use client"


import { FC, useState } from 'react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'
import { signIn } from 'next-auth/react';
import { Icons } from './Icons';


const UserAuthForm = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const loginWithGoogle = async () => {
        setIsLoading(true);

        try {
            await signIn('google')
        } catch (error) {

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className='flex justify-center'>
            <Button
                onClick={loginWithGoogle}
                isLoading={isLoading}
                size='sm'
                className='w-full'>
                {isLoading ? null : <Icons.google className='h-4 w-4 mr-2' />}
                Google
            </Button>

        </div>

    )
}

export default UserAuthForm