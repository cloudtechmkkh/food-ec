export const createDeliveryLabelCsv = (order: any) => {
    return [
        order.id,
        order.user.name,
        order.user.address,
        order.temperatureZone,
        order.items.map((i: any) => `${i.name}*${i.quantity}`).join(', '),
    ].join(',');
}