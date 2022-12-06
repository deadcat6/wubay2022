import {Avatar, Box, Button, Divider, TextField} from "@mui/material";
import {FlexBox} from "components/flex-box";
import UserDashboardHeader from "../../../components/UserDashboardHeader";
import CustomerDashboardNavigation from "../customer-dashboard/Navigations";
import CustomerDashboardLayout from "../customer-dashboard";
import {H5, Span} from "components/Typography";
import {formatTime} from '../../../components/formatTime';
import Link from "next/link";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import {AttachFile, Email} from "@mui/icons-material";
import React, {useEffect, useRef, useState} from "react";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {doc, onSnapshot} from "firebase/firestore";
import {database} from "../../../firebase/firebase_config";
import ImageIcon from '@mui/icons-material/Image';

const PaymentMethodEditor = () => {


  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {data: session} = useSession();
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null)
  useEffect(() => {
    const getMegs = () => {
      //setLoading(true);
      const unSub = onSnapshot(doc(database, "chats", router.query.id), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });
      setLoading(false);
      return () => {
        unSub();
      };
    };
    checkSessions() && router.isReady && getMegs();


  }, [router.isReady, session]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({behaviour: "smooth"});
    }
  }, [messages]);

  const checkSessions = () => {
    if (!session) {
      //setDialogOpen(true);
      return false;
    }
    return true;
  }

  async function sendHandler() {
    if (checkSessions() && router.isReady) {
      if (!text && !img) {
        return
      }

      let formData = new FormData();
      formData.append("chatId", router.query.id);
      formData.append("myId", session.user.id);
      formData.append("text", text);
      if (img) {
        formData.append("imageFile", img[0]);
      }

      fetch('/api/chat/newMessage', {
        method: "POST",
        body: formData,
      }).then(r => {
        //console.log(r);
        setText("");
        setImg(null);
      })
      //await router.push('/user/orders')
    }
  }

  return loading ? (
    <CustomerDashboardLayout>
      <LoadingSpinner text='Loading...'/>
    </CustomerDashboardLayout>
  ) : (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Email}
        title="Chatting"
        button={
          <Link href="/user/chats" passHref>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                px: 4,
              }}
            >
              Back to My Chats
            </Button>
          </Link>
        }
        navigation={<CustomerDashboardNavigation/>}
      />

      <Box sx={{
        height: "30em",
        overflowY: "scroll",
      }}>
        {messages?.map((item, ind) => {
          //console.log(item)
          if (item.senderId === session.user.id && (!!item.text || !!item.img)) {
            return (
              <FlexBox gap={2} mb={4} key={ind} sx={{flexDirection: 'row-reverse'}}>
                <Avatar src={item.senderAvatar}/>
                <Box sx={{maxWidth: "90%"}} ref={scrollRef}>
                  <FlexBox sx={{justifyContent: "flex-end"}}>
                    <H5 fontWeight="600" mt={0} mb={0}>
                      {item.senderName}
                    </H5>
                  </FlexBox>
                  <FlexBox sx={{justifyContent: "flex-end"}}>
                    <Span color="grey.600">
                      {formatTime(item.date.seconds * 1000)}
                    </Span>
                  </FlexBox>
                  {!!item.text &&
                    <Box borderRadius="10px" bgcolor="grey.200" p={2} mt={2}>
                      <FlexBox sx={{justifyContent: "flex-end"}}>
                        {item.text}
                      </FlexBox>
                    </Box>
                  }

                  <FlexBox justifyContent="flex-end">
                    <img style={{maxWidth: "250px"}} src={item.img} alt=""/>
                  </FlexBox>
                </Box>
              </FlexBox>
            )
          } else if (!!item.text || !!item.img) {
            return (
              <FlexBox gap={2} mb={4} key={ind}>
                <Avatar src={item.senderAvatar}/>
                <Box sx={{maxWidth: "90%"}} ref={scrollRef}>
                  <H5 fontWeight="600" mt={0} mb={0}>
                    {item.senderName}
                  </H5>
                  <Span color="grey.600">
                    {formatTime(item.date.seconds * 1000)}
                  </Span>
                  {!!item.text &&
                    <Box borderRadius="10px" bgcolor="grey.200" p={2} mt={2}>
                      {item.text}
                    </Box>
                  }
                  <Box>
                    <img style={{maxWidth: "250px"}} src={item.img} alt=""/>
                  </Box>

                </Box>
              </FlexBox>
            )
          }

        })}
      </Box>

      {messages && (
        <>
          <Divider
            sx={{
              mb: 4,
              borderColor: "grey.300",
            }}
          />

          <TextField
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            //rows={8}
            fullWidth
            multiline
            sx={{
              mb: 1,
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendHandler();
              }
            }}
            placeholder="Write your message here..."
          />
          <FlexBox sx={{justifyContent: "flex-end"}}>
            <Box mr={2} py={1}>
              <input
                type="file"
                style={{display: "none"}}
                id="file"
                onChange={(e) => {
                  //console.log(e.target.files)
                  setImg(e.target.files)
                }}
              />
            <label htmlFor="file">
              <ImageIcon />
            </label>
            </Box>
            <Button
              color="primary"
              variant="contained"
              onClick={sendHandler}
              sx={{
                //ml: "auto",
                display: "block",
              }}
            >
              Sent Message
            </Button>

          </FlexBox>

        </>
      )}


    </CustomerDashboardLayout>
  );
};


export default PaymentMethodEditor;