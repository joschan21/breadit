import { INFINITE_SCROLLING_PAGINATION_RESULTS } from "@/config"
import { db } from "@/lib/db"
import PostFeed from "./PostFeed"

const GeneralFeed = async () => {
    const posts = await db.post.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            votes: true,
            author: true,
            comments: true,
            subreddit: true,
        },
        take: INFINITE_SCROLLING_PAGINATION_RESULTS,
    })

    return <PostFeed initialPosts={posts} />
}

export default GeneralFeed