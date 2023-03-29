import { VscJson } from "react-icons/vsc";
import { GrReactjs } from "react-icons/gr";
import { SiJavascript, SiTypescript } from "react-icons/si";
import { AiFillHtml5 } from "react-icons/ai";
import { FaDocker, FaPython } from "react-icons/fa";
import { RiCss3Fill } from "react-icons/ri";
import { FcInfo } from "react-icons/fc";
import { BsGit } from "react-icons/bs";

export const IconPack = {
  json: (
    <VscJson color="#FFA500" display="block" style={{ marginTop: "7px" }} />
  ),
  js: (
    <SiJavascript
      color="#F0DB4F"
      display="block"
      style={{ marginTop: "7px" }}
    />
  ),
  html: (
    <AiFillHtml5 color="#E34C26" display="block" style={{ marginTop: "7px" }} />
  ),
  css: (
    <RiCss3Fill color="#3C99DC" display="block" style={{ marginTop: "7px" }} />
  ),
  py: <FaPython color="#4B8BBE" display="block" style={{ marginTop: "7px" }} />,
  Docker: <FaDocker display="block" style={{ marginTop: "7px" }} />,
  jsx: (
    <GrReactjs color="#61DBFB" display="block" style={{ marginTop: "7px" }} />
  ),
  ts: (
    <SiTypescript
      color="#0F75BC"
      display="block"
      style={{ marginTop: "7px" }}
    />
  ),
  tsx: (
    <GrReactjs color="#0F75BC" display="block" style={{ marginTop: "7px" }} />
  ),
  md: <FcInfo display="block" style={{ marginTop: "7px" }} />,
  gitignore: (
    <BsGit color="#E34C26" display="block" style={{ marginTop: "7px" }} />
  ),
};
