import { useState } from "react";
import { Heart, Bookmark, Plus, X, StickyNote } from "lucide-react";
import { ButtonUI } from "../UI-Components/ButtonUI";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../UI-Components/Dialog";
import { Textarea } from "../UI-Components/Textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../UI-Components/Card";
import { Badge } from "../UI-Components/badge";

export default function VideoInteractions({
  currentTime,
  bookmarks,
  likes,
  isLiked,
  onAddBookmark,
  onToggleLike,
  onSeekTo,
  formatTime,
}) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);

  const addNote = () => {
    if (newNote.trim()) {
      const note = {
        id: Date.now().toString(),
        timestamp: currentTime,
        content: newNote.trim(),
        createdAt: new Date(),
      };
      setNotes([...notes, note]);
      setNewNote("");
      setIsAddingNote(false);
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <ButtonUI
          variant={isLiked ? "default" : "outline"}
          onClick={onToggleLike}
          className={`flex items-center cursor-pointer space-x-2 ${
            isLiked ? "bg-red-500 hover:bg-red-600 text-white" : ""
          }`}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
          <span>{likes}</span>
        </ButtonUI>

        <ButtonUI
          variant="outline"
          onClick={onAddBookmark}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <Bookmark className="h-4 w-4" />
          <span>Bookmark</span>
        </ButtonUI>
        <ButtonUI
          variant="outline"
          onClick={() => setIsAddingNote(true)}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <StickyNote className="h-4 w-4" />
          <span>Add Note</span>
        </ButtonUI>

        <Dialog open={isAddingNote} onOpenChange={setIsAddingNote}>
          <DialogTrigger>
            {/* <ButtonUI variant="outline" className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add Note</span>
            </ButtonUI> */}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Note at {formatTime(currentTime)}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Enter your note..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={4}
              />
              <div className="flex justify-end space-x-2">
                <ButtonUI
                  variant="outline"
                  onClick={() => setIsAddingNote(false)}
                >
                  Cancel
                </ButtonUI>
                <ButtonUI onClick={addNote}>Add Note</ButtonUI>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Bookmarks */}
      {bookmarks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Bookmarks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {bookmarks.map((bookmark, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100 hover:text-blue-500"
                  onClick={() => onSeekTo(bookmark)}
                >
                  {formatTime(bookmark)}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes */}
      {notes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="ring ring-slate-200  rounded-lg p-3"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-blue-100 hover:text-blue-500"
                      onClick={() => onSeekTo(note.timestamp)}
                    >
                      {formatTime(note.timestamp)}
                    </Badge>
                    <ButtonUI
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNote(note.id)}
                      className="h-6 w-6 p-0 hover:bg-red-100"
                    >
                      <X className="h-3 w-3" />
                    </ButtonUI>
                  </div>
                  <p className="text-sm text-gray-700">{note.content}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
