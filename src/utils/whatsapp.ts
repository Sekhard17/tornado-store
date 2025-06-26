import { CartItem } from '@/types';

interface CustomerData {
  name: string;
  phone: string;
  email?: string;
  address: string;
}

export function generateWhatsAppMessage(
  items: CartItem[],
  total: number,
  customer: CustomerData,
  orderNumber: string
): string {
  const itemsList = items
    .map(
      (item) =>
        `• ${item.product.name}\n  Talla: ${item.selectedSize} | Color: ${item.selectedColor}\n  Cantidad: ${item.quantity} | Precio: $${item.product.price.toLocaleString('es-CL')}`
    )
    .join('\n\n');

  return `🛍️ *NUEVA SOLICITUD DE COMPRA - TORNADO STORE*

📋 *Orden #${orderNumber}*

👤 *Datos del Cliente:*
• Nombre: ${customer.name}
• Teléfono: ${customer.phone}
${customer.email ? `• Email: ${customer.email}` : ''}
• Dirección: ${customer.address}

🛒 *Productos Solicitados:*
${itemsList}

💰 *Total: $${total.toLocaleString('es-CL')} CLP*

---
Por favor confirma la disponibilidad y procederemos con la venta. ¡Gracias! 🙌`;
}

export function generateWhatsAppURL(message: string, phoneNumber: string = '56912345678'): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
} 