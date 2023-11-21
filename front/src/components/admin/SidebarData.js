import React from "react";
import * as FaIcons from 'react-icons/fa';


export const SidebarData = [
    {
        title: 'Clientes',
        path: '/clients',
        icon: <FaIcons.FaUserCircle />,
        cName: 'nav-text'

    },
    {
        title: 'Agencias',
        path: '/agency',
        icon: <FaIcons.FaRegBuilding />,
        cName: 'nav-text'

    },
    {
        title: 'Servicios',
        path: '/service',
        icon: <FaIcons.FaToolbox />,
        cName: 'nav-text'

    },
    {
        title: 'Res Client',
        path: '/ResClient',
        icon: <FaIcons.FaConciergeBell />,
        cName: 'nav-text'

    },
    {
        title: 'Res Agent',
        path: '/ResAgency',
        icon: <FaIcons.FaConciergeBell />,
        cName: 'nav-text'

    },
    {
        title: 'Factura',
        path: '/bill',
        icon: <FaIcons.FaRegMoneyBillAlt />,
        cName: 'nav-text'

    },

]