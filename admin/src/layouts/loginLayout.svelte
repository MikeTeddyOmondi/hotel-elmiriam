<script>
  import { onMount } from "svelte";
  import { push } from "svelte-spa-router";
  import { useLocalStorage } from "../stores/sessionStore";
  import Toast from "../components/Toast.svelte";

  let url = ``;

  let toastProps = {
    isErr: false,
    isSucc: false,
    toastMsg: "",
  };

  let session = useLocalStorage("x-user-session", null);

  onMount(async () => {
    url = window.location.hash;
    try {
      // console.log($session)

      if ($session !== null) {
        toastProps = {
          isErr: false,
          isSucc: true,
          toastMsg: `Session found. Redirecting to dashboard...`,
        };

        // Delay for 5sec to autoremove the toast
        setTimeout(async () => {
          toastProps = {
            isErr: false,
            isSucc: false,
            toastMsg: ``,
          };
          await push("/");
        }, 5000);
      } else {
        throw Error;
      }
    } catch (error) {
      toastProps = {
        isErr: true,
        isSucc: false,
        toastMsg: `Session expired! `,
      };

      // Delay for 5sec to autoremove the toast
      setTimeout(async () => {
        toastProps = {
          isErr: false,
          isSucc: false,
          toastMsg: "",
        };
        await push("/login");
      }, 5000);
    }
  });
</script>

<svelte:head>
  <title>Login | Hotel Elmiriam</title>
</svelte:head>

<!-- <div class="bg-gradient-primary"> -->
<div class="my-2">
  <div class="row justify-content-center">
    <div class="col-xl-6 col-lg-6 col-md-6 mx-4">
      <Toast {toastProps} />
    </div>
  </div>

  <slot />
</div>
