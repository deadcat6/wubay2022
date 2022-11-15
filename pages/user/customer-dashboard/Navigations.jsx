import {Email, Inventory2, Person, ShoppingCart} from "@mui/icons-material";
import {Card, styled, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {Fragment, useEffect, useState} from "react";
import {Box} from "@mui/system";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {doc, onSnapshot} from "firebase/firestore";
import {database} from "../../../firebase/firebase_config"; // custom styled components

const StyledNavLink = styled(({children, isCurrentPath, ...rest}) => (
  <a
    {...rest}
  >{children}</a>
))(({theme, isCurrentPath}) => ({
  display: "flex",
  alignItems: "center",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
  marginBottom: "1.5rem",
  justifyContent: "space-between",
  color: isCurrentPath ? "#9e1418" : "inherit",
}));


const Navigations = () => {
  const [linkList, setLinkList] = useState([]);
  const {data: session} = useSession()
  const [chats, setChats] = useState([]);
  const [chatLength, setChatLength] = useState(null);

  useEffect(() => {
    async function getUserInfo(user) {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({user: user}),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      const profile = data.userData;
      let lengthOfChats = 0;
      setLinkList(
        {
          title: "YOUR ACCOUNT",
          list: [
            {
              href: "/user/profile",
              title: "Profile",
              icon: Person,
              count: profile.myProducts.length + profile.myOrders.length,
              //+ profile.usersChats.length,
            },
            {
              href: "/user/products",
              title: "Products",
              icon: Inventory2,
              count: profile.myProducts.length,
            },
            {
              href: "/user/orders",
              title: "Orders",
              icon: ShoppingCart,
              count: profile.myOrders.length,
            },
            {
              href: "/user/chats",
              title: "Chats",
              icon: Email,
              count: 0,
            },

          ],
        }
      );
      return data.userData;
    }

    const getChats = () => {
      const unsub = onSnapshot(doc(database, "userChats", session.user.id), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };

    if (session) {
      //console.log(session)
      getChats();
      getUserInfo(session.user);
    }

  }, [session]);

  useEffect(() => {
    let length = 0;
    Object.entries(chats)?.map((chat) => {
      length++;
    });
    //console.log("length,", length)
    setChatLength(length);
  }, [chats])

  const {pathname} = useRouter();
  //console.log(profile);

  return (
    <Card>
      {linkList && linkList.list &&
        <Fragment key={linkList.title}>
          <Typography p="26px 30px 1rem" color="grey.600" fontSize="12px">
            {linkList.title}
          </Typography>

          {linkList.list.map((item) => {
            if (item.title === 'Chats') {
              item.count = chatLength;
            }
            return (
            <Link href={item.href} passHref key={item.title}>
              <StyledNavLink
                href={item.href}
                key={item.title}
                isCurrentPath={pathname.includes(item.href)}
              >
                <Box display='flex' alignItems="center" gap={1}>
                  <item.icon
                    color="inherit"
                    fontSize="small"
                    className="nav-icon"
                  />
                  <span>{item.title}</span>
                </Box>

                <span>{item.count}</span>
              </StyledNavLink>
            </Link>
          )})}
        </Fragment>
      }

    </Card>
  );
};

export default Navigations;
