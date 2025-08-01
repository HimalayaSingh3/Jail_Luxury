// ✅ Helper function to handle common logic
export const handleRequest = async (req, res, controllerMethod) => {
  try {
    let { payloadObj } = req?.body;
    if (payloadObj) {
      payloadObj.userId = req?.user?.user_id; // Attach userId from the authenticated user
    } else {
      payloadObj = {};
      payloadObj.userId = req?.user?.user_id;
    }

    console.log("Request Payload:", payloadObj);

    const data = await controllerMethod(payloadObj);
    console.log(" handleRequest response data:", data);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in request handler:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
