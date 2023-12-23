"use client";

import { useCustomToasts } from "@/hooks/use-custom-toasts";
import { usePrevious } from "@mantine/hooks";
import { VoteType } from "@prisma/client";
import { useEffect, useState } from "react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { PostVoteRequest } from "@/lib/validators/vote";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";

type Props = {
  postId: string;
  initialVotesAmt: number;
  initialVote?: VoteType | null;
};

function PostVoteClient({ initialVotesAmt, postId, initialVote }: Props) {
  const { loginToast } = useCustomToasts();
  const [votesAmt, setVotesAmt] = useState(initialVotesAmt);
  const [currentVote, setCurrentVote] = useState(initialVote);
  const prevVote = usePrevious(currentVote);
  const prevVotesAmt = usePrevious(votesAmt);

  useEffect(() => {
    setCurrentVote(initialVote);
  }, [initialVote]);

  const { mutate: vote } = useMutation({
    mutationFn: async (voteType: VoteType) => {
      const payload: PostVoteRequest = {
        postId,
        voteType,
      };

      await axios.patch("/api/subreddit/post/vote", payload);
    },
    onError: (err, type) => {
      setVotesAmt(prevVotesAmt!);
      setCurrentVote(prevVote);

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast();
        }
      }
      return toast({
        title: "Something went wrong",
        description: "Your vote was not registered, please try again.",
        variant: "destructive",
      });
    },
    onMutate: (type: VoteType) => {
      if (currentVote === type) {
        setCurrentVote(undefined);
        if (type === "UP") setVotesAmt((prev) => prev - 1);
        else if (type === "DOWN") setVotesAmt((prev) => prev + 1);
      } else {
        setCurrentVote(type);
        if (type === "UP") setVotesAmt((prev) => prev + (currentVote ? 2 : 1));
        else setVotesAmt((prev) => prev - (currentVote ? 2 : 1));
      }
    },
  });

  return (
    <div className="flex flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
      {/* upvote */}
      <Button
        onClick={() => vote("UP")}
        size="sm"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={cn("h-5 w-5 text-zinc-700", {
            "text-emerald-500 fill-emerald-500": currentVote === "UP",
          })}
        />
      </Button>

      {/* score */}
      <p className="text-center py-2 font-medium text-sm text-zinc-900">
        {votesAmt}
      </p>

      {/* downvote */}
      <Button
        onClick={() => vote("DOWN")}
        size="sm"
        className={cn({
          "text-emerald-500": currentVote === "DOWN",
        })}
        variant="ghost"
        aria-label="downvote"
      >
        <ArrowBigDown
          className={cn("h-5 w-5 text-zinc-700", {
            "text-red-500 fill-red-500": currentVote === "DOWN",
          })}
        />
      </Button>
    </div>
  );
}

export default PostVoteClient;
