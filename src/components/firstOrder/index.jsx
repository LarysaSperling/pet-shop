import {
  Box,
  Typography,
  Button,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import LayoutContainer from "../layoutContainer";
import Section from "../section";
import firstOrderPets from "../../assets/images/first-order-pets.png";
import { API_URL, API_ENDPOINTS } from "../../constants/api";
import useLocalStorage from "../../hooks/useLocalStorage";

function FirstOrder() {
  const [formData, setFormData] = useLocalStorage("discountForm", {
  name: "",
  phone: "",
  email: "",
});

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (submitted) {
      setSubmitted(false);
    }
  };

  const validate = () => {
    const nextErrors = {
      name: "",
      phone: "",
      email: "",
    };

    if (!formData.name.trim()) {
      nextErrors.name = "Please enter your name";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Please enter your phone number";
    } else if (!/^[+\d()\s-]{6,20}$/.test(formData.phone.trim())) {
      nextErrors.phone = "Invalid phone number";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Please enter your email";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      nextErrors.email = "Invalid email address";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) return;

    try {
      await axios.post(`${API_URL}${API_ENDPOINTS.SALE}/send`, formData);

      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
      });
      setErrors({
        name: "",
        phone: "",
        email: "",
      });
    } catch (error) {
      console.error("Discount request error:", error);
    }
  };

  const inputSx = {
    height: "58px",
    borderRadius: "8px",
    color: "#FFFFFF",
    fontFamily: "Montserrat, sans-serif",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "130%",
    backgroundColor: "transparent",
    "& input": {
      color: "#FFFFFF",
      WebkitTextFillColor: "#FFFFFF",
      padding: "16px",
      fontFamily: "Montserrat, sans-serif",
      fontWeight: 500,
      fontSize: "20px",
      lineHeight: "130%",
      backgroundColor: "transparent",
      caretColor: "#FFFFFF",
    },
    "& input::placeholder": {
      color: "#FFFFFF",
      opacity: 1,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FFFFFF",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FFFFFF",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#FFFFFF",
      borderWidth: "1px",
    },
    "& input:-webkit-autofill": {
      WebkitTextFillColor: "#FFFFFF",
      caretColor: "#FFFFFF",
      WebkitBoxShadow: "0 0 0 1000px transparent inset",
      boxShadow: "0 0 0 1000px transparent inset",
      transition: "background-color 9999s ease-in-out 0s",
      borderRadius: "8px",
    },
    "& input:-webkit-autofill:hover": {
      WebkitTextFillColor: "#FFFFFF",
      WebkitBoxShadow: "0 0 0 1000px transparent inset",
      boxShadow: "0 0 0 1000px transparent inset",
    },
    "& input:-webkit-autofill:focus": {
      WebkitTextFillColor: "#FFFFFF",
      WebkitBoxShadow: "0 0 0 1000px transparent inset",
      boxShadow: "0 0 0 1000px transparent inset",
    },
  };

  const helperTextSx = {
    marginLeft: 0,
    marginTop: "6px",
    color: "#FFFFFF",
    opacity: 0.85,
    fontFamily: "Montserrat, sans-serif",
    fontSize: "14px",
    lineHeight: "120%",
  };

  return (
    <Section
      sx={{
        maxWidth: "1440px",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          background:
          "linear-gradient(90deg, #0D50FF 0%, #2451C6 100%)",
          borderRadius: "12px",
          pt: { xs: "24px", md: "32px" },
          overflow: "hidden",
        }}
      >
        <LayoutContainer>
          <Typography
            sx={{
              margin: 0,
              marginBottom: { xs: "24px", md: "32px" },
              textAlign: "center",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: { xs: "40px", md: "64px" },
              lineHeight: "110%",
              color: "#FFFFFF",
            }}
          >
            5% off on the first order
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 516px" },
              alignItems: "end",
              gap: { xs: "24px", md: "32px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
            >
              <Box
                component="img"
                src={firstOrderPets}
                alt="Pets"
                sx={{
                  width: "100%",
                  maxWidth: { xs: "420px", md: "748px" },
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                pb: { xs: "24px", md: "32px" },
                width: "100%",
                maxWidth: "516px",
                justifySelf: "end",
              }}
            >
              <FormControl fullWidth error={Boolean(errors.name)}>
                <OutlinedInput
                  name="name"
                  id="first-order-name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                  sx={inputSx}
                />
                {errors.name && (
                  <FormHelperText sx={helperTextSx}>
                    {errors.name}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={Boolean(errors.phone)}>
                <OutlinedInput
                  name="phone"
                  id="first-order-phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  sx={inputSx}
                />
                {errors.phone && (
                  <FormHelperText sx={helperTextSx}>
                    {errors.phone}
                  </FormHelperText>
                )}
              </FormControl>

              <FormControl fullWidth error={Boolean(errors.email)}>
                <OutlinedInput
                  name="email"
                  id="first-order-email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  sx={inputSx}
                />
                {errors.email && (
                  <FormHelperText sx={helperTextSx}>
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>

              <Button
                type="submit"
                disabled={submitted}
                variant="contained"
                sx={{
                  height: "58px",
                  borderRadius: "8px",
                  backgroundColor: "#FFFFFF",
                  color: submitted ? "#0D50FF" : "#282828",
                  textTransform: "none",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  lineHeight: "130%",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: submitted ? "#FFFFFF" : "#282828",
                    color: submitted ? "#0D50FF" : "#FFFFFF",
                    boxShadow: "none",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#FFFFFF",
                    color: "#0D50FF",
                    opacity: 1,
                  },
                }}
              >
                {submitted ? "Request Submitted" : "Get a discount"}
              </Button>
            </Box>
          </Box>
        </LayoutContainer>
      </Box>
    </Section>
  );
}

export default FirstOrder;