import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { redis } from "@/lib/redis"
import { CommentVoteValidator } from "@/lib/validators/vote"
import type { CachedPost } from '@/types/redis'
import { Vote } from "lucide-react"
import { z } from "zod"

const CACHE_AFTER_UPVOTES = 1

export async function PATCH(req: Request) {
    try {
        const body = await req.json()

        const { commentId, voteType } = CommentVoteValidator.parse(body)

        const session = await getAuthSession()

        if (!session?.user) {
            return new Response('Unauthorized', { status: 401 })
        }

        const existingVote = await db.commentVote.findFirst({
            where: {
                userId: session.user.id,
                commentId,
            },
        })


        if (existingVote) {
            if (existingVote.type === voteType) {
                await db.commentVote.delete({
                    where: {
                        userId_commentId: {
                            commentId,
                            userId: session.user.id,
                        }
                    }
                })
                return new Response('Ok')
            } else {
                await db.commentVote.update({
                    where: {
                        userId_commentId: {
                            commentId,
                            userId: session.user.id,
                        }
                    },
                    data: {
                        type: voteType,
                    },
                })

            }


            return new Response('Ok')
        }


        await db.commentVote.create({
            data: {
                type: voteType,
                userId: session.user.id,
                commentId,
            },
        })

        return new Response('Ok')

    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response('Invalid request data passed', { status: 422 })
        }

        return new Response('Could not register your vote, please try again.', { status: 500 })
    }
}