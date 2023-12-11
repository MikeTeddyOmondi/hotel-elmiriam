import { writable } from "svelte/store";

export const roomStore = writable([]);
export const usersStore = writable([]);
export const bookingStore = writable([]);
export const customerStore = writable([]);
export const roomTypeStore = writable([]);
export const bookingDetails = writable({});
