import { z } from "zod";

// shipping address validation schema
export const shippingAddressValidationSchema = z.object({
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
});

export type IShippingAddress = z.infer<typeof shippingAddressValidationSchema>;

export const orderValidationSchema = z.object({
    orderItems: z.array(
        z.object({
            product: z.string(),
            quantity: z.number(),
        })
    ),
    shippingAddress: shippingAddressValidationSchema,
    paymentMethod: z.enum(["payment-gateway", "cash"]),
    itemsPrice: z.number(),
    taxPrice: z.number(),
    shippingPrice: z.number(),
    totalPrice: z.number(),
});
