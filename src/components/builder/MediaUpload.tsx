"use client";

import { useState } from "react";

interface MediaUploadProps {
  currentValue?: string;
  onMediaSelect: (url: string) => void;
  fieldName?: string;
}

export default function MediaUpload({ currentValue, onMediaSelect, fieldName }: MediaUploadProps) {
  const [urlInput, setUrlInput] = useState(currentValue || "");
  const [previewUrl, setPreviewUrl] = useState(currentValue || "");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewUrl(result);
        onMediaSelect(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setPreviewUrl(urlInput);
      onMediaSelect(urlInput);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm font-medium text-gray-700">
        {fieldName ? `Edit ${fieldName}` : "Media Upload"}
      </div>

      {/* Preview */}
      {previewUrl && (
        <div className="relative group rounded-lg overflow-hidden border-2 border-gray-200">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="text-white text-sm font-medium">Current Image</span>
          </div>
        </div>
      )}

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
        />
      </div>

      {/* URL Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Or paste image URL
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            onClick={handleUrlSubmit}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
