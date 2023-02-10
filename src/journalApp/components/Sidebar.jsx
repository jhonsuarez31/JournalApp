import {
  TurnedIn,
  TurnedInNot,
  TurnedInNotOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { SiberItem } from "./SiberItem";

export const Sidebar = ({ drawerWidth = 240 }) => {
  const { displayName } = useSelector((state) => state.auth);

  const { notas } = useSelector((state) => state.journal);
  return (
    <Box
      component={"nav"}
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component={"div"}>
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {notas.map((note) => (
            <SiberItem  {...note} key={note.id}/>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
