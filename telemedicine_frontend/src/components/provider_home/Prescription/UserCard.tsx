import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import userCardStyles from "./UserCardCss";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import {
  getPrescriptionPatientUserProfilePic,
  getUserProfilePic,
  InitialStateUsers,
} from "@/redux/slice/usersSlice";
import Image from "next/image";
import { getPatientProfile, InitialStatePatientProfile } from "@/redux/slice/patientProfileSlice";

const UserCard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { appointmentID, userId, patientId } = router.query;

  const userProfile = useAppSelector(
    (state: { users: InitialStateUsers }) => state.users.prescriptionUserProfile
  );


  const patientProfile = useAppSelector(
    (state: { patientProfile: InitialStatePatientProfile }) => state.patientProfile
  );
  

  useEffect(() => {
    if (userId !== undefined) {
      dispatch(getPrescriptionPatientUserProfilePic(Number(userId)));
      dispatch(getPatientProfile({id:Number(userId)}))
    }
  }, [userId]);

  const profilePicUrl = userProfile?.profilePic
    ? `http://localhost:8080/userProfile/images/get/${userProfile.profilePic}`
    : "/assets/profile.png";

  return (
    <Box sx={userCardStyles.card}>
      <Box sx={userCardStyles.imageContainer}>
        <Image
          src={profilePicUrl}
          alt={`${patientProfile.user.firstName} ${patientProfile.user.lastName}`}
          width={100}
          height={100}
          style={{ border: "1px solid black", borderRadius: "50%" }}
        />
      </Box>
      <Box sx={userCardStyles.details}>
        <Typography sx={{}}>
          Full Name : {`${patientProfile.user.firstName} ${patientProfile.user.lastName}`}
        </Typography>
        <Typography variant="body2">Gender: {patientProfile.gender}</Typography>
        <Typography variant="body2">
          DOB : {patientProfile.dateOfBirth}
        </Typography>
      </Box>
      <Box sx={userCardStyles.details}>
        <Typography>Contact Information</Typography>
        <Typography variant="body2">Mobile: {patientProfile.user.phone}</Typography>
        <Typography variant="body2">Email: {patientProfile.user.email}</Typography>
      </Box>
      <Box sx={userCardStyles.contact}>
      <Typography>Address Information</Typography>
        <Typography variant="subtitle2" sx={{ }}>
          Locality : {patientProfile.user.address}
        </Typography>
        <Typography variant="subtitle2">
          {`${patientProfile.user.cityName}, ${patientProfile.user.stateName}, ${patientProfile.user.countryName}`}
        </Typography>
      </Box>
      <Box sx={userCardStyles.medicalInfo}>
        <Typography sx={userCardStyles.medicalTitle}>Medications : <span style={{color:"black" ,fontSize:"14px"}}>{patientProfile.medications}</span></Typography>
        <Typography sx={userCardStyles.medicalTitle}>Allergies : <span style={{color:"black",fontSize:"14px"}}>{patientProfile.allergies}</span></Typography>
      </Box>
    </Box>
  );
};

export default UserCard;
