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

export async function executeTrackOrder({ orderId, userId }: { orderId: string, userId: string }) {
    const orderStatus = await getOrderStatusFromDatabase(orderId, userId);

}

function getOrderStatusFromDatabase(orderId: string, userId: string) {
}
