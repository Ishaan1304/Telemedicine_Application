import Layout from "@/components/provider_home/Layout/Layout";
import { useRouter } from "next/router";
import styles from "./Appointment.module.css";

import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import UserCard from "@/components/provider_home/Prescription/UserCard";
import { useEffect } from "react";
import PrescriptionForm from "@/components/provider_home/Prescription/PrescriptionForm";
import PreviousAppointments from "@/components/provider_home/Prescription/PreviousAppointments";

const PrescriptionDetail = () => {
  
  return (
    <>
      <Layout>
        <div className={styles.contentDiv}>
          <UserCard/>
          <PrescriptionForm />
          <PreviousAppointments />
        </div>
      </Layout>
    </>
  );
};

export default PrescriptionDetail;
