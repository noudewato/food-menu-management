import "./topnav.scss";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "@mui/material";
import { styled } from "@mui/material/styles";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Stack from "@mui/material/Stack";

const Topnav = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  console.log(userInfo)

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));


  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="icons">
          <div className="icon">
            <FullscreenIcon />
          </div>

          <div className="icon">
            <DarkModeOutlinedIcon />
          </div>
        </div>

        <div className="login">
          <div className="picture">
            <Badge>
              <CircleNotificationsIcon className="alertIcon" />4
            </Badge>
          </div>

          <div className="picture">
            <Stack direction="row" spacing={2}>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar alt="Remy Sharp" src={userInfo.image} />
              </StyledBadge>
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Topnav;
