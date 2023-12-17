import GuitarFrets from "../pages/GuitarFrets/GuitarFrets";
import Welcome from "../pages/Welcome/Welcome";

export const routes = [
  {
    path: "/",
    name: "Welcome",
    element: Welcome,
    isOnNavbar: false,
  },
  {
    path: "/guitar-frets",
    name: "Guitar Frets",
    element: GuitarFrets,
    isOnNavbar: true,
  },
];
