<script>
  import Router from 'svelte-spa-router';
  
  import Home from "./pages/Home.svelte"; 
  import Login from "./pages/Login.svelte";
  import Users from "./pages/Users.svelte";
  import Customers from "./pages/Customers.svelte";
  import Bookings from "./pages/Bookings.svelte";
  import RoomTypes from "./pages/RoomTypes.svelte";
  import Rooms from "./pages/Rooms.svelte";
  import ForgotPassword from "./pages/ForgotPassword.svelte";

	const routes = {
		'/': Home,
		'/login': Login,
    '/users': Users,
    '/customers': Customers,
    '/bookings': Bookings,
    '/room-types': RoomTypes,
    '/rooms': Rooms,
		'/forgot-password': ForgotPassword,
	};
</script>

<Router {routes}/>
