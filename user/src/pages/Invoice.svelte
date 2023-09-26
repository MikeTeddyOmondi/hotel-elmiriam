<script>
  import { onMount } from "svelte";
  import { link } from "svelte-spa-router";
  import { bookingStore, customerStore } from "../stores/hotelStore";
  import { axiosInstance } from "../interceptors/axios";
  import BaseLayout from "../layouts/baseLayout.svelte";
</script>

<BaseLayout>
  <div class="container d-flex flex-column justify-content-center mt-50 mb-50">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header bg-transparent header-elements-inline">
            <h6 class="card-title">Hotel invoice</h6>
            <div class="header-elements">
              <button type="button" class="btn btn-light btn-sm"
                ><i class="fas fa-file mr-2" /> Save</button
              >
              <button type="button" class="btn btn-light btn-sm ml-3"
                ><i class="fas fa-print mr-2" /> Print</button
              >
            </div>
          </div>

          <div class="card-body">
            <div class="row">
              <div class="col-sm-6">
                <div class="mb-4 pull-left">
                  <h6>Hotel Elmiriam</h6>
                  <ul class="list list-unstyled mb-0 text-left">
                    <li>43 Awasi</li>
                    <li>Kisumu County</li>
                    <li>+0112348423</li>
                  </ul>
                </div>
              </div>

              <div class="col-sm-6">
                <div class="mb-4">
                  <div class="text-sm-right">
                    <h4 class="invoice-color mb-2 mt-md-2">Invoice #BBB1243</h4>
                    <ul class="list list-unstyled mb-0">
                      <li>
                        Date: <span class="font-weight-semibold"
                          >August 12, 2023</span
                        >
                      </li>
                      <li>
                        Due date: <span class="font-weight-semibold"
                          >August 14, 2023</span
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-md-flex flex-md-wrap">
              <div class="mb-4 mb-md-2 text-left">
                <span class="text-muted">Invoice To:</span>
                <ul class="list list-unstyled mb-0">
                  <li><h5 class="my-2">Customer Name</h5></li>
                  <!-- <li>
                    <span class="font-weight-semibold"
                      >Samantha Mutual funds Ltd</span
                    >
                  </li>
                  <li>Gurung Street</li> -->
                  <li>customer_email@gmail.com</li>
                </ul>
              </div>

              <div class="mb-2 ml-auto">
                <span class="text-muted">Payment Details:</span>
                <div class="d-flex flex-wrap wmin-md-400">
                  <ul class="list list-unstyled mb-0 text-left">
                    <li><h5 class="my-2">Total Due:</h5></li>
                    <li>Status:</li>
                    <li>Payment Method:</li>
                    <li>Reference/Receipt No.:</li>
                  </ul>

                  <ul class="list list-unstyled text-right mb-0 ml-auto">
                    <li>
                      <h5 class="font-weight-semibold my-2">Kes. 7,200</h5>
                    </li>
                    <li>
                      <span class="badge badge-danger font-weight-semibold"
                        >Not Paid</span
                      >
                      <span class="badge badge-success font-weight-semibold"
                        >Paid</span
                      >
                    </li>
                    <li>M-pesa/Cash</li>
                    <li>
                      <span class="font-weight-semibold">RQX94d95F85E</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-lg">
              <thead>
                <tr>
                  <th>Particulars</th>
                  <th>Rate</th>
                  <th>Days</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <h6 class="mb-0"><b>Single/Double</b> Room</h6>
                    <span class="text-muted"
                      >Booked for <b>Total No. People Accomodated</b> from
                      <b>CheckInDate</b>
                      to <b> CheckOutDate</b></span
                    >
                  </td>
                  <td>Kes. 2400</td>
                  <td>2</td>
                  <td><span class="font-weight-semibold">Kes. 7200</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="card-body">
            <div class="d-md-flex flex-md-wrap">
              <div class="pt-2 mb-3 wmin-md-400 ml-auto">
                <h6 class="mb-3 text-left">Total due</h6>
                <div class="table-responsive">
                  <table class="table">
                    <tbody>
                      <tr>
                        <th class="text-left">Subtotal:</th>
                        <td class="text-right">Kes. 5,400</td>
                      </tr>
                      <tr>
                        <th class="text-left"
                          >Tax: <span class="font-weight-normal">(16%)</span
                          ></th
                        >
                        <td class="text-right">Kes. 1,800</td>
                      </tr>
                      <tr>
                        <th class="text-left">Total:</th>
                        <td class="text-right text-primary"
                          ><h5 class="font-weight-semibold">Kes. 7,200</h5></td
                        >
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div class="card-footer">
            <span class="text-muted"
              >* Charges are subject to Value Added Tax tax.</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="d-flex flex-row additional-buttons">
          <div>
            <button type="button" class="btn btn-warning m-2">
              <b><i class="fas fa-cogs mr-1" /></b>
              Initiate M-pesa Payment
            </button>
          </div>
          <div>
            <button type="button" class="btn btn-success m-2">
              <b><i class="fas fa-paper-plane mr-1" /></b>
              Email invoice
            </button>
          </div>
          <div>
            <button type="button" class="btn btn-info m-2">
              <b><i class="fas fa-paper-plane mr-1" /></b>
              Send sms
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</BaseLayout>

<style>
  .mt-50 {
    margin-top: 50px;
  }

  .mb-50 {
    margin-bottom: 50px;
  }

  .card {
    position: relative;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.1875rem;
  }

  /* .card-img-actions {
    position: relative;
  } */

  .card-body {
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    padding: 1.25rem;
  }

  .card-title {
    margin-top: 10px;
    font-size: 17px;
  }

  .invoice-color {
    color: red !important;
  }
  .card-header {
    padding: 0.9375rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, 0.02);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }

  /* a {
    text-decoration: none !important;
  } */

  .btn-light {
    color: #333;
    background-color: #fafafa;
    border-color: #ddd;
  }
  .header-elements-inline {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
  }

  .additional-buttons {
    display: flex;
    justify-content: center;
  }

  @media (min-width: 768px) {
    .wmin-md-400 {
      min-width: 400px !important;
    }
  }
</style>
