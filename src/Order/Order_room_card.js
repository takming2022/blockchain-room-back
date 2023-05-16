import React, { useEffect, useState } from "react";
import { Card, Image, Text, Group, Badge, createStyles, Center, Button, rem } from '@mantine/core';
import { IconGasStation, IconGauge, IconManualGearbox, IconUsers } from '@tabler/icons-react';
import { IconHome2 } from '@tabler/icons-react';  
import { IconNews } from '@tabler/icons-react';
import { IconAlarm } from '@tabler/icons-react';
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    flexBasis: '49%', /* 調整此數值以控制每行顯示的div數量 */
    marginBottom: '5px',
    height: '100%',
    borderRadius: '20px',
  },

  imageSection: {
    
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {

    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: 'uppercase',
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[5],
  },
}));
const Order_room_card = ({ id,money,room_name,room_address,Ld_wallet_address,timestamp,timestampend,setOrderid}) => {
  const { classes } = useStyles();
  function box_infor(){
    setOrderid(id)
    console.log(id);
  }
  return (
    <Card withBorder radius="md" className={classes.card}>
    <Card.Section className={classes.imageSection}>
      <div>{id}</div>
        
      </Card.Section>
      <Group position="apart" mt="md">
        <div>
          <Text fw={500}>{room_name}</Text>
          <Text fz="xs" c="dimmed">
          {room_address}
          </Text>
        </div>
        <Badge variant="outline" size="xl" ><div style={{display: 'flex',alignItems: 'center'}}><IconNews /></div></Badge>
      </Group>
      <Card.Section className={classes.section} mt="md">
      <Text fz="sm" c="dimmed" className={classes.label}>
          訂房時間
        </Text>
        <div style={{textAlign:'center',height:'30px',display: 'flex',alignItems: 'center'}}>
        <IconAlarm/>{timestamp}~{timestampend}
        </div>
        
      </Card.Section>
      <Card.Section className={classes.section}>
        <Group spacing={30}>
          <Button radius="xl" style={{ flex: 1 }} onClick={box_infor}>
            加載
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
};

export default Order_room_card;