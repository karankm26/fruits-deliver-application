import React, { useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchSupportTicketMessageById,
  sendSupportTicketMessage,
  updateSupportTicketMessageById,
} from "../../features/apiSlice";
import { useDispatch, useSelector } from "react-redux";

import ScrollToBottom from "react-scroll-to-bottom";
import ImageLightbox from "../../utils/ImageLightbox";
import moment from "moment";
import Swal from "sweetalert2";

export default function SupportTicketView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const imageLightBoxRef = useRef(null);
  const { id } = useParams();
  const {
    supportTicketMessageByIdData,
    supportTicketMessageByIdDataLoading,
    supportTicketMessageByIdDataSuccess,
    sendSupportTicketMessageDataSuccess,
    updateSupportTicketMessageByIdDataSuccess,
  } = useSelector((state) => state.api);
  // const { SupportTicketMessages } = supportTicketMessageByIdData;
  const [message, setMessage] = useState("");
  const [images, setImages] = useState({});
  const { loginData } = useSelector((state) => state.login);
  const [groupedMessages, setGroupedMessages] = useState([]);
  const [success, setSuccess] = useState(false);
  const AdminId = loginData?.id;

  useEffect(() => {
    const fetchMessage = () => {
      if (id) {
        dispatch(fetchSupportTicketMessageById(id));
      }
    };
    const intervalId = setInterval(fetchMessage, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [id, sendSupportTicketMessageDataSuccess]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("AdminId", AdminId);
    formData.append("SupportTicketId", id);
    formData.append("message", message);
    if (images.length) {
      formData.append("images", images[0]);
    }
    dispatch(sendSupportTicketMessage(formData));
    setMessage("");
    if (supportTicketMessageByIdData?.status === 3) {
      handleStatusUpdate(2);
    }
  };

  function isValidDocUrl(str) {
    if (typeof str !== "string") return false;
    return !!str.match(/\w+\.(docx|doc|pdf|xlsx)$/gi);
  }

  async function toDataURL(url) {
    const blob = await fetch(url).then((res) => res.blob());
    return URL.createObjectURL(blob);
  }
  async function download(URL) {
    const a = document.createElement("a");
    a.href = await toDataURL(URL?.url);
    a.download = "Backroom-games-" + URL.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const renderImages = (img, item) => {
    let count = 0;
    return img.map((image, index) => {
      if (count < 4 && !isValidDocUrl(image.url)) {
        count++;
        return (
          <div className=" py-1 position-relative " key={index}>
            <div className="msg-photo-gallery-count">
              {count === 4 && renderRemainingImagesCount(img)}
            </div>
            <img
              alt={`Image ${index + 1}`}
              src={image?.url}
              className={`msg-photo-gallery ${
                count === 4 && `msg-photo-gallery-4`
              }`}
              onClick={() => {
                if (imageLightBoxRef.current) {
                  imageLightBoxRef.current.handleImageClick(item, image);
                }
              }}
            />
          </div>
        );
      } else if (!isValidDocUrl(image.url)) {
        count++;
        return null;
      } else {
        return (
          <div className="col-6 py-1" key={index}>
            <div className="msg-doc" onClick={() => download(image)}>
              <i className="ri-file-text-line fs-1" />
            </div>
          </div>
        );
      }
    });
  };

  const renderRemainingImagesCount = (images) => {
    const remainingImagesCount = Math.max(0, images.length - 4);
    if (remainingImagesCount > 0) {
      return <div>+{remainingImagesCount} more</div>;
    }
    return null;
  };

  useEffect(() => {
    if (supportTicketMessageByIdData?.SupportTicketMessages) {
      function separateMessagesByDate(messageSupport) {
        const separatedMessages = messageSupport.reduce(
          (accumulator, message) => {
            const dateProperty = moment(message.createdAt).format(
              "dddd, MMMM DD, yyyy"
            );
            let dateObject = accumulator.find(
              (obj) => obj.date === dateProperty
            );

            if (!dateObject) {
              dateObject = { date: dateProperty, messages: [] };
              accumulator.push(dateObject);
            }

            dateObject.messages.push(message);
            return accumulator;
          },
          []
        );

        setGroupedMessages(separatedMessages);
      }

      separateMessagesByDate(
        supportTicketMessageByIdData?.SupportTicketMessages
      );
    }
  }, [supportTicketMessageByIdData?.SupportTicketMessages]);

  const handleStatusAlert = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to close this chat!",
      icon: "warning",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, close it!",
    }).then((result) => {
      if (result.isConfirmed) {
        handleStatusUpdate(3);
        setSuccess(true);
      }
    });
  };
  const handleStatusUpdate = (status) => {
    dispatch(updateSupportTicketMessageById({ id, body: { status: status } }));
  };

  useEffect(() => {
    if (updateSupportTicketMessageByIdDataSuccess && success) {
      navigate("/support-tickets");
    }
  }, [updateSupportTicketMessageByIdDataSuccess, success]);

  return (
    <Layout>
      {/* <object
        data="http://159.223.51.198:2020/supportTicketMessage/1704523607281-lottery-logic-flow-diagram.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <p>
          Alternative text - include a link{" "}
          <a href="http://159.223.51.198:2020/supportTicketMessage/1704523607281-lottery-logic-flow-diagram.pdf">
            to the PDF!
          </a>
        </p>
      </object> */}
      <div className="chat-wrapper d-lg-flex gap-1 mx-n4 mt-n4 p-1">
        {/* end chat leftsidebar */}
        {/* Start User chat */}
        <div className="user-chat w-100 overflow-hidden">
          <div className="chat-content d-lg-flex">
            {/* start chat conversation section */}
            <div className="w-100 overflow-hidden position-relative">
              {/* conversation user */}
              <div className="position-relative">
                <div className="position-relative" id="users-chat">
                  <div className="p-1 user-chat-topbar">
                    <div className="row align-items-center">
                      <div className="col-sm-4 col-8">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 d-block d-lg-none me-3">
                            <a
                              href="javascript: void(0);"
                              className="user-chat-remove fs-18 p-1"
                            >
                              <i className="ri-arrow-left-s-line align-bottom" />
                            </a>
                          </div>
                          <div className="flex-grow-1 overflow-hidden">
                            <div className="d-flex align-items-center">
                              <div className="flex-shrink-0 chat-user-img online user-own-img align-self-center me-3 ms-0">
                                {supportTicketMessageByIdData?.User?.image ? (
                                  <img
                                    src="assets/images/users/avatar-2.jpg"
                                    className="rounded-circle avatar-xs"
                                    alt
                                  />
                                ) : (
                                  ""
                                )}
                                <span className="user-status" />
                              </div>
                              <div className="flex-grow-1 overflow-hidden">
                                <h5 className="text-truncate mb-0 fs-16">
                                  <a
                                    className="text-reset username"
                                    data-bs-toggle="offcanvas"
                                    href="#userProfileCanvasExample"
                                    aria-controls="userProfileCanvasExample"
                                  >
                                    {supportTicketMessageByIdData?.User?.fname}
                                  </a>
                                </h5>
                                {/* <p className="text-truncate text-muted fs-14 mb-0 userStatus">
                                  <small>Online</small>
                                </p> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-8 col-4">
                        <ul className="list-inline user-chat-nav text-end mb-0 py-1 px-4">
                          <button
                            className="btn btn-sm btn-soft-danger"
                            onClick={handleStatusAlert}
                          >
                            Close Ticket
                          </button>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {!supportTicketMessageByIdDataSuccess && (
                    <div id="elmLoader">
                      <div
                        class="spinner-border text-primary avatar-sm"
                        role="status"
                      >
                        <span class="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  )}
                  <ScrollToBottom
                    className="chat-conversation "
                    id="chat-conversation"
                  >
                    {groupedMessages.length
                      ? groupedMessages.map((item, index) => (
                          <div key={index}>
                            <div className="divider">{item.date}</div>

                            <div>
                              {item?.messages?.map((msg, msgIndex) => (
                                <div
                                  key={msgIndex}
                                  className={`msg py-3 ${
                                    msg?.AdminId ? `right-msg` : `left-msg`
                                  }`}
                                >
                                  <div
                                    className="px-2"
                                    // className="msg-img"
                                    // style={{
                                    //   backgroundImage:
                                    //     "url(https://image.flaticon.com/icons/svg/327/327779.svg)",
                                    // }}
                                  />
                                  <div className="msg-bubble">
                                    <div className="msg-info">
                                      <div className="msg-info-name">
                                        {msg?.AdminId
                                          ? "Me"
                                          : supportTicketMessageByIdData?.User
                                              ?.fname}
                                      </div>
                                      <div className="msg-info-time">
                                        {moment(msg.createdAt).format(
                                          "hh:mm a"
                                        )}
                                      </div>
                                    </div>
                                    <div className="msg-text">
                                      <div
                                        className={
                                          msg.images.length === 1
                                            ? "image-container-1"
                                            : "image-container"
                                        }
                                        hidden={!msg.images.length}
                                      >
                                        {renderImages(msg?.images, msg)}
                                      </div>
                                      {msg?.message}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))
                      : null}
                  </ScrollToBottom>
                </div>

                <div className="chat-input-section p-3 p-lg-3">
                  <form
                    onSubmit={handleMessageSubmit}
                    id="chatinput-form"
                    encType="multipart/form-data"
                  >
                    <div className="row g-0 align-items-center">
                      <div className="col-auto">
                        <div className="chat-input-links me-2">
                          <div className="links-list-item">
                            <button
                              type="button"
                              className="btn btn-link text-decoration-none emoji-btn"
                              id="emoji-btn"
                            >
                              <i className="bx bx-smile align-middle" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-auto ">
                        <div className="chat-input-links me-2">
                          <input
                            type="file"
                            id="image-file"
                            hidden
                            onChange={(e) => setImages(e.target.files)}
                          />
                          <div className="links-list-item">
                            <label
                              className="btn btn-link text-decoration-none m-0"
                              htmlFor="image-file"
                            >
                              <i className="bx bx-image align-middle" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="chat-input-feedback">
                          Please Enter a Message
                        </div>
                        <input
                          type="text"
                          className="form-control chat-input bg-light border-light"
                          id="chat-input"
                          placeholder="Type your message..."
                          autoComplete="off"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                        />
                      </div>
                      <div className="col-auto">
                        <div className="chat-input-links ms-2">
                          <div className="links-list-item">
                            <button
                              type="submit"
                              className="btn btn-success chat-send waves-effect waves-light"
                              disabled={!images.length && !message.trim()}
                            >
                              <i className="ri-send-plane-2-fill align-bottom" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageLightbox
        messages={supportTicketMessageByIdData?.SupportTicketMessages}
        ref={imageLightBoxRef}
      />
      {/* <div className="image-upload-container">Pppfdsfks</div> */}
    </Layout>
  );
}
