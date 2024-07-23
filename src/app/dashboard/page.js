
"use client"
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag, Trash, Plus, X, Pen, Archive } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Page = () => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDescription, setNoteDescription] = useState("");
  const [labels, setLabels] = useState([]);
  const [newLabel, setNewLabel] = useState("");
  const [archived, setArchived] = useState([]);
  const [notes, setNotes] = useState([
    {
      title: "Grocery List",
      description: "- Milk\n- Eggs\n- Bread\n- Apples",
      labels: ["Groceries"],
      createdAt: new Date().toLocaleString(),
    },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (noteTitle.trim() === "" || noteDescription.trim() === "") {
      return;
    }
    const formData = {
      title: noteTitle,
      description: noteDescription,
      labels,
      createdAt: new Date().toLocaleString(),
    };

    if (isEditing) {
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = formData;
      setNotes(updatedNotes);
    } else {
      setNotes((prev) => [...prev, formData]);
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleLabelAdd = (e) => {
    e.preventDefault();
    if (newLabel.trim() === "") return;
    setLabels((prev) => [...prev, newLabel]);
    setNewLabel("");
  };

  const handleDelete = (type, index) => {
    if (type === "label") {
      setLabels(labels.filter((_, i) => i !== index));
    } else if (type === "note") {
      setNotes(notes.filter((_, i) => i !== index));
    }
  };

  const handleEdit = (index) => {
    const note = notes[index];
    setNoteTitle(note.title);
    setNoteDescription(note.description);
    setLabels(note.labels);
    setIsEditing(true);
    setEditIndex(index);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setNoteTitle("");
    setNoteDescription("");
    setLabels([]);
    setNewLabel("");
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleArchive = (id) => {
    const selectedNote = notes.find(itm => itm === id);
    setArchived(prev => [...prev, selectedNote]);
    setNotes(notes.filter((_, i) => i !== id));
    try {
      const resp = localStorage.setItem("ArchivedNotes", archived);
      console.log(resp);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex-1 flex gap-6 flex-wrap overflow-hidden">

      <br />
      {notes.length > 0 ? notes.map((note, idx) => (
        <Card key={idx} className="flex-1 max-h-[40vh] min-w-[40vh] md:max-w-[50vh] bg-background shadow-sm hover:shadow-md transition-shadow justify-between">
          <div className="max-h-16 flex justify-between items-center ps-4 pe-2 py-2 bg-muted rounded-t-lg">
            <h3 className="text-xl font-bold truncate text-nowrap max-w-[25vh]" alt={note.title}>{note.title}</h3>
            <div>
              <Button alt="delete note" variant="ghost" size="icon" className="rounded-full hover:bg-yellow-400/20" onClick={() => handleArchive(idx)}>
                <Archive className="w-4 h-4" />
                <span className="sr-only">Archive note</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-blue-400/20" onClick={() => handleEdit(idx)}>
                <Pen className="w-4 h-4" />
                <span className="sr-only">Edit note</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-400/30" onClick={() => handleDelete("note", idx)}>
                <Trash className="w-4 h-4 " />
                <span className="sr-only">Delete note</span>
              </Button>
            </div>
          </div>
          <CardContent className="p-4 space-y-2">
            <p className="text-sm text-muted-foreground whitespace-pre-line">{note.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {note.labels.map((label, labelIdx) => (
                <div key={labelIdx} className="flex items-center gap-2 text-xs text-muted-foreground bg-yellow-300/90 rounded-full p-2">
                  <Tag className="w-4 h-4" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )) : <span className="relative top-1/2 left-1/2 -translate-x-1/2 text-muted-foreground">Oops!, seems like you dont have any notes</span>}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="plus-button  rounded-full p-1 h-16 w-16 bg-background text-foreground absolute bottom-[100px] right-[100px]" onClick={resetForm}>
            <Plus className="scale-150" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit note" : "Add a note"}</DialogTitle>
            <DialogDescription>Click save note when you're done.</DialogDescription>
          </DialogHeader>
          <form className="grid gap-4 py-4" onSubmit={handleNoteSubmit}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                id="title"
                placeholder="some to do title"
                className="col-span-3 font-bold text-2xl text-muted-foreground"
              />
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                value={noteDescription}
                onChange={(e) => setNoteDescription(e.target.value)}
                id="description"
                placeholder="some to do description"
                className="col-span-3 h-max"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="label" className="text-right">
                Label
              </Label>
              <div className="flex items-center col-span-3">
                <Input
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  id="label"
                  placeholder="shopping"
                  className="flex-grow"
                />
                <Button variant="link" onClick={handleLabelAdd} className={`${newLabel.length ? "" : "hidden"}`}>
                  <Plus className="scale-150" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-4 flex flex-wrap gap-2 ">
                {labels.map((itm, idx) => (
                  <div key={idx} className="max-h-[6vh] flex items-center gap-2 text-xs text-muted-foreground bg-yellow-300/90 rounded-full p-2">
                    <Tag className="w-4 h-4" />
                    <span>{itm}</span>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-transparent" onClick={() => handleDelete("label", idx)}>
                      <X className="text-red-500 h-4 w-4" />
                      <span className="sr-only">Delete label</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit">{isEditing ? "Save changes" : "Save note"}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;

