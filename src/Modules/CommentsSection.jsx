import { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Avatar, AvatarImage } from "../UI-Components/Avatar";
import { ButtonUI } from "../UI-Components/ButtonUI";
import { Textarea } from "../UI-Components/Textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../UI-Components/Card";
import { AvatarIcon } from "../UI-Components/Images";
import { COMMENTS } from "../Constants";

export default function CommentsSection() {
  const [comments, setComments] = useState(COMMENTS);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        author: "You",
        avatar: AvatarIcon,
        content: newComment.trim(),
        timestamp: new Date(),
        likes: 0,
        dislikes: 0,
        replies: [],
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days ago`;
    }
  };

  const CommentItem = ({ comment }) => (
    <div>
      <div className="flex space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.avatar} />
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-medium text-sm">{comment.author}</span>
            <span className="text-xs text-gray-500">
              {formatTimeAgo(comment.timestamp)}
            </span>
          </div>
          <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
          <div className="flex items-center space-x-4">
            <ButtonUI variant="ghost" size="sm" className="h-6 px-2 text-xs">
              <ThumbsUp className="h-3 w-3 mr-1" />
              {comment.likes}
            </ButtonUI>
            <ButtonUI variant="ghost" size="sm" className="h-6 px-2 text-xs">
              <ThumbsDown className="h-3 w-3 mr-1" />
              {comment.dislikes}
            </ButtonUI>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Comments ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add Comment */}
        <div className="flex gap-3 items-end flex-col">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <ButtonUI
            onClick={addComment}
            disabled={!newComment.trim()}
            className="cursor-pointer"
          >
            Comment
          </ButtonUI>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
