<script>
  import { push } from "svelte-spa-router";
  import { link } from "svelte-spa-router";
  import { axiosInstance } from "../interceptors/axios";
  import LoginLayout from "../layouts/loginLayout.svelte";
  import { signIn, useLocalStorage } from "../stores/sessionStore";

  let email = "", password = "";

  // let session = useLocalStorage("x-user-session");

  $: submit = async () => {
    await signIn(email, password);
  };
</script>

<LoginLayout>
  <div class="container">
    <!-- Outer Row -->
    <div class="row justify-content-center">
      <div class="col-xl-10 col-lg-12 col-md-9">
        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <!-- <div class="col-lg-6 d-none d-lg-block bg-login-image"></div> -->
              <div class="col-lg-12">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Login</h1>
                  </div>
                  <form class="user" on:submit|preventDefault={submit}>
                    <div class="form-group">
                      <input
                        bind:value={email}
                        type="email"
                        class="form-control form-control-user"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter Email Address..."
                      />
                    </div>
                    <div class="form-group">
                      <input
                        bind:value={password}
                        type="password"
                        class="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                      />
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small">
                        <input
                          type="checkbox"
                          class="custom-control-input"
                          id="customCheck"
                        />
                        <label class="custom-control-label" for="customCheck"
                          >Remember Me</label
                        >
                      </div>
                    </div>
                    <button
                      type="submit"
                      class="btn btn-primary btn-user btn-block"
                    >
                      Login
                    </button>
                  </form>
                  <hr />
                  <div class="text-center">
                    <a class="small" href="/forgot-password" use:link
                      >Forgot Password?</a
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</LoginLayout>

<!-- <main class="form-signin">
    <form on:submit|preventDefault={submit}>
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

        <div class="form-floating">
            <input bind:value={email} type="email" class="form-control" placeholder="name@example.com">
            <label>Email address</label>
        </div>

        <div class="form-floating">
            <input bind:value={password} type="password" class="form-control" placeholder="Password">
            <label>Password</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
    </form>
</main> -->
