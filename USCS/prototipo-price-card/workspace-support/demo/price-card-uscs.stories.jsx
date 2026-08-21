import React from "react";
import { PriceCardUscs } from "../../site-final/PriceCardUscs/PriceCardUscs.jsx";
import { uscsCampusOffers, uscsEadOffer } from "./fixtures/price-card-uscs.mock.js";

const meta = {
  title: "Components/Complex/PriceCardUSCS",
  component: PriceCardUscs,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-[#4B4B4B] p-10">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default = {
  args: {
    offers: uscsCampusOffers,
    eadOffer: uscsEadOffer,
    variant: "default",
  },
};

export const Expanded = {
  args: {
    offers: uscsCampusOffers,
    eadOffer: uscsEadOffer,
    variant: "expanded",
  },
};

export const Ead = {
  args: {
    offers: uscsCampusOffers,
    eadOffer: uscsEadOffer,
    variant: "ead",
  },
};
