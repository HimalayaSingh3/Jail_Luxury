const setTokensCookies = (res, accessToken, refreshToken) => {


  // ✅ Set Cookie for Access Token
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Use HTTPS in production
    maxAge:15 * 60 * 1000,
    sameSite: "Strict",
  });

  // ✅ Set Cookie for Refresh Token
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "Strict",
  });

  // ✅ Set Cookie for Authentication Flag
  // res.cookie("is_auth", true, {
  //   httpOnly: false,
  //   secure: process.env.NODE_ENV === "production",
  //   maxAge: 1000,
  //   sameSite: "Strict",
  // });
};

export default setTokensCookies;
