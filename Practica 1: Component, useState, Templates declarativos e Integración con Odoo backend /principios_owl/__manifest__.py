{
    'name': 'Principios OWL',
    'version': '1.0',
    'summary': 'Módulo de ejemplo para mostrar los principios de OWL/Odoo y manipular datos de stock',
    'description': 'Este módulo muestra los principios de OWL/Odoo y permite manipular información de stock.',
    'author': 'Tu Nombre',
    'category': 'Tools',
    'depends': ['base', 'stock', 'web'],
    'data': [
        'views/principios_owl_menu.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'principios_owl/static/src/js/*.js',
            'principios_owl/static/src/xml/*.xml',
            'principios_owl/static/src/css/principios_owl_styles.css',
        ],
    },
    'installable': True,
    'application': True,
    'license': 'LGPL-3',
}
