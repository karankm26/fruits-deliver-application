import React, { forwardRef, useImperativeHandle, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CustomFilePondUploader = forwardRef(
  ({ handleChangePlayerDetails, index }, ref) => {
    const [files, setFiles] = useState([]);

    useImperativeHandle(ref, () => ({
      setFiles,
    }));

    return (
      <FilePond
        key={index}
        name="player_image"
        files={files}
        allowReorder={false}
        allowMultiple={false}
        onupdatefiles={(e) => {
          setFiles(e);
          handleChangePlayerDetails(
            {
              target: {
                name: "player_image",
                files: e?.[0]?.file,
              },
            },
            index
          );
        }}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    );
  }
);
export default CustomFilePondUploader;
