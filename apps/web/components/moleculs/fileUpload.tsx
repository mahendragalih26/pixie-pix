"use client"

import React, { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { CloudUpload } from "lucide-react"

interface Props {
  onUpload: (image: File) => void
  upload: File | null
}

const FileUpload = ({ onUpload, upload }: Props) => {
  // const [file, setFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  useEffect(() => {
    if (upload) {
      const reader = new FileReader()
      reader.onloadend = () => setPreviewUrl(reader.result as string)
      reader.readAsDataURL(upload)
    } else {
      setPreviewUrl(null)
    }
  }, [upload])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      onUpload(droppedFile)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      onUpload(selectedFile)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        className="border-2 border-dashed border-yellow-400 rounded-lg h-72 flex items-center justify-center bg-white cursor-pointer overflow-hidden relative transition hover:bg-yellow-50"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        {previewUrl ? (
          <Image
            src={previewUrl}
            fill
            alt="Preview"
            className="object-contain w-full h-full"
          />
        ) : (
          <div className="text-center item-center px-4">
            <div className="flex items-center justify-center p-2 rounded-full bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 m-auto w-[20%]">
              <CloudUpload className="text-white font-bold" />
            </div>
            <p className="text-blue-600 font-semibold mb-2">
              Drag & Drop your image here
            </p>
            <p className="text-gray-500 text-sm">or click to select a file</p>
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileSelect}
      />

      {upload && (
        <p className="mt-4 text-center text-sm text-gray-700">
          ✅ File selected: <span className="font-medium">{upload.name}</span>
        </p>
      )}

      {/* {isError && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          <p>
            <strong>Error:</strong> {error.message}
          </p>
        </div>
      )} */}
      {/* {generatedContent && (
        <div className="p-4 bg-black rounded-md">
          <h2 className="font-semibold">Response:</h2>
          <p className="whitespace-pre-wrap text-white">
            {generatedContent.text}
          </p>
        </div>
      )} */}
    </div>
  )
}

export default FileUpload
