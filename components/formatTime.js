
export function formatTime(time) {
  let d = new Date();
  let e = new Date(time);
  let dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let mo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let k = e.getMinutes();
  if (k < 10){
    k = "0";
  }else{
    k = "";
  }
  if (d.getTime()-time >= -9990000 && d.getTime()-time <= 119000) {
    return "Just now";
  } else if (d.getTime()-time <= 3600000) {
    return Math.floor((d.getTime()-time)/60000) + " minutes ago";
  } else if (d.getTime()-time <= 82800000) {
    if (Math.floor((d.getTime()-time)/3600000) === 1) {
      return Math.floor((d.getTime()-time)/3600000) + " hour "+Math.floor((d.getTime()-time)/60000)%60 + " minute ago";
    } else {
      return Math.floor((d.getTime()-time)/3600000) + " hours "+Math.floor((d.getTime()-time)/60000)%60 + " minutes ago";
    }} else if (d.getMonth() + "" + d.getDate() + d.getFullYear() === e.getMonth() + "" + e.getDate() + e.getFullYear()) {
    if (e.getHours() == 0) {
      return "12:" +k+ e.getMinutes() + " AM";
    } else if (e.getHours() == 12) {
      return "12:" +k+ e.getMinutes() + " PM";
    } else if (e.getHours() > 12) {
      return (e.getHours()-12) + ":"+k+ e.getMinutes() + " PM";
    } else {
      return e.getHours() + ":" +k+ e.getMinutes() + " AM";
    }} else if (d.getTime()-time <= 604800000) {
    if (e.getHours() == 0) {
      return dow[e.getDay()] + ", 12:"+k+ e.getMinutes() + " AM";
    } else if (e.getHours() == 12) {
      return dow[e.getDay()] + ", 12:"+k+ e.getMinutes() + " PM";
    } else if (e.getHours() > 12) {
      return dow[e.getDay()] + ", " + (e.getHours()-12) + ":"+k+ e.getMinutes() + " PM";
    } else {
      return dow[e.getDay()] + ", " + e.getHours() + ":"+k+ e.getMinutes() + " AM";
    }} else if (d.getFullYear() == e.getFullYear()) {
    if (e.getHours() == 0) {
      return mo[e.getMonth()] + " " + e.getDate() + ", 12:"+k+ e.getMinutes() + " AM";
    } else if (e.getHours() == 12) {
      return mo[e.getMonth()] + " " + e.getDate() + ", 12:"+k+ e.getMinutes() + " PM";
    } else if (e.getHours() > 12) {
      return mo[e.getMonth()] + " " + e.getDate() + ", " + (e.getHours()-12) + ":"+k + e.getMinutes() + " PM";
    } else {
      return mo[e.getMonth()] + " " + e.getDate() + ", " + e.getHours() + ":" +k+ e.getMinutes() + " AM";
    }} else {
    return parseInt(e.getMonth() + 1, 10) + "/" + e.getDate() + "/" + e.getFullYear();
  }}
