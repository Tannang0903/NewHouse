const useUploadFile = () => {
  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Upload thất bại')
    }

    const data = await res.json()
    return data.url
  }

  return { uploadFile }
}

export default useUploadFile
