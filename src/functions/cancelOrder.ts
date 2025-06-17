import axios from "axios";

export const cancelOrderFunction = {
  name: 'cancel_order',
  description: 'Cancel a user order by ID',
  parameters: {
    type: 'object',
    properties: {
      orderId: {
        type: 'string',
        description: 'The ID of the order to cancel',
      },
    },
    required: ['orderId'],
  },
};

export async function executeCancelOrder({ orderId, userId }: { orderId: string, userId: string }) {
    const orderStatus = await cancelOrder(orderId, userId);

    const response: Record<string, string> = {
        cancelled: 'Your order has been successfully cancelled.',
        default: 'Unable to cancel your order at this time. Please try again later.',
    };
    return response[orderStatus] || response.default;
}

async function cancelOrder(orderId: string, userId: string): Promise<string> {
  try {
    const response = await axios.post(`${process.env.DOMAIN}/orders/${orderId}/cancel`, {}, {
      params: { user_id: userId },
      headers: {
        Authorization: `Bearer ${process.env.RAILS_API_KEY}`,
      },
    });
    return response.data.status;

  } catch (error: any) {
    console.error('Error:', error.message);
    throw new Error('Failed to cancel order. Please check the order ID and try again.');
  }
}
