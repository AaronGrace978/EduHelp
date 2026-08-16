import { useState } from "react";
import { ExternalLink, Plus, Trash2 } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { amazonIsbnUrl, amazonSearchUrl, openExternal } from "@/lib/openExternal";
import type { BookOrder } from "@/types";

export function BooksPage() {
  const { state, addBook, updateBook, removeBook, logHistory } = useApp();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [course, setCourse] = useState("");

  function buildUrl() {
    if (isbn.trim()) return amazonIsbnUrl(isbn);
    const parts = [title, author, "textbook"].filter(Boolean).join(" ");
    return amazonSearchUrl(parts || "college textbook");
  }

  function onSave(status: BookOrder["status"]) {
    if (!title.trim() && !isbn.trim()) return;
    const amazonUrl = buildUrl();
    addBook({
      title: title.trim() || `ISBN ${isbn.trim()}`,
      author: author.trim() || undefined,
      isbn: isbn.trim() || undefined,
      course: course.trim() || undefined,
      amazonUrl,
      status,
    });
    setTitle("");
    setAuthor("");
    setIsbn("");
    setCourse("");
  }

  return (
    <div>
      <p className="section-kicker">Textbooks</p>
      <h1 className="display-title mt-2">Amazon book orders</h1>
      <p className="mt-3 max-w-2xl text-ink-500">
        Build course book lists for{" "}
        {state.selectedCollege?.name ?? "your college"}, jump straight to Amazon
        search / ISBN results, and keep order history here.
      </p>

      <form className="panel mt-8 grid gap-3 p-5 md:grid-cols-2">
        <label>
          <span className="label">Title</span>
          <input
            className="field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Organic Chemistry"
          />
        </label>
        <label>
          <span className="label">Author</span>
          <input
            className="field"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="McMurry"
          />
        </label>
        <label>
          <span className="label">ISBN</span>
          <input
            className="field"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="978-..."
          />
        </label>
        <label>
          <span className="label">Course</span>
          <input
            className="field"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            placeholder="CHEM 201"
          />
        </label>
        <div className="flex flex-wrap gap-2 md:col-span-2">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              const url = buildUrl();
              void openExternal(url);
              logHistory({
                kind: "books",
                title: `Amazon search: ${title || isbn || "textbook"}`,
                url,
                collegeName: state.selectedCollege?.name,
              });
            }}
          >
            Search on Amazon
            <ExternalLink className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onSave("wishlist")}
          >
            <Plus className="h-4 w-4" />
            Save to wishlist
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => onSave("ordered")}
          >
            Mark ordered
          </button>
        </div>
      </form>

      <div className="mt-8 space-y-2">
        {state.books.length === 0 && (
          <p className="text-sm text-ink-500">
            No books saved yet — search Amazon or add a wishlist item.
          </p>
        )}
        {state.books.map((book) => (
          <div
            key={book.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-ink-200 bg-white/75 px-4 py-3"
          >
            <div>
              <p className="font-semibold text-ink-950">{book.title}</p>
              <p className="text-xs text-ink-500">
                {[book.author, book.course, book.isbn].filter(Boolean).join(" · ")}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="field w-auto"
                value={book.status}
                onChange={(e) =>
                  updateBook(book.id, {
                    status: e.target.value as BookOrder["status"],
                  })
                }
              >
                <option value="wishlist">Wishlist</option>
                <option value="ordered">Ordered</option>
                <option value="received">Received</option>
              </select>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => openExternal(book.amazonUrl)}
              >
                Amazon
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                className="btn-ghost text-red-600"
                onClick={() => removeBook(book.id)}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
