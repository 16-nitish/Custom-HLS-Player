import { useState } from "react";
import { ThumbsUp, ThumbsDown, Reply } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../UI-Components/Avatar";
import { ButtonUI } from "../UI-Components/ButtonUI";
import { Textarea } from "../UI-Components/Textarea";
import AvatarIcon from "/avatarImage.png";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../UI-Components/Card";

export default function CommentsSection() {
  const [comments, setComments] = useState([
    {
      id: "1",
      author: "John Doe",
      content: "Great video! Really helpful content.",
      timestamp: new Date(Date.now() - 3600000),
      likes: 5,
      dislikes: 0,
      replies: [],
    },
    {
      id: "2",
      author: "Jane Smith",
      content:
        "The quality selector feature is amazing. Works perfectly with different network conditions.",
      timestamp: new Date(Date.now() - 7200000),
      likes: 3,
      dislikes: 1,
      replies: [
        {
          id: "2-1",
          author: "Mike Johnson",
          content: "I agree! The adaptive streaming is very smooth.",
          timestamp: new Date(Date.now() - 3600000),
          likes: 2,
          dislikes: 0,
          replies: [],
        },
      ],
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        author: "You",
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

  const addReply = (parentId) => {
    if (replyContent.trim()) {
      const reply = {
        id: `${parentId}-${Date.now()}`,
        author: "You",
        content: replyContent.trim(),
        timestamp: new Date(),
        likes: 0,
        dislikes: 0,
        replies: [],
      };

      setComments(
        comments.map((comment) =>
          comment.id === parentId
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment
        )
      );
      setReplyContent("");
      setReplyingTo(null);
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

  const CommentItem = ({ comment, isReply = false }) => (
    <div className={`${isReply ? "ml-8 border-l-2 border-gray-200 pl-4" : ""}`}>
      <div className="flex space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={AvatarIcon} />
          <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
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
            {!isReply && (
              <ButtonUI
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={() =>
                  setReplyingTo(replyingTo === comment.id ? null : comment.id)
                }
              >
                <Reply className="h-3 w-3 mr-1" />
                Reply
              </ButtonUI>
            )}
          </div>

          {replyingTo === comment.id && (
            <div className="mt-3 space-y-2">
              <Textarea
                placeholder="Write a reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={2}
                className="text-sm"
              />
              <div className="flex space-x-2">
                <ButtonUI size="sm" onClick={() => addReply(comment.id)}>
                  Reply
                </ButtonUI>
                <ButtonUI
                  variant="outline"
                  size="sm"
                  onClick={() => setReplyingTo(null)}
                >
                  Cancel
                </ButtonUI>
              </div>
            </div>
          )}

          {comment.replies.length > 0 && (
            <div className="mt-4 space-y-3">
              {comment.replies.map((reply) => (
                <CommentItem key={reply.id} comment={reply} isReply={true} />
              ))}
            </div>
          )}
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
        <div className="space-y-3">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <ButtonUI onClick={addComment} disabled={!newComment.trim()}>
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
