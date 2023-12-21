import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(req: Request) {
    const url = new URL(req.url)

    const session = await getAuthSession()

    let followedCommunitiesIds: string[] = []

    if (session) {
        const followedCommunitiesIds = await db.subscription.findMany({
            where: {
                userId: session.user.id,
            },
            include: {
                subreddit: true,
            },
        })
    }
}