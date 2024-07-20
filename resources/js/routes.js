import Dashboard from './components/Dashboard.vue'
import ListAppointments from "@/pages/appointments/ListAppointments.vue";
import ListUsers from "@/pages/users/ListUsers.vue";
import updateSetting from './pages/settings/updateSetting.vue';
import  updateProfile from './pages/profile/updateProfile.vue'
export default [
    {
        path: '/admin/dashboard',
        name: 'admin.dashboard',
        component: Dashboard,

    },

    {
        path: '/admin/appointments',
        name: 'admin.appointments',
        component: ListAppointments,
    },

    {
        path: '/admin/users',
        name: 'admin.users',
        component: ListUsers,
    },

    {
        path: '/admin/settings',
        name: 'admin.settings',
        component: updateSetting,
    },

    {
        path: '/admin/profile',
        name: 'admin.profile',
        component: updateProfile,
    }

]
