
import "./App.css";
import Room_Boxs from "./Room/Room_Boxs";
import { Box, MantineProvider } from "@mantine/core";
import { Tabs, TabsProps, rem } from '@mantine/core';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import Order_Boxs from "./Order/Order_Boxs";
import Add_address from "./Add_address/Add_address";
function App() {


function StyledTabs(props) {
  return (
    <Tabs
    defaultValue="first"
      unstyled
      styles={(theme) => ({

        tab: {
          ...theme.fn.focusStyles(),
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
          color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
          border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4]}`,
          padding: `${theme.spacing.xs} ${theme.spacing.md}`,
          cursor: 'pointer',
          fontSize: theme.fontSizes.sm,
          display: 'flex',
          alignItems: 'center',

          '&:disabled': {
            opacity: 0.5,
            cursor: 'not-allowed',
          },

          '&:not(:first-of-type)': {
            borderLeft: 0,
          },

          '&:first-of-type': {
            borderTopLeftRadius: theme.radius.md,
            borderBottomLeftRadius: theme.radius.md,
          },

          '&:last-of-type': {
            borderTopRightRadius: theme.radius.md,
            borderBottomRightRadius: theme.radius.md,
          },

          '&[data-active]': {
            backgroundColor: theme.colors.blue[7],
            borderColor: theme.colors.blue[7],
            color: theme.white,
          },
        },

        tabIcon: {
          marginRight: theme.spacing.xs,
          display: 'flex',
          alignItems: 'center',
        },

        tabsList: {
          display: 'flex',
        },
      })}
      {...props}
    />
  );
}
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS>
      <div className="App">
        <StyledTabs >
      <div style={{display:'flex',justifyContent:'center',marginBottom:"-70px",marginTop:'20px'}}>
        <div style={{border: '1px solid  whitesmoke',width:'80%',justifyContent:'center',display:'flex',alignContent:'center',borderRadius:'10px'}}> 
      <Tabs.List>
        <Tabs.Tab value="first" icon={<IconSettings size="1rem" />}>
          房間資訊
        </Tabs.Tab>
        <Tabs.Tab value="messages" icon={<IconMessageCircle size="1rem" />}>
          訂單資訊
        </Tabs.Tab>
      </Tabs.List>
      <div style={{display: 'flex',alignItems: 'center'}}>
      <Add_address />
      </div>
      
    </div>
      </div>
      <Tabs.Panel value="first"><Room_Boxs /></Tabs.Panel>
      <Tabs.Panel value="messages"><Order_Boxs /></Tabs.Panel>
      </StyledTabs>
      </div>
    </MantineProvider>
  );
}

export default App;
