"use client";

import { useState } from "react";
import UploadFile from "./uploadFile";
import DisplayFile from "./displayFile";
import EditFile from "./editFile";

export default function FileManager() {
  const [cleanedJson, setCleanedJson] = useState<any[]>([]);

  return (
    <div>
      <UploadFile setCleanedJson={setCleanedJson} />
      <DisplayFile cleanedJson={cleanedJson} />
      {/*<EditFile cleanedJson={cleanedJson} setCleanedJson={setCleanedJson} />*/}
    </div>
  );
}