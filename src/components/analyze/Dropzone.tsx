"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, FileText, X } from "lucide-react";
import { cn } from "@/lib/cn";

export function Dropzone({
  files,
  onFilesChange,
}: {
  files: File[];
  onFilesChange: (files: File[]) => void;
}) {
  const onDrop = useCallback(
    (accepted: File[]) => {
      const merged = [...files, ...accepted];
      const seen = new Set<string>();
      const deduped = merged.filter((f) => {
        const key = `${f.name}-${f.size}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      onFilesChange(deduped);
    },
    [files, onFilesChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
      "text/markdown": [".md", ".markdown"],
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
    maxSize: 25 * 1024 * 1024,
  });

  function remove(idx: number) {
    onFilesChange(files.filter((_, i) => i !== idx));
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition",
          isDragActive
            ? "border-brand-500 bg-brand-50/60"
            : "border-slate-300 bg-white hover:border-brand-400 hover:bg-brand-50/30",
        )}
      >
        <input {...getInputProps()} />
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-700">
          <UploadCloud className="h-6 w-6" />
        </span>
        <p className="mt-3 text-sm font-semibold text-slate-900">
          {isDragActive
            ? "Drop the documents here"
            : "Drop evaluations, IEP/504 reports, or test results"}
        </p>
        <p className="mt-1 text-xs text-slate-500">
          PDF, DOCX, TXT, Markdown, or photo (PNG/JPG/WEBP) · up to 25 MB each · multiple files OK
        </p>
        <p className="mt-1 text-[11px] text-slate-400">
          Photos &amp; scanned images are run through on-server OCR automatically.
        </p>
        <p className="mt-3 text-[11px] uppercase tracking-wider text-slate-400">
          processed in-memory · never stored
        </p>
      </div>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((f, idx) => (
            <li
              key={`${f.name}-${idx}`}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <div className="flex min-w-0 items-center gap-2">
                <FileText className="h-4 w-4 flex-shrink-0 text-brand-600" />
                <span className="truncate font-medium text-slate-800">
                  {f.name}
                </span>
                <span className="text-xs text-slate-500">
                  · {Math.round(f.size / 1024)} KB
                </span>
              </div>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                aria-label={`Remove ${f.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
