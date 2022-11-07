import {Email, Inventory2, Person, ShoppingCart} from "@mui/icons-material";
import {Card, styled, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {Fragment} from "react";
import {Box} from "@mui/system";
import Link from "next/link"; // custom styled components

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
  const {pathname} = useRouter();
  return (
    <Card>
      {linkList.map((item) => (
        <Fragment key={item.title}>
          <Typography p="26px 30px 1rem" color="grey.600" fontSize="12px">
            {item.title}
          </Typography>

          {item.list.map((item) => (
            <Link href={item.href} passHref>


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

const linkList = [
  {
    title: "YOUR ACCOUNT",
    list: [
      {
        href: "/user/profile",
        title: "Profile",
        icon: Person,
        count: 1,
      },
      {
        href: "/user/products",
        title: "Products",
        icon: Inventory2,
        count: 19,
      },
      {
        href: "/user/orders",
        title: "Orders",
        icon: ShoppingCart,
        count: 5,
      },
      {
        href: "/user/chats",
        title: "Chats",
        icon: Email,
        count: 1,
      },

    ],
  }
];
export default Navigations;
