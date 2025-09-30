/**
 * Principios OWL/Odoo - Ejemplo de componente OWL
 */
import { Component, useState } from '@odoo/owl';
import { registry } from '@web/core/registry';
import { useService } from '@web/core/utils/hooks';

export class PrincipiosOwlApp extends Component {
    setup() {
        this.orm = useService('orm');
        this.state = useState({ stockData: [], products: [] });
        this.loadStock();
    }
    async loadStock() {
        this.state.stockData = await this.orm.searchRead('stock.quant', [], ['product_id', 'location_id', 'quantity']);
        const data = await this.orm.searchRead('stock.quant', [], ['product_id', 'location_id', 'quantity']);
        // Agrupar productos y sumar cantidades solo de almacenes (ubicaciones internas)
        const products = {};
        for (const line of data) {
            const pid = line.product_id[0];
            if (!products[pid]) {
                products[pid] = {
                    id: pid,
                    name: line.product_id[1],
                    total: 0,
                    locations: [],
                };
            }
            // Sumar solo si la ubicación es interna (nombre no contiene 'adjustment', 'scrap', etc.)
            const locName = (line.location_id && line.location_id[1]) ? line.location_id[1].toLowerCase() : '';
            if (!locName.includes('adjustment') && !locName.includes('scrap')) {
                products[pid].total += line.quantity;
            }
            // Solo agregar a la lista si no es 'Inventory adjustment'
            if (!locName.includes('adjustment')) {
                products[pid].locations.push({
                    location: line.location_id[1],
                    qty: line.quantity,
                });
            }
        }
        this.state.products = Object.values(products);
    }

    addFakeItem() {
        // Genera un id único ficticio
        const fakeId = 'fake_' + (this.state.stockData.length + 1);
        this.state.stockData.push({
            id: fakeId,
            product_id: [0, 'Producto Ficticio'],
            location_id: [0, 'Ubicación ficticia'],
            quantity: Math.floor(Math.random() * 100) + 1,
        });
        // Recalcular agrupación
        const products = {};
        for (const line of this.state.stockData) {
            const pid = line.product_id[0];
            if (!products[pid]) {
                products[pid] = {
                    id: pid,
                    name: line.product_id[1],
                    total: 0,
                    locations: [],
                };
            }
            products[pid].total += line.quantity;
            products[pid].locations.push({
                location: line.location_id[1],
                qty: line.quantity,
            });
        }
        this.state.products = Object.values(products);
    }
}
PrincipiosOwlApp.template = 'principios_owl.PrincipiosOwlApp';

registry.category('actions').add('principios_owl.action', PrincipiosOwlApp);
