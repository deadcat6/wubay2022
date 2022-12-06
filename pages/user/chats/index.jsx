import East from "@mui/icons-material/East";
import {Avatar, Box, Card, Chip, IconButton, styled, Typography,} from "@mui/material";
import {FlexBox} from "components/flex-box";
import UserDashboardHeader from "../../../components/UserDashboardHeader";
import CustomerDashboardNavigation from "../customer-dashboard/Navigations";
import CustomerDashboardLayout from "../customer-dashboard";
import {H2, Span} from "components/Typography";
import Link from "next/link";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import {Email} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {doc, onSnapshot} from "firebase/firestore";
import {database} from "../../../firebase/firebase_config";
import {formatTime} from "../../../components/formatTime";
import {H6, Paragraph, Small} from "../../../components/Typography";

const TableRow = styled(Card)({
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  borderRadius: "10px",
  cursor: "pointer",
  "& > *": {
    flex: "1 1 0",
  },
  "& .pre": {
    whiteSpace: "pre",
  },
});
const StyledChip = styled(Chip)(({theme, green}) => ({
  height: 26,
  margin: "6px",
  padding: " 0 0.25rem",
  color: green ? theme.palette.success.main : theme.palette.primary.main,
  backgroundColor: green
    ? theme.palette.success[100]
    : theme.palette.primary.light,
}));

const TicketList = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {data: session} = useSession();
  //const [chats, setChats] = useState([]);

  const [chats, setChats] = useState([]);
  const [chatsLength, setChatsLength] = useState(0);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(database, "userChats", session.user.id), (doc) => {
        setChats(doc.data());

      });
      //setLoading(false);
      return () => {
        unsub();
      };
    };
    if (session) {
      getChats();
      let length = 0;
      if (chats) {
        Object.entries(chats)?.map((chat) => {
          length++;
          //console.log(chat);
        });
      }
      setChatsLength(length);
    }
  }, [session]);


  return loading ? (
    <CustomerDashboardLayout>
      <LoadingSpinner text='Loading...'/>
    </CustomerDashboardLayout>
  ) : (
    <CustomerDashboardLayout>
      <UserDashboardHeader
        icon={Email}
        title="My Chats"
        navigation={<CustomerDashboardNavigation/>}
        // button={
        //   <Link href="/user/products/new" passHref>
        //     <Button
        //       variant="outlined"
        //       color="secondary"
        //       sx={{
        //         px: 4,
        //       }}
        //     >
        //       Post New Product
        //     </Button>
        //   </Link>
        // }
      />
      {!chats && (
        <Card>
          <Box
            py={8}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <H2>You Have No Chat</H2>
          </Box>
        </Card>
      )}
      {!!chats && Object.entries(chats)?.sort(
        (a, b) => b[1].date - a[1].date).map((chat) => {
          //console.log(chat)
          return (
            <Link href={'/user/chats/' + chat[0]} key={chat[0]}>
              <TableRow
                sx={{
                  my: "1rem",
                  p: "15px 24px",
                }}
              >
                <FlexBox>
                  <Box mr={3}>
                    <Avatar
                      src={chat[1].userInfo.photoURL}
                    />
                  </Box>

                  <Box>
                    <Span >
                      {chat[1].userInfo.displayName}
                    </Span>
                    <FlexBox alignItems="center" flexWrap="wrap"  >
                      {!!chat[1].lastMessage ? (<H6>{chat[1].lastMessage.text.slice(0, 30)}...</H6>) : (
                        <small >Please Send A Message</small>)}
                      <StyledChip  label={formatTime(chat[1].date.seconds * 1000)} size="small" green={1}/>
                    </FlexBox>
                  </Box>
                </FlexBox>


                <Typography
                  flex="0 0 0 !important"
                  textalign="center"
                  color="grey.600"
                >
                  <IconButton>
                    <East
                      onClick={() => router.push(`/user/chats/${chat[0]}`)}
                      fontSize="small"
                      color="inherit"
                      sx={{
                        transform: ({direction}) =>
                          `rotate(${direction === "rtl" ? "180deg" : "0deg"})`,
                      }}
                    />
                  </IconButton>
                </Typography>
              </TableRow>
            </Link>
          )
        }
      )}


      {/*<FlexBox justifyContent="center" mt={5}>*/}
      {/*  <Pagination*/}
      {/*    count={5}*/}
      {/*    color="primary"*/}
      {/*    variant="outlined"*/}
      {/*    onChange={(data) => console.log(data)}*/}
      {/*  />*/}
      {/*</FlexBox>*/}
    </CustomerDashboardLayout>
  );
};

export default TicketList;
