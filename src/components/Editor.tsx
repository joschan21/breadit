"use client"

import { FC } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useForm } from 'react-hook-form'
import { PostCreationRequest, PostValidator } from '@/lib/validators/post'
import { zodResolver } from '@hookform/resolvers/zod'

interface EditorProps {
    subredditId: string,
}

const Editor: FC<EditorProps> = ({ subredditId }) => {


    const { } = useForm<PostCreationRequest>({
        resolver: zodResolver(PostValidator),
        defaultValues: {
            subredditId,
            title: '',
            content: null,
        }
    })


    return (
        <div className='w-full pd-4 bg-zinc-50 rounded-lg border border-zinc-200'>
            <form
                id="subreddit-post-form"
                className='w-fit'
                onSubmit={() => { }}></form>
            <div className='prose prose-stone dark:prose-invert'>
                <TextareaAutosize placeholder='Title' className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
                />
            </div>
        </div>
    )
}

export default Editor