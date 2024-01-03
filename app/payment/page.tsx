"use client";
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Grid } from "@mui/material";
import NeosTextField from "@/components/NeosTextField";
import NeosButton from "@/components/NeosButton";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      iconColor: "#FD7C7C",
      color: "#000000",
      fontSize: "14px",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "rgb(0, 0, 0, 0.3)",
        fontSize: "14px",
      },
    },
    invalid: {
      iconColor: "#d32f2f",
      color: "#d32f2f",
    },
  },
};

const CheckoutForm = () => {
  const { userData } = useSelector((state: RootState) => state.commonSlice);
  const displayValue = userData?.numberOfPeople + 1;

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    setLoading(true);

    try {
      const cardElement = elements?.getElement(CardElement);

      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const { token, error } = await stripe!.createToken(cardElement);

      if (error) {
        throw new Error(error.message);
      }

      console.log(token);
      // Send the token to your server to complete the payment
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-lg md:2xl lg:text-3xl font-bold  mt-2 mb-8 text-center">
        Price to Pay: €{displayValue}
      </h1>
      <div className="rounded-3xl border border-[#E0E0E0] p-6">
        <p className="text-lg font-medium text-black">Update payment method</p>
        <p className="text-[#667085] text-sm mb-8">Update your card details.</p>
        <Grid container rowSpacing={3} columnSpacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <NeosTextField placeholder="Olivia Rhye" label="Name on card" />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <div className="flex justify-between">
              <label className="text-sm text-black  font-medium mb-1.5 block">
                Card Number
              </label>
              <span className="flex">
                <label className="text-sm text-black  font-medium mb-1.5 ">
                  Expiry
                </label>
                <label className="text-sm text-black  font-medium mb-1.5 ms-5 pe-4">
                  CVV
                </label>
              </span>
            </div>
            <div
              style={{
                border: "1px solid #E0E0E0",
                borderRadius: "8px",
                padding: "13px 16px",
              }}
            >
              <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {error && <p className="text-[#d32f2f]">{error}</p>}
          </Grid>
        </Grid>
      </div>
      <div className="mt-8 text-center">
        <NeosButton
          category="colored"
          title="PAY NOW"
          type="submit"
          disabled={!stripe || loading}
        />
      </div>
    </form>
  );
};

export default CheckoutForm;
