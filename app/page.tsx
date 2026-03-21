import Image from "next/image";
import UploadFile from "./uploadFile";
import DisplayFile from "./displayFile";
import FileManager from "./fileManager";

export default function Home() {
  return (
    <div>
      <h1>Day of Ops Assitant</h1>
      <FileManager/>
    </div>
  );
}
