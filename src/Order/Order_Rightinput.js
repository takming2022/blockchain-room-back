import { InputBase, Input, ScrollArea, Textarea, Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { abi, address } from "../Contract/Contract";
import Web3 from "web3";
import { ethers } from "ethers";
const Order_Rightinput = ({ Orderid, get_room_card }) => {
  const [User_wallet_address, setUser_wallet_address] = useState("")
  const [money, setmoney] = useState("")
  const [room_name, setroom_name] = useState("")
  const [Roomaddress, setRoomaddress] = useState("")
  const [Ld_wallet_address, setLd_wallet_address] = useState("")
  const [timestap, settimestap] = useState(0)
  const [timestampend, settimestampend] = useState(0)
  async function deleteroom() {
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
    const uuid_room = Orderid;
    let amount = Web3.utils.toWei("0.01");
    try {
      const cleraroom = await contractInstance_singner.op_clear_order(uuid_room, { from: wallet_address, value: amount })
      await cleraroom.wait()
        .then(res => {
          setUser_wallet_address("")
          setmoney("")
          setroom_name("")
          setRoomaddress("")
          setLd_wallet_address("")
          settimestap(0)
          settimestampend(0)
          // get_room_card()
        })
    } catch (error) {

    }

  }
  async function getromminfo() {
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
      const uuid_room = Orderid;
      let api = await contractInstance_provider.getordersInfo(uuid_room);
      console.log(api);
      setUser_wallet_address(api[2])
      setmoney(api[3])
      setroom_name(api[4])
      setRoomaddress(api[5])
      setLd_wallet_address(api[6])
      settimestap(api[7])
      settimestampend(api[8])
    } catch (error) {

    }

  }
  useEffect(() => {
    getromminfo();
  }, [Orderid]);

  return (
    <div style={{ width: "90%", marginTop: "10px", marginBottom: "10px" }}>
      <div style={{ height: "80%" }}>
        <ScrollArea
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "0",
          }}>
          <Input.Wrapper id="input-demo" label="玩家錢包地址">
            <Input
              id="input-demo"
              placeholder=""
              defaultValue={User_wallet_address}></Input>
          </Input.Wrapper>
          <Input.Wrapper id="input-demo" label="房間金額">
            <Input
              id="input-demo"
              placeholder=""
              defaultValue={money}></Input>
          </Input.Wrapper>
          <Input.Wrapper id="input-demo" label="房間名稱">
            <Input
              id="input-demo"
              placeholder=""
              defaultValue={room_name}></Input>
          </Input.Wrapper>
          <Input.Wrapper id="input-demo" label="房間地址">
            <Input
              id="input-demo"
              placeholder=""
              defaultValue={Roomaddress}></Input>
          </Input.Wrapper>

          <Input.Wrapper id="input-demo" label="房東錢包地址">
            <Input
              id="input-demo"
              placeholder=""
              defaultValue={Ld_wallet_address}></Input>
          </Input.Wrapper>
          <Input.Wrapper id="input-demo" label="訂房起始時間">
            <Input
              id="input-demo"
              placeholder=""
              defaultValue={timestap}></Input>
          </Input.Wrapper>
          <Input.Wrapper id="input-demo" label="訂房結束時間">
            <Input
              id="input-demo"
              placeholder=""
              defaultValue={timestampend}></Input>
          </Input.Wrapper>
        </ScrollArea>
      </div>
      <div>
        <Button onClick={deleteroom} color="red" radius="md" style={{ width: "100%" }}>
          刪除
        </Button>
      </div>
    </div>
  );
};

export default Order_Rightinput;
