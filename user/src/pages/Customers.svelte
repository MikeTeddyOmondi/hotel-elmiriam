<script>
  import axios from "axios";
  import { onMount } from "svelte";
  // import {push} from "svelte-spa-router";
  import BaseLayout from "../layouts/baseLayout.svelte";
  import { axiosInstance } from "../interceptors/axios";

  // const HOTEL_API_URI = "http://localhost:8003/ap1/v1";

  let customers = [];
  let isErr = false;
  let errMsg = "";

  onMount(async () => {
    // let authToken = localStorage.getItem("authToken");
    const response = await axiosInstance.get("/hotel/customers");
    console.log({ allCustomers: response.data.data });
    customers = response.data.data.customers;
  });

  let firstname = "",
    lastname = "",
    email = "",
    id_number = "",
    phone_number = "";

  $: customers;

  $: submit = async () => {
    console.log({
      firstname,
      lastname,
      email,
      id_number,
      phone_number,
    });

    const response = await axiosInstance.post("/hotel/customers", {
      firstname,
      lastname,
      email,
      id_number,
      phone_number,
    });

    if (response.response.status === 500) {
      let resData = await response.response.data.data;
      console.log({ resData });
      isErr = true;
      errMsg = resData.messsage;
    }

    if (response.status === 201) {
      console.log({ resData: await response.data.data });

      customers.push({
        firstname,
        lastname,
        email,
        id_number,
        phone_number,
      });

      firstname = "";
      lastname = "";
      email = "";
      id_number = "";
      phone_number = "";
    }
  };
</script>

<BaseLayout>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Customers</h1>
      <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
        <i class="fas fa-download fa-sm text-white-50" />
        Export
      </button>
    </div>

    <!-- Add Users Form -->
    <div class="row">
      <div class="col-xl-12 col-md-12 mb-4">
        <div class="card shadow">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Add Customers</h6>
            <center>
              {#if isErr}
                <p class="text-danger"><b>{errMsg}</b></p>
              {/if}
            </center>
          </div>
          <div class="card-body">
            <form on:submit|preventDefault={submit} autocomplete="off">
              <div class="form-group">
                <label for="firstname">Firstname:</label>
                <input
                  type="text"
                  class="w-100 form-control"
                  name="firstname"
                  id="firstname"
                  autocomplete="off"
                  bind:value={firstname}
                />
              </div>
              <div class="form-group">
                <label for="lastname">Lastname:</label>
                <input
                  type="text"
                  class="w-100 form-control"
                  name="lastname"
                  id="lastname"
                  autocomplete="off"
                  bind:value={lastname}
                />
              </div>
              <div class="form-group">
                <label for="email">Email:</label>
                <input
                  type="email"
                  class="w-100 form-control"
                  name="email"
                  id="email"
                  autocomplete="off"
                  bind:value={email}
                />
              </div>
              <div class="form-group">
                <label for="id_number">ID Number:</label>
                <input
                  type="text"
                  class="w-100 form-control"
                  name="id_number"
                  id="id_number"
                  autocomplete="off"
                  bind:value={id_number}
                />
              </div>
              <div class="form-group">
                <label for="phone_number">Phone Number:</label>
                <input
                  type="tel"
                  class="w-100 form-control"
                  name="phone_number"
                  id="phone_number"
                  autocomplete="off"
                  bind:value={phone_number}
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

      <!-- All Users Table -->
      <div class="col-xl-12 col-md-12 mb-4">
        <div class="card shadow mb-4">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">All Customers</h6>
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
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Email</th>
                    <th>ID Number</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {#each customers as customer}
                    <tr>
                      <td>{customer.firstname}</td>
                      <td>{customer.lastname}</td>
                      <td>{customer.email}</td>
                      <td>{customer.id_number}</td>
                      <td>{customer.phone_number}</td>
                      <td>Edit</td>
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
