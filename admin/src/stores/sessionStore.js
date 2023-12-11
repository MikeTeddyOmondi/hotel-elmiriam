import { writable } from "svelte/store";

export function useLocalStorage(key, initialValue) {
  let serialize = JSON.stringify;
  let deserialize = JSON.parse;

  // get stored value
  let storedValue = deserialize(localStorage.getItem(key));

  // if value exists return it otherwise use initial value
  let sessionStore = writable(storedValue ? storedValue : initialValue);
  // subscribe to the store and update local storage when it changes
  sessionStore.subscribe((value) =>
    localStorage.setItem(key, serialize(value))
  );

  return sessionStore;
}