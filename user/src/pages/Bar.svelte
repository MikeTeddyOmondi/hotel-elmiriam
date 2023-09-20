<script>
  // import axios from "axios";
  // import {onMount} from 'svelte';
  // import {push} from "svelte-spa-router";
  import BaseLayout from "../layouts/baseLayout.svelte";
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
      <!-- Drink Stats -->
      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
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
              <div class="chart-pie pt-2 pb-2">
                <strong>Beer Stats Here!</strong>
              </div>
              <div class="mt-4 text-center small">
                <span class="mr-2">
                  <i class="fas fa-circle text-success" /> Total Bottles: 5
                </span>
                <span class="mr-2">
                  <i class="fas fa-circle text-warning" /> Total Cans: 2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Drink Stats -->
      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
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
              <div class="chart-pie pt-2 pb-2">
                <strong>Wine & Spirits Stats Here!</strong>
              </div>
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
      </div>
      <!-- Drink Stats -->
      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
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
              <div class="chart-pie pt-2 pb-2">
                <strong>Non-alcoholics Stats Here!</strong>
              </div>
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
    </div>
  </div>
</BaseLayout>
