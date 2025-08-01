"use client";
import { checkout, paymentVerification } from '@/utils/API_lib';
import React, { useContext, useEffect, useState } from 'react';
import Script from 'next/script';
import ThreeDotLoader from '../loaders/threeDotLoader';
import { AppContext } from '@/context/applicationContext';
import { useRouter } from 'next/navigation';
const razorpayId  =  "rzp_test_bpnhkN3Uh0mT0L"

function CheckoutPageClient({ onClose , amount}) {
  const { user } = useContext(AppContext);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [paymentInitialized, setPaymentInitialized] = useState(false);
  const router = useRouter(); // Initialize the router
  const checkoutHandler = async (name, amount) => {
    try {
      const { success, data } = await checkout({ name, amount });
      if (!success || !data) {
        console.error('Checkout failed');
        return;
      }

      console.log("user",user)
      const options = {
        key: razorpayId,
        amount: data.amount,
        currency: "INR",
        name: `JAIL LUXURY`,
        description: `payment from ${user?.email}`,
        order_id: data.id,
        handler: async (response) => {
            console.log("checkoutHandler response",response)
          try {
            // Verify payment with your backend
            const verification = await paymentVerification(response);
            console.log("verification",verification)

            if (verification?.data == true && verification?.success) {
            //   setPaymentStatus('success');
             router.push("/orders")
              onClose();
            } else {
            //   setPaymentStatus('failed');
              alert('Payment verification failed');
            }
          } catch (err) {
            console.error('Verification error:', err);
            setPaymentStatus('failed');
            alert('Payment verification failed');
          }

          setPaymentInitialized(false);
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone,
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: function () {
            console.log('Modal dismissed');
            document.body.style.overflow = 'auto'; // Reset scroll
            setPaymentInitialized(false);
            onClose();
          }
        }
      };

      if (window.Razorpay) {
        const rzp1 = new window.Razorpay(options);

        rzp1.on('payment.failed', function (response) {
          console.error('Payment failed', response);
          onClose();
        });

        rzp1.open();
      } else {
        console.error('Razorpay not loaded');
      }
    } catch (error) {
      console.error("Checkout error:", error);
      onClose();
    }
  };

  useEffect(() => {
    if (window.Razorpay && !paymentInitialized) {
      checkoutHandler("sapnadip", amount);
      setPaymentInitialized(true);
    }
  }, [razorpayLoaded, paymentInitialized]);

  // Reset body overflow when component unmounts
  useEffect(() => {
    return () => {
      setPaymentInitialized(false);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => {
          setRazorpayLoaded(true);
        }}
      />
      {!razorpayLoaded && <div style={{marginTop:"5vh"}}><ThreeDotLoader /></div>}
    </div>
  );
}

export default CheckoutPageClient;