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
        alignItems: "center",
        gap: "32px",
        mb: "40px",
      }}
    >
      <Typography
        sx={{
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 700,
          fontSize: { xs: "40px", md: "64px" },
          lineHeight: "110%",
          color: "#282828",
          whiteSpace: "nowrap",
        }}
      >
        Shopping cart
      </Typography>

      <Box
        sx={{
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
          minWidth: "170px",
          height: "36px",
          px: "16px",
          borderRadius: "6px",
          borderColor: "#DDDDDD",
          color: "#8B8B8B",
          textTransform: "none",
          fontFamily: "Montserrat, sans-serif",
          fontWeight: 500,
          fontSize: "16px",
          lineHeight: "126%",
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
      <LayoutContainer sx={{ mt: "40px", mb: "80px" }}>
        {pageTitle}

        {cartItems.length === 0 ? (
          <Box>
            <Typography
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "130%",
                color: "#282828",
                mb: "32px",
              }}
            >
              Looks like you have no items in your basket currently.
            </Typography>

            <Button
              component={Link}
              to="/products"
              sx={{
                height: "58px",
                px: "56px",
                borderRadius: "8px",
                backgroundColor: "#0D50FF",
                color: "#FFFFFF",
                textTransform: "none",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
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
              gridTemplateColumns: { xs: "1fr", lg: "1fr 548px" },
              gap: "32px",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {cartItems.map((item) => (
                <Box
                  key={item.id}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "200px 1fr" },
                    border: "1px solid #DDDDDD",
                    borderRadius: "12px",
                    overflow: "hidden",
                    position: "relative",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <Box
                    component="img"
                    src={`${API_URL}/${item.image}`}
                    alt={item.title}
                    sx={{
                      width: "100%",
                      height: { xs: "220px", sm: "180px" },
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <Box sx={{ p: "24px", position: "relative" }}>
                    <IconButton
                      onClick={() => dispatch(removeFromCart(item.id))}
                      sx={{
                        position: "absolute",
                        top: "16px",
                        right: "16px",
                        color: "#282828",
                        fontSize: "24px",
                      }}
                    >
                      ✕
                    </IconButton>

                    <Typography
                      sx={{
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 500,
                        fontSize: "20px",
                        lineHeight: "130%",
                        color: "#282828",
                        mb: "32px",
                        pr: "40px",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "32px",
                        flexWrap: "wrap",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          border: "1px solid #DDDDDD",
                          borderRadius: "8px",
                          overflow: "hidden",
                          height: "58px",
                        }}
                      >
                        <Button
                          onClick={() => dispatch(decreaseCount(item.id))}
                          sx={{
                            minWidth: "58px",
                            color: "#282828",
                            borderRadius: 0,
                          }}
                        >
                          -
                        </Button>

                        <Box
                          sx={{
                            width: "58px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 600,
                            fontSize: "20px",
                            color: "#282828",
                            borderLeft: "1px solid #DDDDDD",
                            borderRight: "1px solid #DDDDDD",
                          }}
                        >
                          {item.count}
                        </Box>

                        <Button
                          onClick={() => dispatch(increaseCount(item.id))}
                          sx={{
                            minWidth: "58px",
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
                          gap: "16px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Montserrat, sans-serif",
                            fontWeight: 600,
                            fontSize: "40px",
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
                              fontSize: "20px",
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
                p: "32px",
                height: "fit-content",
              }}
            >
              <Typography
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 700,
                  fontSize: "40px",
                  lineHeight: "110%",
                  color: "#282828",
                  mb: "24px",
                }}
              >
                Order details
              </Typography>

              <Typography
                sx={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 500,
                  fontSize: "40px",
                  lineHeight: "130%",
                  color: "#8B8B8B",
                  mb: "16px",
                }}
              >
                {totalCount} items
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  gap: "16px",
                  mb: "32px",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                    fontSize: "40px",
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
                    fontSize: { xs: "48px", md: "64px" },
                    lineHeight: "110%",
                    color: "#282828",
                  }}
                >
                  ${totalPrice}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                      height: "58px",
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
                      height: "58px",
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
                      height: "58px",
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
                  sx={{
                    height: "58px",
                    borderRadius: "8px",
                    backgroundColor: "#0D50FF",
                    color: "#FFFFFF",
                    textTransform: "none",
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                    fontSize: "20px",
                    lineHeight: "130%",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#282828",
                      boxShadow: "none",
                    },
                  }}
                >
                  Order
                </Button>
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