<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import { roomStore } from "../stores/hotelStore";
  import BaseLayout from "../layouts/baseLayout.svelte";

  // const HOTEL_API_URI = "http://localhost:8003/ap1/v1";

  // @ts-ignore
  let roomTypes = [];
  let isErr = false;
  let errMsg = "";
  
  onMount(async () => {
    // let authToken = localStorage.getItem("authToken");
    const roomsFetchResponse = await axios.get("/hotel/rooms");
    console.log({ allRooms: roomsFetchResponse.data.data.rooms });
    let allRooms = roomsFetchResponse.data.data.rooms;
    // rooms = roomsFetchResponse.data.data.rooms;
    // @ts-ignore
    roomStore.update((currentData) => [...allRooms]);

    const roomTypesFetchResponse = await axios.get("/hotel/roomtypes");
    console.log({ allRoomTypes: roomTypesFetchResponse.data.data.roomTypes });
    roomTypes = roomTypesFetchResponse.data.data.roomTypes;
  });

  let roomNumber = "";
  let roomTypeSelected = "";

  // @ts-ignore
 // @ts-ignore
   $: roomTypes;

  $: submit = async () => {
    console.log({
      roomNumber,
      roomTypeSelected,
    });

    if (roomNumber === "") {
      isErr = true;
      errMsg = "Please enter a room number!";
      return
    }

    const response = await axios.post(`/hotel/rooms/${roomTypeSelected}`, {
      number: roomNumber.toUpperCase(),
    });

    let resData;

    // @ts-ignore
    if (response.name) {
      resData = await response.response.data.data;
      console.log({ resData });
      isErr = true;
      errMsg = resData.message;
      return
    }

    if (response.status === 200) {
      console.log({ resData: await response.data.data });
      let room = await response.data.data;

      roomStore.update((currentData) => {
        return [...currentData, room];
      });

      roomNumber = "";
      roomTypeSelected = "";
    }
  };
</script>

<BaseLayout>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Rooms</h1>
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
            <h6 class="m-0 font-weight-bold text-primary">Add Rooms</h6>
            <center>
              {#if isErr}
                <p class="text-danger"><b>{errMsg}</b></p>
              {/if}
            </center>
          </div>
          <div class="card-body">
            <form on:submit|preventDefault={submit} autocomplete="off">
              <div class="form-group">
                <label for="number">Room Number:</label>
                <input
                  type="text"
                  class="w-100 form-control"
                  name="number"
                  id="number"
                  autocomplete="off"
                  bind:value={roomNumber}
                  on:focus={() => isErr = false}
                />
              </div>
              <div class="form-group">
                <label for="roomType">Room Type:</label>
                <select
                  class="w-100 form-control"
                  bind:value={roomTypeSelected}
                  required
                >
                  {#each roomTypes as rt}
                    {#if rt.roomType === "single"}
                      <option value={rt._id}>{rt.roomType}</option>
                    {:else if rt.roomType === "double"}
                      <option value={rt._id}>{rt.roomType}</option>
                    {/if}
                  {/each}
                </select>
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
            <h6 class="m-0 font-weight-bold text-primary">All Rooms</h6>
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
                    <th>Room Number</th>
                    <th>Occupied</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {#each $roomStore as room}
                    <tr>
                      <td>{room._id}</td>
                      <td>{room.number}</td>
                      <td>{room.isBooked}</td>
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
