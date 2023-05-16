import React, { useState,useEffect } from "react";
import "./Room_Boxs.css";
import User_order_card from "../Order/User_order_card";
import { ScrollArea } from "@mantine/core";
import { abi, address } from "../Contract/Contract";
import { ethers } from "ethers";
import User_room_card from "./User_room_card";
import Rightinput from "./Room_Rightinput";
const Room_Boxs = () => {
  const [CardList, setCardList] = useState([]);
  const [Roomid, setRoomid] = useState("")
  async function get_room_card() {
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

      let api = await contractInstance_provider.romms_length();
      // let room_long = parseInt(api._hex, 16)
      let room_long = parseInt(api, 16);
      // console.log(room_long);
      let room_arr = [];
      let room_obj;
      for (let i = 0; i < room_long; i++) {
        await contractInstance_provider.getroomscard(i).then((e) => {
          room_obj = e;
          console.log(e );
        });
  
        room_arr[i] = (
          <User_room_card
            id={room_obj[4]}
            title_room_name={room_obj[1]} //name
            describe="刊登者:"
            describe_wallet_addr={hidden(room_obj[0])} //address
            image={room_obj[2][0]
            } //image
            setRoomid={setRoomid}
          />
          
        );
        setCardList(room_arr);  }
    } catch (error) {
      alert("請登入小狐狸")
      window.location.reload()
    }

      }





    // setLoading(false)

  function hidden(str) {
    return str.substring(0, 6) + "...." + str.substring(str.length - 4);
  }
  useEffect(() => {
    get_room_card()
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
        <Rightinput Roomid={Roomid} get_room_card={get_room_card} setRoomid={setRoomid}/>
      </div>
    </div>
  );
};

export default Room_Boxs;
