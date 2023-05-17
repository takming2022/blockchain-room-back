import { InputBase, Input, ScrollArea, Textarea, Button, Alert } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { abi, address } from "../Contract/Contract";
import Web3 from "web3";
import { ethers } from "ethers";
const Rightinput = ({ Roomid, get_room_card, setRoomid }) => {

  const [Contract_Room_wallet_addr, set_Contract_Room_wallet_addr] =
    useState("");
  const [Contract_phone, set_Contract_phone] = useState("");
  const [Contract_Room_type, set_Contract_Room_type] = useState(0);
  const [Contract_Room_address, set_Contract_Room_address] = useState("");
  const [Contract_introduce, set_Contract_introduce] = useState(""); //房間描述
  const [Contract_Room_name, set_Contract_Room_name] = useState("");
  const [Contract_equiment, set_Contract_equiment] = useState([]); //各種配件
  const [Contract_image_files, set_Contract_image_files] = useState([]);
  const [Contract_Room_money, set_Contract_Room_money] = useState(0);
  const [openorder, setopenorder] = useState(false);
  const [SliderList, setSliderList] = useState([]);
  const [room_uuid_for_order, setroom_uuid_for_order] = useState();
  async function deleteroom() {
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
      const uuid_room = Roomid;
      let amount = Web3.utils.toWei("0.01");
        const cleraroom = await contractInstance_singner.op_clearroom(uuid_room, { from: wallet_address, value: amount })
        await cleraroom.wait()
          .then(res => {
            setroom_uuid_for_order();
            set_Contract_Room_wallet_addr("");
            set_Contract_phone("");
            set_Contract_Room_type(0);
            set_Contract_Room_address("");
            set_Contract_introduce("");
            set_Contract_Room_name("");
            set_Contract_equiment([]);
            set_Contract_image_files([]);
            set_Contract_Room_money(0);
            setRoomid("")
            get_room_card()
  
          })
    } catch (error) {
    }



  }
  async function update_room() {
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
    const uuid_room = Roomid;
    let amount = Web3.utils.toWei("0.01");
    const Romm_type_array = []
    const Romm_img_array = []
    for (let i = 0; i < Contract_Room_type.length; i++) {
      Romm_type_array[i] = Contract_Room_type[i]
    }
    for (let i = 0; i < Contract_image_files.length; i++) {
      Romm_img_array[i] = Contract_image_files[i]
    }
    try {
      const updateroom = await contractInstance_singner.op_update_Ld_room(uuid_room, Contract_phone, Contract_Room_type.toString(),
        Contract_Room_address, Contract_introduce, Contract_Room_name, Romm_type_array,
        uuid_room, Romm_img_array, Contract_Room_money.toString(), Contract_Room_wallet_addr, { from: wallet_address, value: amount })
      await updateroom.wait()
        .then(res => {
          setroom_uuid_for_order();
          set_Contract_Room_wallet_addr("");
          set_Contract_phone("");
          set_Contract_Room_type(0);
          set_Contract_Room_address("");
          set_Contract_introduce("");
          set_Contract_Room_name("");
          set_Contract_equiment([]);
          set_Contract_image_files([]);
          set_Contract_Room_money(0);
          get_room_card()
          window.location.reload()
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
    const uuid_room = Roomid;
      let api = await contractInstance_provider.getrooms(uuid_room);
      setroom_uuid_for_order(uuid_room);
      set_Contract_Room_wallet_addr(api[0]);
      set_Contract_phone(api[1]);
      set_Contract_Room_type(api[2]);
      set_Contract_Room_address(api[3]);
      set_Contract_introduce(api[4]);
      set_Contract_Room_name(api[5]);
      set_Contract_equiment(api[6]);
      set_Contract_image_files(api[8]);
      set_Contract_Room_money(api[9]);
    } catch (error) {
      
    }

  }
  useEffect(() => {
    getromminfo();
  }, [Roomid]);

  return (
    <div style={{ width: "90%", marginTop: "10px", marginBottom: "10px" }}>
      <div style={{ height: "80%" }}>
        <ScrollArea
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "0",
          }}>
          <Input.Wrapper id="input-demo" label="房東錢包地址">
            <Input
              id="input-demo"
              placeholder=""
              defaultValue={Contract_Room_wallet_addr}
              onChange={(e) => { set_Contract_Room_wallet_addr(e.target.value) }}></Input>
          </Input.Wrapper>
          <Input.Wrapper id="input-demo" label="房東手機">
            <Input
              id="input-demo"
              placeholder=""
              defaultValue={Contract_phone}
              onChange={(e) => { set_Contract_phone(e.target.value) }}></Input>
          </Input.Wrapper>
          <Input.Wrapper id="input-demo" label="房型">
            <Input
              id="input-demo"
              placeholder=""
              defaultValue={Contract_Room_type}
              onChange={(e) => { set_Contract_Room_type(e.target.value) }}></Input>
          </Input.Wrapper>
          <Input.Wrapper id="input-demo" label="房間地址">
            <Input
              id="input-demo"
              placeholder=""
              defaultValue={Contract_Room_address}
              onChange={(e) => { set_Contract_Room_address(e.target.value) }}></Input>
          </Input.Wrapper>

          <Input.Wrapper id="input-demo" label="房間名稱">
            <Input
              id="input-demo"
              placeholder=""
              defaultValue={Contract_Room_name}
              onChange={(e) => { set_Contract_Room_name(e.target.value) }}></Input>
          </Input.Wrapper>
          <Input.Wrapper id="input-demo" label="房間金額">
            <Input
              id="input-demo"
              placeholder=""
              defaultValue={Contract_Room_money}
              onChange={(e) => { set_Contract_Room_money(e.target.value) }}></Input>
          </Input.Wrapper>
          <Textarea
            label="房間資訊"
            placeholder=""
            autosize
            minRows={2}
            maxRows={4}
            defaultValue={Contract_introduce}
            onChange={(e) => { set_Contract_introduce(e.target.value) }}
          />
        </ScrollArea>
      </div>
      <div>
        <Button onClick={update_room} color="yellow" radius="md" style={{ width: "100%" }}>
          修改
        </Button>
        <p></p>
        <Button onClick={deleteroom} color="red" radius="md" style={{ width: "100%" }}>
          刪除
        </Button>
      </div>
    </div>
  );
};

export default Rightinput;
