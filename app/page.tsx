import Image from "next/image";
import UploadFile from "./uploadFile";
import DisplayFile from "./displayFile";
import FileManager from "./fileManager";

export default function Home() {
  return (
    <div>
      <FileManager/>
    </div>
  );
}
