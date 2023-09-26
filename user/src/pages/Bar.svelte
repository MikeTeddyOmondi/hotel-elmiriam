<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import { bookingStore, customerStore } from "../stores/hotelStore";
  import { axiosInstance } from "../interceptors/axios";
  import BaseLayout from "../layouts/baseLayout.svelte";
  import Toast from "../components/Toast.svelte";

  let toastProps = {
    isErr: false,
    isSucc: false,
    toastMsg: "",
  };

  onMount(async () => {
    const customersFetchResponse = await axiosInstance.get("/hotel/customers");
    let customers = customersFetchResponse.data.data.customers;
    customerStore.update(() => [...customers]);

    const bookingsFetchResponse = await axiosInstance.get("/hotel/bookings");
    let bookings = bookingsFetchResponse.data.data.bookings;
    bookingStore.update(() => [...bookings]);
  });

  let roomType = "";
  let customerId = "";
  let numberAdults = "",
    numberKids = "",
    checkInDate = "",
    checkOutDate = "";

  $: submit = async () => {
    console.log({
      customerId,
      roomType,
      numberAdults,
      numberKids,
      checkInDate,
      checkOutDate,
    });
    if (
      customerId === "" ||
      roomType === "" ||
      numberAdults === "" ||
      numberKids === "" ||
      checkInDate === "" ||
      checkOutDate === ""
    ) {
      toastProps = {
        isErr: true,
        isSucc: false,
        toastMsg: "Please enter all the fields!",
      };
      setTimeout(() => {
        toastProps = {
          isErr: false,
          isSucc: false,
          toastMsg: "",
        };
      }, 5000);
      return;
    }

    const response = await axiosInstance.post("/hotel/bookings", {
      customerId,
      roomType,
      numberAdults,
      numberKids,
      checkInDate,
      checkOutDate,
    });

    // @ts-ignore
    if (response.name) {
      let resData = await response.response.data.data;
      toastProps = {
        isErr: true,
        isSucc: false,
        toastMsg: resData.message,
      };
      setTimeout(() => {
        toastProps = {
          isErr: false,
          isSucc: false,
          toastMsg: "",
        };
      }, 5000);
      return;
    }

    console.log({ response });

    if (response.status === 201) {
      console.log({ booking: await response.data.data });
      let responseDetails = await response.data;
      // let details = await response.data.data;

      toastProps = {
        isErr: false,
        isSucc: true,
        toastMsg: `${responseDetails.message}!`,
      };

      numberAdults = "";
      numberKids = "";
      checkInDate = "";
      checkOutDate = "";
      roomType = "";
      customerId = "";

      setTimeout(() => {
        toastProps = {
          isErr: false,
          isSucc: false,
          toastMsg: "",
        };
      }, 5000);

      return;
    }
  };
</script>

<BaseLayout>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Bar</h1>
      <a
        href="/"
        class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
        ><i class="fas fa-download fa-sm text-white-50" /> Generate Report</a
      >
    </div>

    <!-- Content Row -->
    <div class="row">
      <!-- All Bar Form Table -->
      <div class="col-lg-9 mb-4">
        <Toast {toastProps} />
        <div class="card shadow">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Add Bar Sale</h6>
          </div>
          <div class="card-body">
            <form on:submit|preventDefault={submit} autocomplete="off">
              <div class="form-group">
                <label for="customerId">Drink Name:</label>
                <select
                  class="w-100 form-control"
                  bind:value={customerId}
                  on:focus={() => (toastProps.isErr = false)}
                >
                  {#each $customerStore as customer}
                    <option value={customer.id_number}
                      >{customer.id_number}</option
                    >
                  {/each}
                </select>
              </div>
              <div class="form-group">
                <label for="numberAdults">Number of Adults:</label>
                <input
                  type="number"
                  class="w-100 form-control"
                  name="numberAdults"
                  id="numberAdults"
                  autocomplete="off"
                  bind:value={numberAdults}
                  on:focus={() => (toastProps.isErr = false)}
                />
              </div>
              <div class="form-group">
                <label for="numberKids">Number of Kids:</label>
                <input
                  type="number"
                  class="w-100 form-control"
                  name="numberKids"
                  id="numberKids"
                  autocomplete="off"
                  bind:value={numberKids}
                  on:focus={() => (toastProps.isErr = false)}
                />
              </div>
              <div class="form-group">
                <label for="roomType">Room Type:</label>
                <select class="w-100 form-control" bind:value={roomType}>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                </select>
              </div>
              <div class="form-group">
                <label for="checkInDate">Check In Date:</label>
                <input
                  type="date"
                  class="w-100 form-control"
                  name="checkInDate"
                  id="checkInDate"
                  autocomplete="off"
                  placeholder="MM/DD/YYYY"
                  bind:value={checkInDate}
                  on:focus={() => (toastProps.isErr = false)}
                />
              </div>
              <div class="form-group">
                <label for="checkOutDate">Check Out Date:</label>
                <input
                  type="date"
                  class="w-100 form-control"
                  name="checkOutDate"
                  id="checkOutDate"
                  autocomplete="off"
                  placeholder="MM/DD/YYYY"
                  bind:value={checkOutDate}
                  on:focus={() => (toastProps.isErr = false)}
                />
              </div>
              <hr />
              <input
                type="submit"
                class="btn btn-primary shadow-sm w-100"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>

      <!-- Drink Stats -->
      <div class="col-lg-3">
        <div class="card shadow mb-2">
          <!-- Card Header - Accordion -->
          <a
            href="#beerStatsCard"
            class="d-block card-header py-3"
            data-toggle="collapse"
            role="button"
            aria-expanded="true"
            aria-controls="beerStatsCard"
          >
            <h6 class="m-0 font-weight-bold text-primary">Beer</h6>
          </a>
          <!-- Card Content - Collapse -->
          <div class="collapse show" id="beerStatsCard" style="">
            <div class="card-body">
              <p>
                <strong>Beer Stats Here!</strong>
              </p>
              <div class="mt-4 text-center small">
                <span class="mr-2">
                  <i class="fas fa-circle text-success" /> Bottles: 5
                </span>
                <span class="mr-2">
                  <i class="fas fa-circle text-danger" /> Cans: 1
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="card shadow mb-2">
          <!-- Card Header - Accordion -->
          <a
            href="#wineSpiritsStatsCard"
            class="d-block card-header py-3"
            data-toggle="collapse"
            role="button"
            aria-expanded="true"
            aria-controls="wineSpiritsStatsCard"
          >
            <h6 class="m-0 font-weight-bold text-primary">Wine & Spirits</h6>
          </a>
          <!-- Card Content - Collapse -->
          <div class="collapse show" id="wineSpiritsStatsCard" style="">
            <div class="card-body">
              <p>
                <strong>Beer Stats Here!</strong>
              </p>
              <div class="mt-4 text-center small">
                <span class="mr-2">
                  <i class="fas fa-circle text-success" /> 250ml: 5
                </span>
                <span class="mr-2">
                  <i class="fas fa-circle text-warning" /> 350ml/500ml: 2
                </span>
                <span class="mr-2">
                  <i class="fas fa-circle text-danger" /> 750ml: 1
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="card shadow mb-2">
          <!-- Card Header - Accordion -->
          <a
            href="#nonAlcoholicStatsCard"
            class="d-block card-header py-3"
            data-toggle="collapse"
            role="button"
            aria-expanded="true"
            aria-controls="nonAlcoholicStatsCard"
          >
            <h6 class="m-0 font-weight-bold text-primary">Non-alcoholics</h6>
          </a>
          <!-- Card Content - Collapse -->
          <div class="collapse show" id="nonAlcoholicStatsCard" style="">
            <div class="card-body">
              <p>
                <strong>Beer Stats Here!</strong>
              </p>
              <div class="mt-4 text-center small">
                <span class="mr-2">
                  <i class="fas fa-circle text-warning" /> Reay-To-Drink(1L): 3
                </span>
                <span class="mr-2">
                  <i class="fas fa-circle text-danger" /> Water(1L): 1
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- All Bar Sales Table -->
      <div class="col-xl-12 col-md-12 mb-4">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">All Bar Sales</h6>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                class="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Room Type</th>
                    <th>Check In Date</th>
                    <th>Check Out Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {#each $bookingStore as booking}
                    <tr>
                      <td>{booking._id}</td>
                      <td
                        >{booking.customer.firstname}
                        {booking.customer.lastname}</td
                      >
                      <td>{booking.roomType.roomType}</td>
                      <td>{booking.checkInDate}</td>
                      <td>{booking.checkOutDate}</td>
                      <td>
                        <a
                          class="small"
                          href="/invoices/bookings/{booking._id}"
                          use:link
                        >
                          View
                        </a></td
                      >
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</BaseLayout>
