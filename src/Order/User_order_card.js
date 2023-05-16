import React, { useEffect, useState } from "react";
import { createStyles, Tabs, ActionIcon, Paper,Group, Avatar, Text, Accordion,Table,Box } from "@mantine/core";
import { IconHome2 } from '@tabler/icons-react';
const User_order_card = ({ order_id }) => {
  const useStyles = createStyles((theme) => ({
    paper: {
      background:
        theme.colorScheme === "dark" ? theme.colors.dark[6] : "#D3D8DE",
      height: "100px",
      // borderRadius: '8px',
      width: "100%",
    },
    userCardcontener: {
      // border: theme.colorScheme === 'dark' ? '1px solid' + theme.colors.dark[4] : '1px solid #D3D8DE',
      // borderRadius: '10px',

      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],
      maxHeight: "100px",
      position: "relative",
      width: "100%",
    },
    roomImg_user: {
      // borderRadius: '10px',
      width: "100%",
      height: "100%",
      borderBottomLeftRadius: "10px",
      borderTopLeftRadius: "10px",
    },
    deleteButton: {
      background: "#F26F52",
      width: "100%",
      height: "100%",
      borderBottomRightRadius: "10px",
      borderTopRightRadius: "10px",
      border: "none",
    },
  }));
  const { classes } = useStyles();

  const [Contract_Room_wallet_addr, set_Contract_Room_wallet_addr] =
    useState("");
  const [order_uuid, set_order_uuid] = useState("");
  const [room_uuid, set_room_uuid] = useState(0);
  const [Contract_Room_address, set_Contract_Room_address] = useState("");
  const [Contract_Room_name, set_Contract_Room_name] = useState("");
  const [Contract_Room_money, set_Contract_Room_money] = useState(0);
  const [timestempStart, set_timestempStart] = useState(0);
  const [timestempEnd, set_timestempEnd] = useState(0);
  const [User_wallet_address, set_User_wallet_address] = useState("v");
  const [Order_time_start, set_Order_time_start] = useState("");
  const [Order_time_end, set_Order_time_end] = useState("");
  const [Order_controller, set_Order_controller] = useState(false)
  async function get_user_room_info() {
  }
  useEffect(() => {
    get_user_room_info();
    console.log(1);
  }, []);
  return (
    <Box
    sx={(theme) => ({
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      textAlign: 'center',
      padding: theme.spacing.xl,
      borderRadius: theme.radius.md,
      cursor: 'pointer',

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
      },
    //   border: '1px solid  purple',
      flexBasis: '49%', /* 調整此數值以控制每行顯示的div數量 */
      marginBottom: '5px',
      height: '100px',
      borderRadius: '20px',
    })}
  >
    Box lets you add inline styles with sx prop
  </Box>


  );
};

export default User_order_card;