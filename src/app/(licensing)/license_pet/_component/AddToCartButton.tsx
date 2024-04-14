"use client";

import { Button } from "../../_components/Button";
import { addToCart } from "../../actions/addToCart";

type Props = {
  licenseId?: string;
};

export function AddToCartButton({ licenseId }: Props) {
  console.log(licenseId);

  return (
    <Button
      className="border-gray-50 bg-gray-50"
      onClick={async () => {
        if (!licenseId) return;

        await addToCart(parseInt(licenseId));
      }}
    >
      Add to Cart
    </Button>
  );
}
