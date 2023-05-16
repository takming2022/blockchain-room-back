import React,{useState} from 'react'
import { IconEye } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Group, Button } from '@mantine/core';
import { ethers } from 'ethers';
import { abi, address } from '../Contract/Contract';

const Check_address = () => {
    const [opened, { open, close }] = useDisclosure(false);
    const [hello_dev, sethello_dev] = useState()
    async function check_address() {
        open()
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
            const  devv=[]
            const ans=""
             await contractInstance_provider.getAllAuthorizedAddresses()
            .then((e) =>{
                const addressesArray = e.split("<br>");
                const formattedAddresses = addressesArray.join("\n");
                sethello_dev(formattedAddresses)
            })
            
          

        } catch (error) {

        }

    }
    return (
        <div><ActionIcon variant="outline" onClick={check_address}><IconEye size="1rem" /></ActionIcon>
            <Modal opened={opened} onClose={close} title="管理員名單" centered >
                
                {hello_dev}
            </Modal></div>
    )
}

export default Check_address