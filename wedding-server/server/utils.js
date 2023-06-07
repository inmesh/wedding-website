const validatePhone = (phoneNum) => {
  let isBadPhone = false;
  const phoneFromBody = phoneNum;
  let phone =
    phoneFromBody.charAt(0) === "0"
      ? phoneFromBody.substring(1)
      : phoneFromBody;
  console.log(phone);
  if (phone.charAt(0) === "+") {
    console.log("international number"); // need to check if rest are numbers?
  } else if (
    !(phone.length === 9 && /^\d+$/.test(phone) && phone.charAt(0) === "5")
  ) {
    isBadPhone = true;
    console.log("bad phone:", phone);
  } else {
    phone = "+972" + phone;
  }
  return [phone, isBadPhone];
};

module.exports = validatePhone;
