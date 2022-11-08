import {Email, Inventory2, Person, ShoppingCart} from "@mui/icons-material";
import {Card, styled, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {Fragment} from "react";
import {Box} from "@mui/system";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react"; // custom styled components

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

  useEffect(() => {
    async function getUserInfo(user) {
      const res = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({user: user}),
        headers: {'Content-Type': 'application/json'}
      });
      const data = await res.json();
      const profile = data.userData;

      setLinkList([
        {
          title: "YOUR ACCOUNT",
          list: [
            {
              href: "/user/profile",
              title: "Profile",
              icon: Person,
              count: profile.myProducts.length + profile.myOrders.length + profile.usersChats.length,
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
              count: profile.usersChats.length,
            },

          ],
        }
      ]);
      return data.userData;
    }

    if (session) {
      //console.log(session)
      getUserInfo(session.user);
    }

  }, [session]);
  const {pathname} = useRouter();
  //console.log(profile);

  return (
    <Card>
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="grey.600" fontSize="12px">
            {item.title}
          </Typography>

          {item.list.map((item) => (
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
          ))}
        </Fragment>
      ))}
    </Card>
  );
};

export default Navigations;
