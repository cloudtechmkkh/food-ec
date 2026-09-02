export const createDeliveryLabelCsv = (order: any) => {
    const rows = [];

    for(const item of order.items) {
        rows.push([
            order.id,
            order.user.name,
            order.address.postal_code,
            order.address.prefecture,
            order.address.city,
            order.address.address_line,
            order.address.phone,
            item.temperature_zone,
            `${item.name}*${item.quantity}`,
            order.delivery_date
        ].join(','));
    }

    return rows.join('\n');
}