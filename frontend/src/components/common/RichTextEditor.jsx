import React, { useRef, useState, useCallback } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Image, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const RichTextEditor = ({ value, onChange, placeholder = 'Write something amazing...' }) => {
  const quillRef = useRef(null);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Handle image upload
  const handleImageUpload = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      // Here you would typically upload the image to your server
      // and get back a URL. For now, we'll use a mock URL.
      const mockImageUrl = URL.createObjectURL(file);
      
      // Insert the image into the editor
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, 'image', mockImageUrl);
      
      // Move cursor after the image
      quill.setSelection(range.index + 1);
    };
  }, []);

  // Custom toolbar configuration
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
    clipboard: {
      // Toggle to add line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'align',
  ];

  return (
    <div className="rich-text-editor">
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ minHeight: '200px' }}
      />
      
      <style jsx global>{`
        .rich-text-editor .ql-container {
          min-height: 200px;
          font-size: 16px;
          line-height: 1.6;
        }
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          border-color: #d9d9d9;
        }
        .rich-text-editor .ql-container {
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          border-color: #d9d9d9;
        }
        .rich-text-editor .ql-toolbar button {
          padding: 4px 8px;
        }
        .rich-text-editor .ql-editor {
          min-height: 200px;
        }
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #bfbfbf;
          font-style: normal;
          left: 16px;
          right: 16px;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
