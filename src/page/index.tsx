import React, { useState } from "react";
import kid_slogan from "../static/kid_slogan.svg";
import kid_letter from "../static/kid_letter.svg";
import sakura_avatar from "../static/sakura_avatar.jpeg";
import style from "./index.module.less";
import { Avatar, Calendar, Message } from "@arco-design/web-react";
import TypeWriterEffect from "../utils";

const App = () => {
  const [cardOpen, setCardOpen] = useState<boolean>(false);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  return (
    <>
      {!showInfo && (
        <div className={style.flip_card}>
          <div
            className={
              cardOpen ? style.flip_card_inner_open : style.flip_card_inner
            }
            onClick={() => {
              setCardOpen(true);
            }}
          >
            <div className={style.flip_card_front}>
              <img src={kid_slogan} alt="" className={style.kid_slogan} />
            </div>
            <div className={style.flip_card_back}>
              <img src={kid_letter} alt="" className={style.kid_slogan} />
            </div>
          </div>
        </div>
      )}
      {!showInfo && (
        <div className={style.text_wrapper}>
          <div className={style.avatar_wrapper}>
            <Avatar>
              <img alt="avatar" src={sakura_avatar} />
            </Avatar>
            <span>小樱</span>
          </div>
          {!cardOpen && (
            <TypeWriterEffect
              multiText={["这是…… 怪盗基德的预告通知书？快打开看看！！！"]}
            />
          )}
          {cardOpen && (
            <TypeWriterEffect
              multiText={[
                "！！！怪盗基德又要去偷宝石了！！！",
                "他要在哪天出现？？？",
                "让机智的我来想一想……",
                "“阳光久久不愿离开”这说的是……",
                "“艾叶远远飘来清香”这说的是……",
                "啊我知道了！怪盗基德会在这一天出现！快帮我在日历上点击这一天吧~",
              ]}
              onDisplayFinish={() => {
                setShowCalendar(true);
              }}
            />
          )}
        </div>
      )}
      {showCalendar && (
        <Calendar
          panel
          className={style.calendar_wrapper}
          onChange={(date) => {
            if (
              date.year() === 2023 &&
              date.month() === 5 &&
              date.date() === 22
            ) {
              Message.info({
                id: "alert",
                content: "答对了，你真聪明！",
                showIcon: false,
                className: style.right_message,
                duration: 1000,
                position: "bottom",
              });
              setTimeout(() => {
                setShowCalendar(false);
                setShowInfo(true);
              }, 1000);
            } else {
              Message.info({
                id: "alert",
                content: "好像不太对，再想想哦~",
                showIcon: false,
                className: style.right_message,
                duration: 3000,
                position: "bottom",
              });
            }
          }}
        />
      )}
      {showInfo && (
        <>
          <div className={style.text_info_wrapper}>
            <div className={style.avatar_wrapper}>
              <Avatar>
                <img alt="avatar" src={sakura_avatar} />
              </Avatar>
              <span>小樱</span>
            </div>
            <TypeWriterEffect
              multiText={[
                "hi~我是百变小樱，快跟我一起来守护宝石吧！",
                "欢迎参加赵越伟&杨心玥的婚礼Party",
                "一起忘掉烦恼",
                "度过一个high玩之夜吧！",
              ]}
              onDisplayFinish={() => {
                setTimeout(() => {
                  document.getElementById("root").style.display = "none";
                  document.getElementById("content").style.display = "block";
                }, 1000);
              }}
              startDelay={0}
              multiTextDelay={0}
            />
          </div>
        </>
      )}
    </>
  );
};

export default App;
