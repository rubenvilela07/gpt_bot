import axios from "axios";

export const trackOrderFunction = {
  name: 'track_order',
  description: 'Track a user order by ID',
  parameters: {
    type: 'object',
    properties: {
      orderId: {
        type: 'string',
        description: 'The ID of the order to track',
      },
    },
    required: ['orderId'],
  },
};

type OrderStatus =
  | 'shipped'
  | 'in_analysis'
  | 'in_production'
  | 'partially_shipped'
  | 'partially_ready'
  | 'completed'
  | 'delivered'
  | 'cancelled';

export async function executeTrackOrder({ orderId, userId }: { orderId: string, userId: string }) {
    const orderStatus = await getOrderStatus(orderId, userId);

    const response: Record<OrderStatus, string> & { default: string } = {
        shipped: 'Your order has been shipped.',
        in_analysis: 'Your order is currently being analyzed.',
        in_production: 'Your order is in production.',
        partially_shipped: 'Your order has been partially shipped.',
        partially_ready: 'Your order is partially ready for pickup.',
        completed: 'Your order has been completed.',
        delivered: 'Your order has been delivered.',
        cancelled: 'Your order has been cancelled.',
        
        default: 'Unable to track your order at this time. Please try again later.',
    };
    return response[(orderStatus as OrderStatus)] || response.default;
}

async function getOrderStatus(orderId: string, userId: string): Promise<string> {
  try {
    const response = await axios.get(`${process.env.DOMAIN}/orders/${orderId}/status`, {
      params: { user_id: userId },
      headers: {
        Authorization: `Bearer ${process.env.RAILS_API_KEY}`,
      },
    });

    return response.data.status;
  } catch (error: any) {
    console.error('Error:', error.message);
    throw new Error('Failed to retrieve order status. Please check the order ID and try again.');
  }
}
