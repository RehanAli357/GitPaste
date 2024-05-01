import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateFileData, shareFile, uploadFile, deleteFile } from "../../Actions/file&FolderActions";
import AlertBox from "../AlertBox/AlertBox";
const Files = () => {
  const [time, setTime] = useState(5);
  const [index, setIndex] = useState(-1)
  const [show,setShow]=useState("")
  const params = useParams();
  const url = useRef(null);
  const naviagte = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const files = useSelector((state) => state.fileFolder);

  const copyUrl = () => {
    const range = document.createRange();
    range.selectNodeContents(url.current);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
    url.current.style.backgroundColor = "blue";
    setTimeout(() => {
      url.current.style.backgroundColor = "transparent";
    }, 1000);
  };

  const shareUrl = async (id,e) => {
    dispatch(shareFile('file-share', 'POST', { userName: user.name, folderName: params.id, fileId: id, duration: time},setShow,id))
  }

  const changeTime = (e) => {
    if (Number(e.target.value) >= 5 && Number(e.target.value) <= 1440) {
      setTime(e.target.value);
    } else {
      setTime(5);
    }
  };

  const downloadFile = (id) => {
    let fileDownload = files.folder[index].files.filter((data) => {
      return data._id === id;
    });
    const arrayBuffer = new Uint8Array(fileDownload[0].fileData.data);

    const blob = new Blob([arrayBuffer]);

    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", fileDownload[0].fileName);

    document.body.appendChild(link);

    link.click();

    link.parentNode.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  const fileUpdate = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileId', id);
      formData.append('folderName', params.id);
      formData.append('userName', user.name);
      dispatch(updateFileData("update-file", "PUT", formData))
    }
  };

  const updloadFile = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folderName', params.id);
      formData.append('userName', user.name);
      dispatch(uploadFile('upload-file', 'POST', formData))
    }
  }

  const deleteFolderFile = async (id) => {
    dispatch(deleteFile('delete-file', 'DELETE', { userName: user.name, folderName: params.id, fileId: id }))
  }

  useEffect(() => {
    if (files.folder) {
      let data = files.folder.findIndex((data) => data.folderName === params.id);
      setIndex(data)
    }
  }, []);


  return (
    <>
      <div className="Files">
        <div className="File-Path">
          <img
            onClick={() => {
              naviagte("/");
            }}
            src={require("../../Assets/Images/home.png")}
            alt="home"
          />
          <span>Home</span>
          <img src={require("../../Assets/Images/right.png")} alt="right" />
          <img
            onClick={() => {
              naviagte(-1);
            }}
            src={require("../../Assets/Images/folder2.png")}
            alt="folder2"
          />
          <span>{params.id}</span>
          <img src={require("../../Assets/Images/right.png")} alt="right" />
          <img src={require("../../Assets/Images/file.png")} alt="right" />
          <span>File</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          <div className="upload-File">
            <p className="Common-Btn">Upload File</p>
            <input type='file' onChange={(e) => { updloadFile(e) }} />
          </div>
          {
            files?.folder[index]?.files?.length >= 0 ?
              files.folder[index].files.map((data) => {
                return (
                  <>
                    <div className="File">
                      <div className="File-Left">
                        <img
                          src={require("../../Assets/Images/fileDownload.png")}
                          alt="download"
                        />
                        <button
                          className="Common-Btn"
                          onClick={() => {
                            downloadFile(data._id);
                          }}
                        >
                          Download
                        </button>
                      </div>
                      <div className="File-Right">
                        <div className="File-Url">
                          {

                          }
                          <p className={data._id} ref={url} style={{display:show.length>0 && show===data._id ? 'block' :'none'}}>
                            {`https://gitpastebackend.onrender.com/easyaccess?name=${user.name}&&folder=${params.id}&&token=${data.fileKey}&&id=${data._id}&&duration=${time}`}
                          </p>
                          <p>{data.fileName}</p>
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "center",
                              alignItems: "center",
                              flexWrap: "wrap",
                            }}
                          >
                            <button
                              onClick={(e) => {
                                shareUrl(data._id,e);
                              }}
                              className="Common-Btn"
                            >
                              Share
                            </button>
                            <div className="Common-Btn updateFile">
                              <p>Update</p>
                              <input
                                type="file"
                                onChange={(e) => {
                                  fileUpdate(e, data._id);
                                }}
                              />
                            </div>
                            <button
                              onClick={() => {
                                deleteFolderFile(data._id);
                              }}
                              className="Common-Btn"
                            >
                              Delete
                            </button>
                          </div>
                          <div className="Link-Form">
                            <label>
                              Enter Time duration between 5 minutes to 1440
                              minutes
                            </label>{" "}
                            <input
                              type="number"
                              min={5}
                              max={1440}
                              onChange={(e) => {
                                changeTime(e);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })
              : 'No Data'
          }
        </div>
      </div>
      <AlertBox />
    </>
  );
};

export default Files;
