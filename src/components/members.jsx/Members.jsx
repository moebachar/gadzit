import React, { useEffect, useState } from "react";
import Default from "../../assets/images/user.webp";
import "./members.scss";
import { customSort } from "./utils";

//Firebase
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { app, db } from "../../configs/firebaseConfig";
import { storage } from "../../configs/firebaseConfig";

//MUI
import Chip from "@mui/material/Chip";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function Members(props) {
  const [members, setMembers] = useState([]);
  const [currentMemberIndex, setCurrentmMemberIndex] = useState(0);
  const [labeledMembers, setLabeledMembers] = useState([]);
  useEffect(() => {
    const getMembers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const mappedUsers = querySnapshot.docs.map((doc) => {
        return { uid: doc.id, ...doc.data() };
      });
      const sortedMembers = customSort(mappedUsers);
      setMembers(sortedMembers);
      setLabeledMembers(
        sortedMembers.map(({ displayName }, index) => {
          return { label: displayName, index };
        })
      );
    };
    getMembers();
  }, []);

  const handleNextMemeber = () => {
    const newCurrentMemberIndex = currentMemberIndex + 1;
    if (newCurrentMemberIndex == members.length) setCurrentmMemberIndex(0);
    else {
      setCurrentmMemberIndex(newCurrentMemberIndex);
    }
  };

  const handlePrevMemeber = () => {
    const newCurrentMemberIndex = currentMemberIndex - 1;
    if (newCurrentMemberIndex < 0) setCurrentmMemberIndex(members.length - 1);
    else {
      setCurrentmMemberIndex(newCurrentMemberIndex);
    }
  };

  if (members.length !== 0) {
    const {
      displayName,
      description,
      bureau,
      role,
      github,
      instagram,
      linkedin,
      image,
    } = members[currentMemberIndex];
    return (
      <div className="member" id="members">
        <img className="member__image" src={image ? image : Default} />
        <div className="member__content">
          <div className="member__content__intro">
            <span className="member__content__intro__name">{displayName}</span>
            <Chip icon={bureau ? <StarBorderIcon /> : null} label={role} />
          </div>
          <div className="member__content__description">{description}</div>
          <div className="member__content__footer">
            <div className="member__content__footer__media">
              {github && (
                <a href={github} target="_blank">
                  <GitHubIcon
                    sx={{
                      cursor: "pointer",
                      color: "white",
                    }}
                  />
                </a>
              )}
              {instagram && (
                <a href={instagram} target="_blank">
                  <InstagramIcon
                    sx={{
                      cursor: "pointer",
                      color: "white",
                    }}
                  />
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank">
                  <LinkedInIcon
                    sx={{
                      cursor: "pointer",
                      color: "white",
                    }}
                  />
                </a>
              )}
            </div>
            <div className="member__content__footer__controle">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={labeledMembers}
                onChange={(event, newValue) => {
                  if (newValue) setCurrentmMemberIndex(newValue.index);
                }}
                sx={{ width: 200 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=""
                    placeholder="Search a member"
                    variant="standard"
                  />
                )}
              />
              <ArrowBackIosNewIcon
                sx={{ cursor: "pointer" }}
                onClick={handlePrevMemeber}
              />
              <ArrowForwardIosIcon
                sx={{ cursor: "pointer" }}
                onClick={handleNextMemeber}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Members;
