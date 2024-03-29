import React, { useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor({ setEditorHtml, editorHtml, value, formik }) {
  const colors = [
    "#000000",
    "#e60000",
    "#ff9900",
    "#ffff00",
    "#008a00",
    "#0066cc",
    "#9933ff",
    "#ffffff",
    "#facccc",
    "#ffebcc",
    "#ffffcc",
    "#cce8cc",
    "#cce0f5",
    "#ebd6ff",
    "#bbbbbb",
    "#f06666",
    "#ffc266",
    "#ffff66",
    "#66b966",
    "#66a3e0",
    "#c285ff",
    "#888888",
    "#a10000",
    "#b26b00",
    "#b2b200",
    "#006100",
    "#0047b2",
    "#6b24b2",
    "#444444",
    "#5c0000",
    "#663d00",
    "#666600",
    "#003700",
    "#002966",
    "#3d1466",
    "custom-color",
  ];
  // const reactQuillRef = useRef(null);

  // const modules = {
  //   toolbar: [
  //     [{ header: [1, 2, false] }],
  //     ["bold", "italic", "underline", "strike", "blockquote"],
  //     [
  //       { list: "ordered" },
  //       { list: "bullet" },
  //       { indent: "-1" },
  //       { indent: "+1" },
  //     ],
  //     ["link", "image"],
  //     ["clean"],
  //   ],
  //   imageUploader: {
  //     upload: (file) => {
  //       return new Promise((resolve, reject) => {
  //         const formData = new FormData();
  //         formData.append("image", file);

  //         fetch(
  //           "https://api.imgbb.com/1/upload?key=334ecea9ec1213784db5cb9a14dac265",
  //           {
  //             method: "POST",
  //             body: formData,
  //           }
  //         )
  //           .then((response) => response.json())
  //           .then((result) => {
  //             console.log(result);
  //             resolve(result.data.url);
  //           })
  //           .catch((error) => {
  //             reject("Upload failed");
  //             console.error("Error:", error);
  //           });
  //       });
  //     },
  //   },
  // };

  // const formats = [
  //   "header",
  //   "bold",
  //   "italic",
  //   "underline",
  //   "strike",
  //   "blockquote",
  //   "list",
  //   "bullet",
  //   "indent",
  //   "link",
  //   "image",
  //   "imageBlot",
  // ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      [
        {
          color: colors,
        },
      ],
      [{ background: colors }],
      ["code-block"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "imageBlot",
    "background",
    "align",
    "size",
    "font",
    "code-block",
    "emoji",
  ];

  const handleProcedureContentChange = (content, delta, source, editor) => {
    setEditorHtml(content);
    if (formik) {
      formik.handleChange({
        target: {
          name: "event_details",
          value: content,
        },
      });
    }
  };

  useEffect(() => {
    if (value) {
      setEditorHtml(value);
    }
  }, [value]);

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      id="event_details"
      value={editorHtml}
      onChange={handleProcedureContentChange}
      placeholder="Enter the meesage here..."
      onBlur={() => {
        if (formik) formik.handleBlur({ target: { name: "event_details" } });
      }}
    />
  );
}
