import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { Welcome } from "@/components/Home/Welcome/welcome";

import { useEffect } from "react";
import CardSection from "@/components/Home/CardSection/card_section";
import Carousel from "@/components/Common/CarouselSlicker/Carousel";
import {
  Container,
  createTheme,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ServiceCard from "@/components/Common/ServiceCard/ServiceCard";
import GetStarted from "@/components/Common/GetStarted/GetStarted";
import OurTeam from "@/components/Common/OurTeam/OurTeam";

const inter = Inter({ subsets: ["latin"] });

const services = [
  {
    title: "Virtual Consultation",
    description: "Connect with our doctors from the comfort of your home.",
  },
  {
    title: "Prescription Refills",
    description: "Request refills for your medications easily online.",
  },
  {
    title: "Health Monitoring",
    description: "Track your health metrics with our monitoring tools.",
  },
  {
    title: "Specialist Referrals",
    description: "Get referrals to specialists based on your needs.",
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#4a90e2",
    },
    secondary: {
      main: "#d5006d",
    },
  },
});

export default function Home() {
  return (
    <>
      <div style={{ width: "98vw" }}>
        <Carousel />
        <ThemeProvider theme={theme}>
            <Container>
                <Typography variant="h3" align="center" gutterBottom sx={{ marginTop: 5, color: 'primary.main' }}>
                    Telemedicine Services
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {services.map((service, index) => (
                        <Grid item xs={12} sm={6} md={6} key={index}> 
                            <div style={{ animationDelay: `${index * 0.1}s` }}>
                                <ServiceCard title={service.title} description={service.description} />
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
        <OurTeam/>
        <GetStarted/>
      </div>
    </>
  );
}
