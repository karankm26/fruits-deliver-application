import React, { useState } from "react";
import { useEffect } from "react";
import ImageUploading from "react-images-uploading";

const CustomImgeUploader = ({
  handleChangePlayerDetails,
  index,
  formik,
  value,
}) => {
  const [images, setImages] = useState([]);
  const onChange = (imageList) => {
    handleChangePlayerDetails(
      {
        target: {
          name: "image_path",
          files: imageList?.[0]?.data_url,
        },
      },
      index
    );
    setImages(imageList);
  };
  useEffect(() => {
    if (value) {
      setImages([{ data_url: value }]);
    }
  }, [value]);
  return (
    <ImageUploading
      value={images}
      onChange={onChange}
      maxNumber={1}
      dataURLKey="data_url"
      // inputProps={<input type="file" onBlur={formik.handleBlur} />}
      acceptType={["jpg", "jpeg", "png"]}
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="upload__image-wrapper">
          <div
            hidden={images.length}
            className="text-center"
            style={isDragging ? { color: "red" } : null}
            onClick={() => {
              if (images.length) {
                onImageUpdate();
              } else {
                onImageUpload();
              }
            }}
            {...dragProps}
          >
            Drag & Drop your files or
            <br />
            <button className="filepond--label-action">Browse</button>
          </div>
          <div
            hidden={!images.length}
            className="d-flex justify-content-center"
          >
            <div className="position-relative" style={{ width: "100px" }}>
              <img
                src={images?.[0]?.data_url}
                alt=""
                width="100px"
                className="rounded upload-image"
                hidden={!images.length}
              />

              <span
                hidden={!images.length}
                onClick={onImageRemove}
                style={{
                  position: "absolute",
                  cursor: "pointer",
                  right: "-3px",
                  top: "-7px",
                }}
              >
                <i className="ri-close-line fs-5 bg-danger text-light rounded-circle" />
              </span>
            </div>
          </div>
        </div>
      )}
    </ImageUploading>
  );
};
export default CustomImgeUploader;
