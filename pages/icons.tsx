import React, { Fragment, ReactNode } from "react";
import {
  AiFillCaretDown,
  AiFillCaretUp,
  AiFillEdit,
  AiFillFileExcel,
  AiFillFilePdf,
  AiFillHome,
  AiFillPrinter,
  AiFillSetting,
  AiFillSignal,
  AiOutlineBars,
  AiOutlineDownload,
  AiOutlineEdit,
} from "react-icons/ai";
import { FaFilterCircleXmark } from "react-icons/fa6";
function icons() {
  const multipeIconBox: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    cursor: "pointer",
    height: "3rem",
    width: "2rem",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconRowProperties: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignContent: "space-between",
    alignItems: "center",
    gap: "1.5rem",
  };

  const upArrowClickHandler = () => alert("Clicked Up");
  const downArrowClickHandler = () => alert("Clicked Down");

  const Iconbox = ({ children }: { children: ReactNode }) => (
    <div
      style={{
        display: "flex",
        height: "3rem",
        width: "2rem",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
  return (
    <Fragment>
      <div>
        <h1>React Icons</h1>
        <div className="icon-row" style={iconRowProperties}>
          <div style={multipeIconBox}>
            <AiFillCaretUp onClick={upArrowClickHandler} />
            <AiFillCaretDown onClick={downArrowClickHandler} />
          </div>
          <Iconbox>
            <AiFillEdit size={24}/>
          </Iconbox>
          <Iconbox>
            <AiFillFileExcel size={24} />
          </Iconbox>
          <Iconbox>
          <AiFillFilePdf size={24}/>
          </Iconbox>
          <Iconbox>
          <AiFillHome size={24}/>
          </Iconbox>
          <Iconbox>
          <AiFillPrinter size={24}></AiFillPrinter>
          </Iconbox>
          <Iconbox>
          <AiFillSetting size={24}></AiFillSetting>
          </Iconbox>
          <Iconbox>
          <AiFillSignal size={24}></AiFillSignal>
          </Iconbox>
          <Iconbox>
          <AiOutlineBars size={24}></AiOutlineBars>
          </Iconbox>
          <Iconbox>
          <AiOutlineDownload size={24}></AiOutlineDownload>
          </Iconbox>
          <Iconbox>
          <AiOutlineEdit size={24}></AiOutlineEdit>
          </Iconbox>
          <FaFilterCircleXmark/>
        </div>
      </div>
    </Fragment>
  );
}

export default icons;
