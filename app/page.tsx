import Image from "next/image";
import UploadFile from "./uploadFile";
import DisplayFile from "./displayFile";
import FileManager from "./fileManager";
import ExtrasData from "./extrasData";
import CallOutsData from "./callOutsData";


export default function Home() {
  return (
    <div>
      <h1>Day of Ops Assitant</h1>
      <h3>Extras</h3>
      <ExtrasData/>
      <h3>Call Outs</h3>
      <CallOutsData/>
      <FileManager/>
    </div>
  );
}
