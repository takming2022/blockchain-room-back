import React, { useState,useEffect } from "react";
import "./Order_Boxs.css";
import User_order_card from "./User_order_card";
import { ScrollArea } from "@mantine/core";
import { abi, address } from "../Contract/Contract";
import { ethers } from "ethers";
import User_room_card from "../Room/User_room_card";
import Rightinput from "../Room/Room_Rightinput";
import Order_room_card from "./Order_room_card";
import Order_Rightinput from "./Order_Rightinput";
const Order_Boxs = () => {
  const [CardList, setCardList] = useState([]);
  const [Orderid, setOrderid] = useState("")
  async function get_Order_card() {
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
    //使用Provider 連接合約 只會對合約有可讀權限
    let api = await contractInstance_provider.get_order_length();
    console.log(api);
    // let room_long = parseInt(api._hex, 16)
    let room_long = parseInt(api, 16);
    // console.log(room_long);
    let room_arr = [];
    let room_obj;
    for (let i = 0; i < room_long; i++) {
      await contractInstance_provider.getorderscard(i).then((e) => {
        room_obj = e;
        console.log(e);
      });

      room_arr[i] = (
        <Order_room_card
          id={room_obj[0]}
          money={room_obj[3]}
          room_name={room_obj[4]}
          room_address={room_obj[5]}
          Ld_wallet_address={room_obj[6]}
          timestamp={parseInt(room_obj[7],10)}
          timestampend={parseInt(room_obj[8],10)}
          setOrderid={setOrderid}
        />
        
      );console.log(room_obj[7]);
    }

    setCardList(room_arr);
    } catch (error) {
      
    }

    // setLoading(false)
  }
  function hidden(str) {
    return str.substring(0, 6) + "...." + str.substring(str.length - 4);
  }
  useEffect(() => {
    get_Order_card()
}, [])
  return (
    <div class="flex-container">
      <div class="left-div">
        <ScrollArea
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "40px",
          }}>
          <div className="useroder_box">
            <div className="useroder_card_box">{CardList}</div>
          </div>
        </ScrollArea>
      </div>
      <div class="right-div">
        <Order_Rightinput Orderid={Orderid}/>
      </div>
    </div>
  );
};

export default Order_Boxs;
