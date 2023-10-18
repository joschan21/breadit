"use client"

import { FC, useCallback, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { useForm } from 'react-hook-form'
import { PostCreationRequest, PostValidator } from '@/lib/validators/post'
import { zodResolver } from '@hookform/resolvers/zod'
import type EditorJS from '@editorjs/editorjs'

interface EditorProps {
    subredditId: string,
}

const Editor: FC<EditorProps> = ({ subredditId }) => {


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PostCreationRequest>({
        resolver: zodResolver(PostValidator),
        defaultValues: {
            subredditId,
            title: '',
            content: null,
        }
    })

    const ref = useRef<EditorJS>()

    const initializeEditor = useCallback(async () => {
        const EditorJS = (await import('@editorjs/editorjs')).default
        const Header = (await import('@editorjs/header')).default
        const Embed = (await import('@editorjs/embed')).default
        const Table = (await import('@editorjs/table')).default
        const List = (await import('@editorjs/list')).default
        const Code = (await import('@editorjs/code')).default
        const LinkTool = (await import('@editorjs/link')).default
        const InlineCode = (await import('@editorjs/inline-code')).default
        const ImageTool = (await import('@editorjs/image')).default

        // !ref.current means not currently being initiated so good to initiate it
        if (!ref.current) {
            const editor = new EditorJS({
                holder: 'editor',
                onReady() {
                    ref.current = editor
                },
                placeholder: 'Type here to write your post...',
                inlineToolbar: true,
                data: { blocks: [] },
                tools: {
                    header: Header,
                    linkTool: {
                        class: LinkTool,
                        config: {
                            endpoint: '/api/link',
                        }
                    },
                    image: {
                        class: ImageTool,
                        config: {
                            uploader: {
                                async uploadByFile(file: File) {

                                }
                            }
                        }
                    }
                }
            })
        }
    }, [])


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