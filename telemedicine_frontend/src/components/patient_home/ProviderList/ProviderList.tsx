import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Pagination,
  TablePagination,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getProviderList, ProviderPage } from "@/redux/slice/providersSlice";
import { useRouter } from "next/router";
import { InitialStatePatientProfile } from "@/redux/slice/patientProfileSlice";

interface User {
  userID: number;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: string;
  phone: string;
  countryName: string;
  stateName: string;
  cityName: string;
  address: string;
}

interface Provider {
  providerID: number;
  specialty: string;
  gender: string;
  qualifications: string;
  consultationFee: number;
  availableFrom: string;
  availableTo: string;
  user: User;
}
interface ApplyFilterProps {
  data: {
    disease: string;
    location: string;
    specialty: string;
    description: string;
  };
}

type ResponseList = {
  providerProfile: Provider;
  userPic: string;
};

const specialties = [
  "General Medicine",
  "Neurology",
  "Endocrinology",
  "Cardiology",
];
const locations = ["New York", "Los Angeles", "Chicago"];
const diseases = ["Flu", "Cancer", "Diabetes"];

const ProviderList: React.FC<ApplyFilterProps> = ({ data }) => {
  const dispatch = useAppDispatch();
  const router=useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDisease, setSelectedDisease] = useState(data.disease);
  const [selectedLocation, setSelectedLocation] = useState(data.location);
  const [selectedSpecialty, setSelectedSpecialty] = useState(data.specialty);
  const [selectedGender, setSelectedGender] = useState("");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(8);
  const patientProfile = useAppSelector((state: { patientProfile: InitialStatePatientProfile }) => state.patientProfile);


  const providerList: ResponseList[] = useAppSelector(
    (state) => state.providers.providerList
  );
  

  const totalPaginationElements = useAppSelector(
    (state) => state.providers.totalElements
  );
 

  useEffect(() => {
    dispatch(
      getProviderList({
        page: 0,
        rowsPerPage: 4,
        search: searchTerm,
        disease: selectedDisease,
        gender: selectedGender,
        cityName: selectedLocation,
        speciality: selectedSpecialty,
      })
    );
  }, [
    searchTerm,
    selectedDisease,
    selectedLocation,
    selectedSpecialty,
    selectedGender,
  ]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedDisease("");
    setSelectedLocation("");
    setSelectedSpecialty("");
    setSelectedGender("");
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleButtonClick=(data:ResponseList)=>{
    const { providerProfile }=data;
    const queryString = `?providerID=${providerProfile.providerID}&userID=${providerProfile.user.userID}`;
    router.push(`/patient_home/appointment/${patientProfile.patientID}${queryString}`);
  }

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <TextField
          label="Search by Doctor's Name"
          variant="outlined"
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ flexGrow: 1, mr: 2 }}
        />
        <FormControl sx={{ minWidth: 120, mr: 2 }}>
          <InputLabel>Disease</InputLabel>
          <Select
            value={selectedDisease}
            onChange={(e) => setSelectedDisease(e.target.value as string)}
            label="Disease"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {diseases.map((disease) => (
              <MenuItem key={disease} value={disease}>
                {disease}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, mr: 2 }}>
          <InputLabel>Location</InputLabel>
          <Select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value as string)}
            label="Location"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {locations.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, mr: 2 }}>
          <InputLabel>Gender</InputLabel>
          <Select
            value={selectedGender}
            onChange={(e) => setSelectedGender(e.target.value as string)}
            label="Gender"
          >
            <MenuItem value="MALE">Male</MenuItem>
            <MenuItem value="FEMALE">Female</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, mr: 2 }}>
          <InputLabel>Specialty</InputLabel>
          <Select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value as string)}
            label="Specialty"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {specialties.map((specialty) => (
              <MenuItem key={specialty} value={specialty}>
                {specialty}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={resetFilters} size="large" sx={{height:"55px"}}>
          Reset
        </Button>
      </Box>

      <Grid container spacing={2}>
        {providerList.map((provider) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={provider.providerProfile.providerID}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                backgroundColor: "#E3F2FD",
                "&:hover": {
                  transform: "scale(1.05)",
                  transition: "transform 0.2s",
                },
                maxWidth: 250,
                margin: "auto",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={
                  "http://localhost:8080/userProfile/images/get/" +
                    provider.userPic || "default-profile.png"
                }
                alt={`${provider.providerProfile.user.firstName} ${provider.providerProfile.user.lastName}`}
                sx={{ objectFit: "cover" }} 
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  component="div"
                  style={{ fontWeight: "bold" }}
                >
                  {provider.providerProfile.user.firstName}{" "}
                  {provider.providerProfile.user.lastName}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Qualifications: {provider.providerProfile.qualifications}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Availability: {provider.providerProfile.availableFrom} to{" "}
                  {provider.providerProfile.availableTo}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Consultation Fee: Rs.{provider.providerProfile.consultationFee}
                </Typography>
              </CardContent>
              <Box sx={{ padding: 1 }}>
                <Button variant="contained" color="primary" fullWidth onClick={()=>handleButtonClick(provider)}>
                  Book Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      >
        <TablePagination
          rowsPerPageOptions={[4, 8, 12]}
          component="div"
          count={totalPaginationElements}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ backgroundColor: "#E3F2FD" }}
        />
      </Box>
    </Box>
  );
};

export default ProviderList;
