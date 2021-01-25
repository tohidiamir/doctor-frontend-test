import React from 'react'
import * as routerTypes from './routerTypes'
import DoctorPage from "../container/doctor/DoctorPage";
import IndexPage from "../container/index/IndexPage";
import PatientSelectDoctor from "../component/Patient/PatientSelect/PatientSelectDoctor";


export const RouteAll =
    [
        {
            name: 'doctor add calender',
            key: routerTypes.DOCOTOR_ADD_CALENDER,
            path: '/doctor/add',
            exact: false,
            render: () => (
                <DoctorPage/>
            )

        },

        {
            name: 'patient select calender',
            key: routerTypes.PATIENT_SELECT,
            path: '/patient/add',
            exact: false,
            render: () => (
                <PatientSelectDoctor/>
            )

        },

        {
            name: 'index',
            key: routerTypes.HOME,
            path: '/',
            exact: false,
            render: () => (
                <IndexPage/>
            )

        },


    ]

;

