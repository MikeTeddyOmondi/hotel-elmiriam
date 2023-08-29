<script>
  import axios from "axios";
  import { onMount } from "svelte";
  // import {push} from "svelte-spa-router";
  import BaseLayout from "../layouts/baseLayout.svelte";

  let users = [];
  let isErr = false;
  let errMsg = "";

  let userType;
  let isAdmin = false;
  let isActive = false;
  let isVerified = false;
  let username = "",
    email = "",
    id_number = "",
    password = "";

  onMount(async () => {
    let authToken = localStorage.getItem("authToken");
    const response = await axios.get("/auth/accounts");
    console.log({ allAccounts: response.data.data });
    users = response.data.data.users;
  });

  $: submit = async () => {
    console.log({
      username,
      email,
      id_number,
      password,
      userType,
      isAdmin,
      isActive,
      isVerified,
    });

    const response = await axios.post("/auth/register", {
      username,
      email,
      id_number,
      password,
      userType,
    });
    console.log({ response });

    if (response.response.status === 500) {
      let resData = await response.response.data;
      console.log({ resData });
      isErr = true;
      errMsg = resData.message;
    }

    if (response.status === 201) {
      console.log({ resData: await response.data.data });

      users.push({
        username,
        email,
        id_number,
        userType,
        isAdmin,
        isActive,
        isVerified,
      });

      username = "";
      email = "";
      password = "";
      id_number = "";
    }
  };
</script>

<BaseLayout>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Users</h1>
      <!-- <button class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
        <i class="fas fa-add fa-sm text-white-50" />
        Add User
      </button> -->
    </div>

    <!-- Add Users Form -->
    <div class="row">
      <div class="col-xl-12 col-md-12 mb-4">
        <div class="card shadow">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Add Users</h6>
            <center>
              {#if isErr}
                <p class="text-danger"><b>{errMsg}</b></p>
              {/if}
            </center>
          </div>
          <div class="card-body">
            <form on:submit|preventDefault={submit} autocomplete="off">
              <div class="form-group">
                <label for="username">Username:</label>
                <input
                  type="text"
                  class="w-100 form-control"
                  name="username"
                  id="username"
                  autocomplete="off"
                  bind:value={username}
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
                <label for="password">Password:</label>
                <input
                  type="password"
                  class="w-100 form-control"
                  name="password"
                  id="password"
                  autocomplete="off"
                  bind:value={password}
                />
              </div>
              <div class="form-group">
                <label for="usertype">Usertype:</label>
                <select class="w-100 form-control" bind:value={userType}>
                  <option value="staff">Staff</option>
                  <option value="management">Management</option>
                </select>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  name="isActive"
                  class="form-check-input"
                  bind:checked={isActive}
                />
                <label for="isActive">Active</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  name="isVerified"
                  class="form-check-input"
                  bind:checked={isVerified}
                />
                <label for="isVerified">Verified</label>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  name="isAdmin"
                  class="form-check-input"
                  bind:checked={isAdmin}
                />
                <label for="isAdmin">Admin</label>
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
            <h6 class="m-0 font-weight-bold text-primary">All Users</h6>
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
                    <th>Username</th>
                    <th>Email</th>
                    <th>ID Number</th>
                    <th>IsActive</th>
                    <th>IsVerified</th>
                    <th>IsAdmin</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {#each users as user}
                    <tr>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.id_number}</td>
                      <td>{user.isActive}</td>
                      <td>{user.isVerified}</td>
                      <td>{user.isAdmin}</td>
                      <td>Edit | Delete</td>
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
