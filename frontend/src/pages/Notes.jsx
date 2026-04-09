import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getNotes, saveNote, deleteNote } from "@/lib/storage";

import { Plus, Search, Trash2, Edit3 } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Notes() {
  const [notes, setNotes] = useState(getNotes);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filtered = notes.filter((n) =>
  n.title.toLowerCase().includes(search.toLowerCase()) ||
  n.content.toLowerCase().includes(search.toLowerCase()) ||
  n.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = () => {
    if (!editing?.title?.trim()) {toast.error("Title is required");return;}
    const updated = saveNote({
      id: editing.id,
      title: editing.title.trim(),
      content: editing.content || "",
      tags: editing.tags || []
    });
    setNotes(updated);
    setDialogOpen(false);
    setEditing(null);
    toast.success(editing.id ? "Note updated" : "Note created");
  };

  const handleDelete = (id) => {
    const updated = deleteNote(id);
    setNotes(updated);
    toast.success("Note deleted");
  };

  const openNew = () => {setEditing({ title: "", content: "", tags: [] });setDialogOpen(true);};
  const openEdit = (note) => {setEditing({ ...note });setDialogOpen(true);};

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Notes</h1>
          <p className="text-muted-foreground mt-1">Save notes for revision</p>
        </div>
        <Button onClick={openNew} className="gradient-primary text-white border-0"><Plus size={16} className="mr-1" /> New Note</Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search notes..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {filtered.length === 0 ?
      <div className="text-center py-12 text-muted-foreground">
          <p>{notes.length === 0 ? "No notes yet. Create your first one!" : "No notes match your search."}</p>
        </div> :

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((note) =>
        <Card key={note.id} className="glass hover:border-primary/30 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="font-display text-base">{note.title}</CardTitle>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(note)}><Edit3 size={14} /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDelete(note.id)}><Trash2 size={14} /></Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 whitespace-pre-wrap">{note.content}</p>
                {note.tags.length > 0 &&
            <div className="flex flex-wrap gap-1 mt-3">
                    {note.tags.map((t) =>
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{t}</span>
              )}
                  </div>
            }
                <p className="text-[10px] text-muted-foreground mt-2">{new Date(note.updatedAt).toLocaleDateString()}</p>
              </CardContent>
            </Card>
        )}
        </div>
      }

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle className="font-display">{editing?.id ? "Edit Note" : "New Note"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={editing?.title || ""} onChange={(e) => setEditing((prev) => prev ? { ...prev, title: e.target.value } : prev)} placeholder="Note title" />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea value={editing?.content || ""} onChange={(e) => setEditing((prev) => prev ? { ...prev, content: e.target.value } : prev)} placeholder="Write your notes here..." rows={6} />
            </div>
            <div className="space-y-2">
              <Label>Tags (comma separated)</Label>
              <Input
                value={editing?.tags?.join(", ") || ""}
                onChange={(e) => setEditing((prev) => prev ? { ...prev, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) } : prev)}
                placeholder="arrays, dp, revision" />
              
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} className="gradient-primary text-white border-0">Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>);

}