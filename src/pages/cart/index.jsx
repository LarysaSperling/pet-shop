import {
  Box,
  Typography,
  Button,
  IconButton,
  OutlinedInput,
  Modal,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseCount,
  decreaseCount,
  removeFromCart,
  clearCart,
} from "../../redux/slices/cartSlice";
import LayoutContainer from "../../components/layoutContainer";
import { API_URL, API_ENDPOINTS } from "../../constants/api";
import FallbackImage from "../../components/fallbackImage";
import { MOBILE, PAGE_SPACING, mobile } from "../../theme/mobile";

function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const totalCount = cartItems.reduce((sum, item) => sum + item.count, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.discont_price ?? item.price) * item.count,
    0
  );

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
    if (hasErrors || cartItems.length === 0) return;

    setIsSending(true);
    setSubmitError("");

    try {
      await axios.post(`${API_URL}${API_ENDPOINTS.ORDER}/send`, {
        customer: formData,
        products: cartItems.map((item) => ({
          id: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          discont_price: item.discont_price,
          count: item.count,
        })),
        totalCount,
        totalPrice,
      });

      setIsModalOpen(true);
      dispatch(clearCart());

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
      console.error("Order submit error:", error);
      setSubmitError(
        "Sorry, we could not place your order. Please check your connection and try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalBackdropSx = {
    bgcolor: "rgba(40, 40, 40, 0.4)",
    backdropFilter: "blur(2px)",
  };

  const pageTitle = (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        gap: { xs: "12px", sm: "20px", md: "32px" },
        mb: { xs: "24px", sm: "32px", md: "40px" },
      }}
    >
      <Typography
        sx={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          fontSize: mobile(MOBILE.h1, { sm: "40px", md: "64px" }),
          lineHeight: "110%",
          color: "#282828",
          whiteSpace: { xs: "normal", sm: "nowrap" },
        }}
      >
        Shopping cart
      </Typography>

      <Box
        sx={{
          display: { xs: "none", sm: "block" },
          flex: 1,
          height: "1px",
          backgroundColor: "#DDDDDD",
        }}
      />

      <Button
        component={Link}
        to="/"
        variant="outlined"
        sx={{
          width: "fit-content",
          minWidth: { xs: "140px", sm: "170px" },
          height: { xs: "32px", sm: "36px" },
          px: { xs: "14px", sm: "16px" },
          alignSelf: { xs: "flex-start", sm: "center" },
          borderRadius: "6px",
          borderColor: "#DDDDDD",
          color: "#8B8B8B",
          textTransform: "none",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 500,
          fontSize: { xs: "14px", sm: "16px" },
          lineHeight: "126%",
          whiteSpace: "nowrap",
          "&:hover": {
            borderColor: "#282828",
            color: "#282828",
            backgroundColor: "transparent",
          },
        }}
      >
        Back to the store
      </Button>
    </Box>
  );

  return (
    <>
      <LayoutContainer sx={PAGE_SPACING}>
        {pageTitle}

        {cartItems.length === 0 ? (
          <Box>
            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: mobile(MOBILE.body, "20px"),
                lineHeight: "130%",
                color: "#282828",
                mb: mobile("24px", "32px"),
              }}
            >
              Looks like you have no items in your basket currently.
            </Typography>

            <Button
              component={Link}
              to="/products"
              sx={{
                height: mobile(MOBILE.controlHeight, "58px"),
                px: { xs: "24px", sm: "56px" },
                width: { xs: "100%", sm: "auto" },
                whiteSpace: "nowrap",
                borderRadius: "8px",
                backgroundColor: "#0D50FF",
                color: "#FFFFFF",
                textTransform: "none",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: mobile(MOBILE.buttonFont, "20px"),
                lineHeight: "130%",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#282828",
                  boxShadow: "none",
                },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "minmax(0, 1fr)",
                lg: "minmax(0, 1fr) 548px",
              },
              gap: mobile("24px", "32px"),
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: mobile("12px", "16px"),
                minWidth: 0,
              }}
            >
              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "grid",
                    // phones: small image on the left, details on the right
                    gridTemplateColumns: { xs: "auto minmax(0, 1fr)", sm: "200px 1fr" },
                    alignItems: { xs: "start", sm: "stretch" },
                    border: "1px solid #DDDDDD",
                    borderRadius: "12px",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <FallbackImage
                    path={item.image}
                    alt={item.title}
                    sx={{
                      width: { xs: "88px", sm: "100%" },
                      height: { xs: "88px", sm: "180px" },
                      m: { xs: "12px", sm: 0 },
                      borderRadius: { xs: "8px", sm: 0 },
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <Box
                    sx={{
                      p: { xs: "12px 12px 12px 0", sm: "24px" },
                      position: "relative",
                      minWidth: 0,
                    }}
                  >
                    <IconButton
                      onClick={() => dispatch(removeFromCart(item.id))}
                      aria-label={`Remove ${item.title} from cart`}
                      sx={{
                        position: "absolute",
                        top: { xs: "4px", sm: "16px" },
                        right: { xs: "4px", sm: "16px" },
                        color: "#282828",
                        fontSize: mobile("18px", "24px"),
                      }}
                    >
                      ✕
                    </IconButton>

                    <Typography
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 500,
                        fontSize: mobile(MOBILE.body, "20px"),
                        lineHeight: "130%",
                        color: "#282828",
                        mb: mobile("12px", "32px"),
                        pr: mobile("32px", "40px"),
                        // phones: at most 2 lines, then "…"
                        display: { xs: "-webkit-box", sm: "block" },
                        WebkitLineClamp: { xs: 2, sm: "unset" },
                        WebkitBoxOrient: "vertical",
                        overflow: { xs: "hidden", sm: "visible" },
                      }}
                      title={item.title}
                    >
                      {item.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: mobile("8px 12px", "32px"),
                        flexWrap: "wrap",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          border: "1px solid #DDDDDD",
                          borderRadius: "8px",
                          overflow: "hidden",
                          height: mobile("40px", "58px"),
                        }}
                      >
                        <Button
                          onClick={() => dispatch(decreaseCount(item.id))}
                          aria-label="Decrease quantity"
                          sx={{
                            minWidth: mobile("40px", "58px"),
                            color: "#282828",
                            borderRadius: 0,
                          }}
                        >
                          -
                        </Button>

                        <Box
                          aria-label="Quantity"
                          sx={{
                            width: mobile("40px", "58px"),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 600,
                            fontSize: mobile(MOBILE.body, "20px"),
                            color: "#282828",
                            borderLeft: "1px solid #DDDDDD",
                            borderRight: "1px solid #DDDDDD",
                          }}
                        >
                          {item.count}
                        </Box>

                        <Button
                          onClick={() => dispatch(increaseCount(item.id))}
                          aria-label="Increase quantity"
                          sx={{
                            minWidth: mobile("40px", "58px"),
                            color: "#282828",
                            borderRadius: 0,
                          }}
                        >
                          +
                        </Button>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: mobile("8px", "16px"),
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 600,
                            fontSize: mobile(MOBILE.price, "40px"),
                            lineHeight: "110%",
                            color: "#282828",
                          }}
                        >
                          ${Number(item.discont_price ?? item.price) * item.count}
                        </Typography>

                        {item.discont_price && (
                          <Typography
                            sx={{
                              fontFamily: "Montserrat, sans-serif",
                              fontWeight: 500,
                              fontSize: mobile(MOBILE.oldPrice, "20px"),
                              lineHeight: "130%",
                              color: "#8B8B8B",
                              textDecoration: "line-through",
                            }}
                          >
                            ${Number(item.price) * item.count}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                backgroundColor: "#F1F3F4",
                borderRadius: "12px",
                p: mobile(MOBILE.blockPadding, "32px"),
                height: "fit-content",
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontSize: mobile(MOBILE.h3, "40px"),
                  lineHeight: "110%",
                  color: "#282828",
                  mb: mobile("12px", "24px"),
                }}
              >
                Order details
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  fontSize: mobile(MOBILE.subtitle, "40px"),
                  lineHeight: "130%",
                  color: "#8B8B8B",
                  mb: mobile("4px", "16px"),
                }}
              >
                {totalCount} {totalCount === 1 ? "item" : "items"}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  gap: "16px",
                  mb: mobile("20px", "32px"),
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                    fontSize: mobile(MOBILE.subtitle, "40px"),
                    lineHeight: "130%",
                    color: "#8B8B8B",
                  }}
                >
                  Total
                </Typography>

                <Typography
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 700,
                    fontSize: mobile(MOBILE.priceLarge, { xs: "48px", md: "64px" }),
                    lineHeight: "110%",
                    color: "#282828",
                  }}
                >
                  ${totalPrice}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: mobile("12px", "16px"),
                }}
              >
                <Box>
                  <OutlinedInput
                    fullWidth
                    name="name"
                    id="cart-name"
                    placeholder="Name"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{
                      height: mobile(MOBILE.controlHeight, "58px"),
                      borderRadius: "8px",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                  {errors.name && (
                    <Typography sx={{ mt: "6px", fontSize: "14px", color: "error.main" }}>
                      {errors.name}
                    </Typography>
                  )}
                </Box>

                <Box>
                  <OutlinedInput
                    fullWidth
                    name="phone"
                    id="cart-phone"
                    placeholder="Phone number"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    sx={{
                      height: mobile(MOBILE.controlHeight, "58px"),
                      borderRadius: "8px",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                  {errors.phone && (
                    <Typography sx={{ mt: "6px", fontSize: "14px", color: "error.main" }}>
                      {errors.phone}
                    </Typography>
                  )}
                </Box>

                <Box>
                  <OutlinedInput
                    fullWidth
                    name="email"
                    id="cart-email"
                    placeholder="Email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{
                      height: mobile(MOBILE.controlHeight, "58px"),
                      borderRadius: "8px",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                  {errors.email && (
                    <Typography sx={{ mt: "6px", fontSize: "14px", color: "error.main" }}>
                      {errors.email}
                    </Typography>
                  )}
                </Box>

                <Button
                  type="submit"
                  disabled={isSending}
                  sx={{
                    height: mobile(MOBILE.controlHeight, "58px"),
                    borderRadius: "8px",
                    backgroundColor: "#0D50FF",
                    color: "#FFFFFF",
                    textTransform: "none",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    fontSize: mobile(MOBILE.buttonFont, "20px"),
                    lineHeight: "130%",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#282828",
                      boxShadow: "none",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "#0D50FF",
                      color: "#FFFFFF",
                      opacity: 0.7,
                    },
                  }}
                >
                  {isSending ? "Sending..." : "Order"}
                </Button>

                {submitError && (
                  <Typography
                    role="alert"
                    sx={{ fontSize: "14px", color: "error.main" }}
                  >
                    {submitError}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </LayoutContainer>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        slotProps={{
          backdrop: {
            sx: modalBackdropSx,
          },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: {
              xs: "calc(100% - 32px)",
              sm: "480px",
              md: "548px",
            },
            maxHeight: "calc(100vh - 32px)",
            overflowY: "auto",
            backgroundColor: "#0D50FF",
            borderRadius: { xs: "10px", sm: "12px" },
            p: { xs: "20px", sm: "24px", md: "32px" },
            outline: "none",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
          }}
        >
          <IconButton
            onClick={closeModal}
            sx={{
              position: "absolute",
              top: { xs: "10px", sm: "12px" },
              right: { xs: "10px", sm: "12px" },
              color: "#FFFFFF",
              p: 0,
            }}
          >
            <Box
              component="span"
              sx={{
                fontSize: { xs: "24px", sm: "28px" },
                lineHeight: 1,
              }}
            >
              ✕
            </Box>
          </IconButton>

          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              fontSize: { xs: "28px", sm: "32px", md: "40px" },
              lineHeight: "110%",
              color: "#FFFFFF",
              mb: { xs: "16px", sm: "20px", md: "24px" },
              pr: { xs: "28px", sm: "32px" },
            }}
          >
            Congratulations!
          </Typography>

          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 500,
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              lineHeight: "130%",
              color: "#FFFFFF",
              opacity: 0.95,
            }}
          >
            Your order has been successfully placed on the website.
          </Typography>

          <Typography
            sx={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 500,
              fontSize: { xs: "16px", sm: "18px", md: "20px" },
              lineHeight: "130%",
              color: "#FFFFFF",
              opacity: 0.95,
              mt: { xs: "12px", sm: "16px" },
            }}
          >
            A manager will contact you shortly to confirm your order.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default CartPage;