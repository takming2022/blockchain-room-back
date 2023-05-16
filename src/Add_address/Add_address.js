import React, { useState } from 'react'
import { ActionIcon } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { Dialog, Group, Button, TextInput, Text } from '@mantine/core';
import Web3 from 'web3';
import { abi, address } from '../Contract/Contract';
import { ethers } from 'ethers';
import { IconEye } from '@tabler/icons-react';
import Check_address from './Check_address';
const Add_address = () => {
    const [opened, { toggle, close }] = useDisclosure(false);
    const [add_address, setadd_address] = useState("")
    const [opened2, { open, close2 }] = useDisclosure(false);
    async function add_add_address() {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const contractInstance_singner = new ethers.Contract(address, abi, signer);
            //使用singer 連接合約 對合約有可讀寫權限
            const contractInstance_provider = new ethers.Contract(
              address,
              abi,
              provider
            );
            var wallet_address;
            const ether_accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            var account = ether_accounts[0];
            wallet_address = account;
            let amount = Web3.utils.toWei("0");
            try {
              const cleraroom = await contractInstance_singner.addAuthorizedAddress(add_address, { from: wallet_address, value: amount })
              await cleraroom.wait()
                .then(res => {
                })
            } catch (error) {
        
            }
        

        } catch (error) {

        }
        close()
    }
    return (
        <>
            <ActionIcon variant="outline" onClick={toggle}><IconPlus size="1rem" /></ActionIcon>
            <Check_address />
            <Dialog opened={opened} withCloseButton onClose={close} size="lg" radius="md">
                <Text size="sm" mb="xs" weight={500}>
                    新增帳號
                </Text>

                <Group align="flex-end">
                    <TextInput placeholder="0x000000000000000" sx={{ flex: 1 }} defaultValue={add_address} onChange={(e) => { setadd_address(e.target.value) }} />
                    <Button onClick={add_add_address}>新增</Button>
                    
                </Group>
            </Dialog>
            
        </>
    )
}

export default Add_address