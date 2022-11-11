import East from "@mui/icons-material/East";
import {Avatar, Box, Card, Chip, IconButton, styled, Typography,} from "@mui/material";
import {FlexBox} from "components/flex-box";
import UserDashboardHeader from "../../../components/UserDashboardHeader";
import CustomerDashboardNavigation from "../customer-dashboard/Navigations";
import CustomerDashboardLayout from "../customer-dashboard";
import {Span} from "components/Typography";
import Link from "next/link";
import LoadingSpinner from "../../../components/ui/LoadingSpinner";
import {Email} from "@mui/icons-material";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";
import {doc, onSnapshot} from "firebase/firestore";
import {database} from "../../../firebase/firebase_config";
import {formatTime} from "../../../components/formatTime";

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
      //setLoading(true);
      //console.log( session.user.id);
      const unsub = onSnapshot(doc(database, "userChats", session.user.id), (doc) => {
        //console.log("userChats")
        setChats(doc.data());
        //console.log(doc.data())


      });
      //setLoading(false);
      return () => {
        unsub();
      };
    };
    if (session) {
      getChats();
      let length = 0;
      Object.entries(chats)?.map((chat) => {
        length++;
      });
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

      {Object.entries(chats)?.sort(
        (a, b) => b[1].date - a[1].date).map((chat) => {
          console.log(chat)
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
                    {!!chat[1].lastMessage ? (<span>{chat[1].lastMessage.text.slice(0, 30)}...</span>) : (
                      <span>Please Send A Message</span>)}
                    <FlexBox alignItems="center" flexWrap="wrap" pt={1} m={-0.75}>
                      <StyledChip label={chat[1].userInfo.displayName} size="small" green={1}/>
                      <Span className="pre" m={0.75} color="grey.600">
                        {formatTime(chat[1].date.seconds * 1000)}
                      </Span>
                    </FlexBox>
                  </Box>
                </FlexBox>


                <Typography
                  flex="0 0 0 !important"
                  textAlign="center"
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
