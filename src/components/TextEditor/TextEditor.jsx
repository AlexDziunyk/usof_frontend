import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import the styles

const TextEditor = ({content, setContent}) => {
  const [editorHtml, setEditorHtml] = useState('');
  const quillRef = useRef(null);


  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
    },
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image',
  ];

  // const handleChange = (content, delta, source, editor) => {
  //   setEditorHtml(content);
  // };

 
  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        formats={formats}
        value={content}
        onChange={setContent}
      />
    </div>
  );
};

export default TextEditor;
