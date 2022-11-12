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
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {doc, onSnapshot} from "firebase/firestore";
import {database} from "../../../firebase/firebase_config";
import {uploadImage} from "../../../firebase/firebaseUpload";

const PaymentMethodEditor = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const {data: session} = useSession();

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const [messages, setMessages] = useState([]);

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

  const checkSessions = () => {
    if (!session) {
      //setDialogOpen(true);
      return false;
    }
    return true;
  }

  async function sendHandler() {
    if (checkSessions() && router.isReady) {

      let formData = new FormData();
      formData.set("testFile", img[0])

      fetch('/api/chat/newMessage', {
        method: "POST",
        body: formData,
      }).then(r => {
        console.log(r);
      })



      // let imgUrl = null;
      // if (img) {
      //   //console.log("yes" + img[0])
      //   uploadImage(img[0]).then(
      //     async(imgUrl) => {
      //       console.log("45645456456456456456" +imgUrl)
      //
      //       const response = await fetch('/api/chat/newMessage', {
      //         method: 'POST',
      //         body: JSON.stringify({
      //           chatId: router.query.id,
      //           myId: session.user.id,
      //           imgUrl: imgUrl,
      //           text
      //         }),
      //         headers: {'Content-Type': 'application/json'}
      //       });
      //       const data = await response.json();
      //       console.log(data.message);
      //     }
      //   );
      //}



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
        title={messages && messages[0]?.senderName}
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
        maxHeight: 610,
        overflowY: "scroll",
      }}>


        {messages?.map((item, ind) => {
          //console.log(item)
          if (item.senderId === session.user.id) {
            return (
              <FlexBox gap={2} mb={4} key={ind} sx={{flexDirection: 'row-reverse'}}>
                <Avatar src={item.senderAvatar}/>
                <Box>
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
                  <Box borderRadius="10px" bgcolor="grey.200" p={2} mt={2}>
                    <FlexBox sx={{justifyContent: "flex-end"}}>
                      {item.text}
                    </FlexBox>

                    <Avatar
                      src={item.img}
                      sx={{
                        borderRadius: "8px",
                      }}
                    />
                  </Box>
                </Box>
              </FlexBox>
            )
          }
          return (
            <FlexBox gap={2} mb={4} key={ind}>
              <Avatar src={item.senderAvatar}/>
              <Box>
                <H5 fontWeight="600" mt={0} mb={0}>
                  {item.senderName}
                </H5>

                <Span color="grey.600">
                  {formatTime(item.date.seconds * 1000)}
                </Span>

                <Box borderRadius="10px" bgcolor="grey.200" p={2} mt={2}>
                  {item.text}
                </Box>
                <Avatar
                  src={item.img}
                  sx={{
                    borderRadius: "8px",
                  }}
                />
                {/*<img src={item.img} alt=""/>*/}

              </Box>
            </FlexBox>
          )
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
            onChange={(e) => {
              setText(e.target.value);
            }}
            //rows={8}
            fullWidth
            multiline
            sx={{
              mb: 3,
            }}
            placeholder="Write your message here..."
          />
          <input
            type="file"
            style={{display: "none"}}
            id="file"
            onChange={(e) => {
              console.log(e.target.files)
              setImg(e.target.files)
            }}
          />
          <label htmlFor="file">
            <AttachFile/>
          </label>

          <Button
            color="primary"
            variant="contained"
            onClick={sendHandler}
            sx={{
              ml: "auto",
              display: "block",
            }}
          >
            Sent Message
          </Button>
        </>
      )}


    </CustomerDashboardLayout>
  );
};


export default PaymentMethodEditor;
