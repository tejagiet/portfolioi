import { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { getProfile, uploadResume, deleteResume } from '../../lib/api'

export default function ResumeManager() {
  const [currentUrl, setCurrentUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState(null)
  const [preview, setPreview] = useState(false)

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type })
    setTimeout(() => setMessage(null), 4000)
  }

  useEffect(() => {
    getProfile()
      .then((data) => { if (data?.resume_url) setCurrentUrl(data.resume_url) })
      .catch(() => {})
  }, [])

  const handleUpload = async (file) => {
    if (!file || file.type !== 'application/pdf') {
      showMessage('Please upload a PDF file only.', 'error')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      showMessage('File must be under 10 MB.', 'error')
      return
    }
    setUploading(true)
    try {
      const data = await uploadResume(file)
      setCurrentUrl(data.url)
      setPreview(false)
      showMessage('✓ Resume uploaded! Public URL updated in Neon.')
    } catch (err) {
      showMessage('Upload failed: ' + err.message, 'error')
    }
    setUploading(false)
  }

  const onDrop = useCallback((files) => {
    if (files[0]) handleUpload(files[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
    disabled: uploading,
  })

  const handleDelete = async () => {
    if (!window.confirm('Remove current resume?')) return
    try {
      await deleteResume()
      setCurrentUrl(null)
      setPreview(false)
      showMessage('Resume removed.')
    } catch (err) {
      showMessage(err.message, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl text-gray-800">Resume Manager</h2>
        <p className="text-gray-500 text-sm mt-1">
          Upload a PDF — it's saved directly into the Neon database for persistent hosting.
        </p>
      </div>

      {message && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm ${
          message.type === 'error'
            ? 'bg-red-50 border-red-200 text-red-700'
            : 'bg-green-50 border-green-200 text-green-700'
        }`}>
          <span>{message.type === 'error' ? '✗' : '✓'}</span>
          <span>{message.text}</span>
        </div>
      )}

      {/* Dropzone */}
      <div
        {...getRootProps()}
        id="resume-dropzone"
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
          isDragActive
            ? 'border-purple-500 bg-purple-50 scale-[1.01]'
            : 'border-purple-200 hover:border-purple-400 hover:bg-purple-50/50'
        } ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} id="resume-file-input" />
        {uploading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Uploading…</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center">
              <svg className="w-7 h-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            {isDragActive ? (
              <p className="text-sm font-semibold text-purple-600">Drop PDF here…</p>
            ) : (
              <>
                <p className="text-sm font-semibold text-gray-700">{currentUrl ? 'Replace Resume File' : 'Upload Resume PDF'}</p>
                <p className="text-xs text-gray-400">Drag & drop a PDF, or click to select · Max 10 MB</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Current Resume */}
      {currentUrl && (
        <div className="glass rounded-2xl border border-purple-100 overflow-hidden shadow-sm">
          <div className="px-5 py-4 flex items-center justify-between border-b border-purple-50 bg-white/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">resume.pdf</p>
                <p className="text-xs text-emerald-600 font-semibold">Active · Stored in database</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                id="resume-preview-toggle"
                onClick={() => setPreview((p) => !p)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-600 hover:text-gray-800 bg-white hover:bg-gray-50 border border-gray-200 transition-all shadow-sm"
              >
                {preview ? 'Hide Preview' : 'Preview'}
              </button>
              <a
                id="resume-open-link"
                href={currentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-100 transition-all shadow-sm"
              >
                Open File ↗
              </a>
              <button
                id="resume-delete-btn"
                onClick={handleDelete}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 border border-transparent transition-all"
              >
                Remove
              </button>
            </div>
          </div>
          {preview && (
            <div className="p-4 bg-gray-50">
              <iframe
                src={currentUrl}
                title="Resume Preview"
                className="w-full rounded-xl border border-purple-100 shadow-sm"
                style={{ height: '600px', background: '#fff' }}
              />
            </div>
          )}
        </div>
      )}

      {/* Info */}
      <div className="flex gap-3 px-4 py-3.5 rounded-xl bg-purple-50/50 border border-purple-100">
        <svg className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-700">How it works:</strong> Your PDF is uploaded directly into Neon's database as a secure binary (<code className="text-purple-600 font-mono">BYTEA</code>) column in the <code className="text-purple-600 font-mono">profile</code> table.
          This ensures your resume persists permanently online even on transient cloud serverless platforms.
        </p>
      </div>
    </div>
  )
}
