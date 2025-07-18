import {useRef} from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false })

interface SafeQuillProps {
    value: string
    onChange: (val: string) => void
}

export default function SafeQuill({ value, onChange }: SafeQuillProps) {
    const quillRef = useRef<any>(null)

    const modules = {
        toolbar: {
            container: [
                ["bold", "italic", "underline"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
            ],
            handlers: {
                image: async () => {
                    const input = document.createElement("input")
                    input.setAttribute("type", "file")
                    input.setAttribute("accept", "image/*")
                    input.click()

                    input.onchange = async () => {
                        const file = input.files?.[0]
                        if (!file) return

                        const formData = new FormData()
                        formData.append("image", file)

                        const res = await fetch("/api/upload/editor-image", {
                            method: "POST",
                            body: formData,
                        })

                        const data = await res.json()

                        const editor = quillRef.current?.getEditor?.()
                        if (editor) {
                            const range = editor.getSelection()
                            editor.insertEmbed(range.index, "image", data.url)
                        }
                    }
                },
            },
        },
    }

    return (
        <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={modules}
            placeholder="اكتب هنا..."
            ref={(el) => {
                if (el) quillRef.current = el
            }}
        />
    )
}
