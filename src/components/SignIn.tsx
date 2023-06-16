"use client";

import { FC } from 'react'
import { Icons } from '@/components/Icons'
import UserAuthForm from '@/components/UserAuthForm'
import Link from 'next/link'
import {useRouter} from 'next/navigation';

interface SignInProps {
  isModal?: boolean;
}

const SignIn: FC<SignInProps> = ({ isModal = false }) => {
  const router = useRouter();

  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <Icons.logo className='mx-auto h-6 w-6' />
        <h1 className='text-2xl font-semibold tracking-tight'>Welcome back</h1>
        <p className='text-sm max-w-xs mx-auto'>
          By continuing, you are setting up a Breadit account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <UserAuthForm />
      <p className='px-8 text-center text-sm text-muted-foreground'>
        New to Breaddit?{' '}
        <Link
          href='/sign-up'
          className='hover:text-brand text-sm underline underline-offset-4'
          onClick={(e) => {
            e.preventDefault();
            if(isModal) {
              router.replace('/sign-up');
            } else {
              router.push('/sign-up');
            }
          }}>
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default SignIn
