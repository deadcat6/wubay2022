import { Avatar, Box, Button, Divider, TextField } from "@mui/material";
import {FlexBox} from "components/flex-box";
import UserDashboardHeader from "../../../components/UserDashboardHeader";
import CustomerDashboardNavigation from "../customer-dashboard/Navigations";
import CustomerDashboardLayout from "../customer-dashboard";
import { H5, Span } from "components/Typography";
import {formatTime} from '../../../components/formatTime';
import Link from "next/link";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import {Inventory2} from "@mui/icons-material";
import React from "react";
import {useRouter} from "next/router";
import {useState} from "react";
import {useSession} from "next-auth/react";
import {useEffect} from "react";
import {doc, onSnapshot} from "firebase/firestore";
import {database} from "../../../firebase/firebase_config";


const PaymentMethodEditor = () => {

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {data: session} = useSession();

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMegs = () => {
      const unSub = onSnapshot(doc(database, "chats", router.query.id), (doc) => {
        doc.exists() && setMessages(doc.data().messages);
      });

      return () => {
        unSub();
      };
    };
    router.isReady && getMegs();
  }, [router.isReady]);

  const checkSessions = () => {
    if (!session) {
      //setDialogOpen(true);
      return false;
    }
    return true;
  }

  async function sendHandler() {
    if (checkSessions() && router.isReady) {
      const response = await fetch('/api/chat/newMessage', {
        method: 'POST',
        body: JSON.stringify({
          chatId: router.query.id,
          myId: session.user.id,
          img,
          text
        }),
        headers: {'Content-Type': 'application/json'}
      });
      await response.json();
     // await router.push('/user/orders')
    }
  }

  return loading ? (
    <CustomerDashboardLayout>
      <LoadingSpinner text='Loading...'/>
    </CustomerDashboardLayout>
  ) : (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Inventory2}
        title="My Chats"
        button={
          <Link href="/user/chats" passHref>
            <Button
              color="primary"
              sx={{
                px: 4,
                bgcolor: "primary.light",
              }}
            >
              Back to My Chats
            </Button>
          </Link>
        }
        navigation={<CustomerDashboardNavigation />}
      />


      {messages?.map((item, ind) => {
        console.log(item)
        return (
          <FlexBox gap={2} mb={4} key={ind}>
            <Avatar src={item.senderAvatar} />
            <Box>
              <H5 fontWeight="600" mt={0} mb={0}>
                {item.senderName}
              </H5>

              <Span color="grey.600">
                {formatTime(item.date)}
              </Span>

              <Box borderRadius="10px" bgcolor="grey.200" p={2} mt={2}>
                {item.text}
              </Box>
            </Box>
          </FlexBox>
        )
      })}

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
        rows={8}
        fullWidth
        multiline
        sx={{
          mb: 3,
        }}
        placeholder="Write your message here..."
      />

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
    </CustomerDashboardLayout>
  );
};

export default PaymentMethodEditor;
