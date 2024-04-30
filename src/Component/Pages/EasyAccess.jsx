import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Timer from "../Timer/Timer";
import { baseURL } from "../baseUrl";
import AlertBox from "../AlertBox/AlertBox";
const EasyAccess = () => {
  const param = useParams();
  const [minutes, setMinutes] = useState(param.time);
  const [seconds, setSeconds] = useState(0);
  const [data, setData] = useState();

  const getFile = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "ff",
        userName: param?.username,
        folderName: param?.folder,
        fileId: param?.id,
        linkKey: param?.key,
        duration: +param?.time,
      }),
    };

    const response = await fetch(`${baseURL}access-file`, options);
    const responseData = await response.json();
    if(!responseData.status){
        setMinutes(0)
        setSeconds(0)
    }
    setData(responseData);
  };

  const downloadFile = () => {
    const arrayBuffer = new Uint8Array(data?.fileData?.data);

    const blob = new Blob([arrayBuffer]);

    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.setAttribute("download", data.fileName);

    document.body.appendChild(link);

    link.click();

    link.parentNode.removeChild(link);
    URL.revokeObjectURL(blobUrl);

    setMinutes(0);
    setSeconds(0);
  };

  useEffect(() => {
    if (param) {
      getFile();
    }
  }, []);

  return (
    <>
      <section className="Easy-Access">
        <div className="Clock">
          <Timer
            minutes={minutes}
            setMinutes={setMinutes}
            seconds={seconds}
            setSeconds={setSeconds}
          />
        </div>
        <h1>Folder Name {param.folder}</h1>
        <div className="Download-File">
          <img
            src={require("../../Assets/Images/fileDownload.png")}
            alt="download"
          />
          {minutes === 0 && seconds === 0 && data?.status === false ? (
            <p>Link Expired</p>
          ) : (
            <button className="Common-Btn" onClick={downloadFile}>
              Download File
            </button>
          )}
        </div>
      </section>
      <AlertBox />
    </>
  );
};

export default EasyAccess;
