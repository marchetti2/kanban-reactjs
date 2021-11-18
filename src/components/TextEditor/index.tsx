import { Box } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
  tempDescription: string;
  setTempDescription: Dispatch<SetStateAction<string>>;
}

function TextEditor({ tempDescription, setTempDescription }: TextEditorProps) {
  function handleChange(value: string) {
    setTempDescription(value);
  }

  const config = {
    toolbar: [
      //[{ header: [1, 2, 3, false] }],
      [{ size: [ 'small', false, 'large', 'huge' ]}],
      ["bold", "italic", "underline", "strike"],
      ["blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }, "link"],
    ],
  };

  return (
    <Box
      mb="5px"
      sx={{
        ".ql-toolbar": {
          borderRadius: "6px 6px 0 0",
          border: "1px solid #DFE1E6",
        },
        ".ql-container": {
          borderRadius: "0 0 6px 6px",
          border: "1px solid #DFE1E6",
          borderTop: "none",
        },
        ".ql-editor": {
          minHeight: "110px",
          color: "light.800",
          fontFamily: 'Poppins',
        },/* 
        ".ql-editor p": {
          fontSize: "16px",
          fontWeight: "400",
        }, */
        ".ql-editor h1": {
          fontSize: "26px",
        },
        ".ql-editor h2": {
          fontSize: "22px",
        },
        ".ql-editor h3": {
          fontSize: "18px",
        },
        ".ql-editor li": {
          marginLeft: "21px",
          fontSize: "16px",
          fontWeight: "400",
        },
        ".ql-editor a": {
          color: 'blue',
          textDecoration: "none",
          transition: ".3s",
          '&:hover': {
            textDecoration: "underline"
          }
        },
        ".ql-editor ul,ol": {
          marginLeft: "0",
          paddingLeft: "0",
        },
        ".ql-editor .ql-size-small": {
          fontSize: "16px",
          fontWeight: "400",
        },
        ".ql-editor p": {
          fontSize: "24px",
        },
        ".ql-editor .ql-size-large": {
          fontSize: "32px",
        },
        ".ql-editor .ql-size-huge": {
          fontSize: "40px",
        },
      }}
    >
      <ReactQuill
        modules={config}
        theme="snow"
        value={tempDescription}
        onChange={(value) => handleChange(value)}
      />
    </Box>
  );
}

export { TextEditor };

