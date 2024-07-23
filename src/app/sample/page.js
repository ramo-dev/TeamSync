
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Component() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Grocery List",
      content: "Milk, Eggs, Bread, Apples",
      labels: ["shopping"],
    },
    {
      id: 2,
      title: "Meeting Notes",
      content: "Discuss new project timeline and budget",
      labels: ["work", "meeting"],
    },
    {
      id: 3,
      title: "Vacation Ideas",
      content: "Beach, Mountains, City Trip",
      labels: ["personal"],
    },
  ])
  const [selectedNote, setSelectedNote] = useState(null)
  const [newNote, setNewNote] = useState({ title: "", content: "", labels: [] })
  const [editingNote, setEditingNote] = useState(null)
  const handleNoteSelect = (note) => {
    setSelectedNote(note)
  }
  const handleNoteCreate = () => {
    setEditingNote({
      id: Date.now(),
      title: "",
      content: "",
      labels: [],
    })
  }
  const handleNoteUpdate = (updatedNote) => {
    setNotes(notes.map((note) => (note.id === updatedNote.id ? updatedNote : note)))
    setEditingNote(null)
  }
  const handleNoteDelete = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId))
    setSelectedNote(null)
  }
  const handleLabelAdd = (label) => {
    setEditingNote({ ...editingNote, labels: [...editingNote.labels, label] })
  }
  const handleLabelRemove = (labelToRemove) => {
    setEditingNote({
      ...editingNote,
      labels: editingNote.labels.filter((label) => label !== labelToRemove),
    })
  }
  return (
    <div className="flex h-screen w-full">
      <div className="bg-background border-r border-muted w-64 p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Google Keep</h1>
          <Button variant="ghost" size="icon" onClick={handleNoteCreate}>
            <PlusIcon className="w-5 h-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-2 rounded-md cursor-pointer transition-colors hover:bg-muted ${selectedNote?.id === note.id ? "bg-primary text-primary-foreground" : "bg-background"
                }`}
              onClick={() => handleNoteSelect(note)}
            >
              <h3 className="text-sm font-medium">{note.title}</h3>
              <div className="text-sm text-muted-foreground line-clamp-2">{note.content}</div>
              <div className="flex flex-wrap gap-1 mt-2 text-xs">
                {note.labels.map((label) => (
                  <div key={label} className="px-2 py-1 rounded-full bg-muted text-muted-foreground">
                    {label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-6 overflow-auto">
        {editingNote ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <Input
                value={editingNote.title}
                onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                placeholder="Note title"
                className="text-2xl font-bold"
              />
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleNoteDelete(editingNote.id)}>
                  <Trash2Icon className="w-5 h-5" />
                </Button>
                <Button onClick={() => handleNoteUpdate(editingNote)}>Save</Button>
              </div>
            </div>
            <Textarea
              value={editingNote.content}
              onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
              placeholder="Note content"
              className="flex-1"
            />
            <div className="flex flex-wrap gap-2">
              {editingNote.labels.map((label) => (
                <div
                  key={label}
                  className="px-2 py-1 rounded-full bg-muted text-muted-foreground flex items-center gap-2"
                >
                  {label}
                  <Button variant="ghost" size="icon" onClick={() => handleLabelRemove(label)}>
                    <XIcon className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              <Input
                placeholder="Add label"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.target.value.trim()) {
                    handleLabelAdd(e.target.value.trim())
                    e.target.value = ""
                  }
                }}
                className="bg-muted text-muted-foreground px-2 py-1 rounded-full flex-1"
              />
            </div>
          </div>
        ) : selectedNote ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{selectedNote.title}</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={() => setEditingNote(selectedNote)}>
                  <FilePenIcon className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleNoteDelete(selectedNote.id)}>
                  <Trash2Icon className="w-5 h-5" />
                </Button>
              </div>
            </div>
            <div className="text-muted-foreground">{selectedNote.content}</div>
            <div className="flex flex-wrap gap-2">
              {selectedNote.labels.map((label) => (
                <div key={label} className="px-2 py-1 rounded-full bg-muted text-muted-foreground">
                  {label}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Select a note to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}

function FilePenIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function Trash2Icon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
