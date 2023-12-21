"use client"

import { ExtendedPost } from '@/types/db'
import { FC, useRef } from 'react'
import { useIntersection } from '@mantine/hooks'
import { useInfiniteQuery } from '@tanstack/react-query'
import { INFINITE_SCROLLING_PAGINATION_RESULTS } from '@/config'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Post from './Post'

interface PostFeedProps {
    initialPosts: ExtendedPost[]
    subredditName?: string
}

const PostFeed: FC<PostFeedProps> = ({ initialPosts, subredditName }) => {

    const lastPostRef = useRef<HTMLElement>(null)

    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1,
    })

    const { data: session } = useSession()

    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ['infinite-query'],
        async ({ pageParam = 1 }) => {
            const query = `/api/posts?limit=${INFINITE_SCROLLING_PAGINATION_RESULTS}&page=${pageParam}` + (!!subredditName ? `&subredditName=${subredditName}` : '')

            const { data } = await axios.get(query)
            return data as ExtendedPost[]
        }, {
        getNextPageParam: (_, pages) => {
            return pages.length + 1
        },
        initialData: { pages: [initialPosts], pageParams: [1] }
    })

    const posts = data?.pages.flatMap((page) => page) ?? initialPosts

    return (
        <ul className='flex flex-col col-span-2 space-y-6'>
            {posts.map((post, index) => {
                const votesAmount = post.votes.reduce((acc: number, vote: { type: string }) => {
                    if (vote.type === 'UP') return acc + 1
                    if (vote.type === 'DOWN') return acc - 1
                    return acc
                }, 0)

                const currentVote = post.votes.find(
                    (vote: { userId: string | undefined }) => vote.userId === session?.user.id)


                if (index === posts.length - 1) {
                    return (
                        <li key={post.id} ref={ref}>
                            <Post
                                currentVote={currentVote}
                                votesAmt={votesAmount}
                                commentAmt={post.comments.length} post={post} subredditName={post.subreddit.name} />
                        </li>
                    )
                } else {
                    return <Post
                        currentVote={currentVote}
                        votesAmt={votesAmount}
                        commentAmt={post.comments.length} post={post} subredditName={post.subreddit.name} />
                }
            })}
        </ul>
    )
}

export default PostFeed