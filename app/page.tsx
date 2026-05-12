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
      <div className="flex flex-row">
        <div className="flex flex-col">
          <h3>Extras</h3>
          <ExtrasData/>
        </div>
        <div className="flex flex-col pl-2">
          <h3>Call Outs</h3>
          <CallOutsData/>
        </div>
      </div>
      <FileManager/>
    </div>
  );
}
